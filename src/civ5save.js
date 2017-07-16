import Civ5SavePropertyDefinitions from "./civ5saveproperties";

const repoUrl = "https://github.com/bmaupin/civ5save";

export default class Civ5Save {
  constructor(saveData) {
    this.saveData = new Civ5SaveDataView(saveData.buffer);
    this.verifyFileSignature();
    this.properties = this.getProperties();
    this.sectionOffsets = this.getSectionOffsets();
    this.verifySaveGameVersion();
  }

  // Use a static factory to instantiate the object since it relies on data that needs to be fetched asynchronously
  // https://stackoverflow.com/a/24686979/399105
  static async fromFile(saveFile) {
    let saveData = await Civ5Save.loadData(saveFile);
    return new Civ5Save(saveData);
  }

  static loadData(saveFile) {
    return new Promise(function (resolve, reject) {
      let reader = new FileReader();

      reader.onload = function () {
        // Use a DataView for the savegame data since the ArrayBuffer returned by reader.result can't be used to
        // manipulate the data. A typed array such as Int8Array wouldn't be ideal either since the data contains types
        // of variable lengths
        resolve(new DataView(reader.result));
      }
      reader.onerror = function () {
        reject(reader.error);
      }

      reader.readAsArrayBuffer(saveFile);
    });
  }

  verifyFileSignature() {
    if (this.saveData.getString(0, 4) !== "CIV5") {
      throw new Error("File signature does not match. Is this a Civ 5 savegame?");
    }
  }

  // Game build was only added to the beginning of the savegame in game version 1.0.2. This should be able to get the
  // game build for all savegame versions
  getGameBuild() {
    const GAME_BUILD_MARKER = "FINAL_RELEASE";
    const GAME_BUILD_MARKER_ARRAY = (function() {
      let gameBuildMarkerArray = [];
      for (let i = 0; i < GAME_BUILD_MARKER.length; i++) {
        gameBuildMarkerArray.push(GAME_BUILD_MARKER.charCodeAt(i));
      }
      return gameBuildMarkerArray;
    }());

    let gameBuildMarkerByteOffset = 0;
    let saveDataBytes = new Int8Array(this.saveData.buffer);
    for (let byteOffset = 0; byteOffset <= saveDataBytes.length; byteOffset++) {
      if (areArraysEqual(
          saveDataBytes.slice(byteOffset, byteOffset + GAME_BUILD_MARKER_ARRAY.length),
          GAME_BUILD_MARKER_ARRAY)) {
        gameBuildMarkerByteOffset = byteOffset;
        break;
      }
    }

    let gameBuild = "";
    let byteOffset = gameBuildMarkerByteOffset - 2;
    while (saveDataBytes.slice(byteOffset, byteOffset + 1)[0] !== 0) {
      gameBuild = String.fromCharCode(saveDataBytes.slice(byteOffset, byteOffset + 1)) + gameBuild;
      byteOffset--;
    }

    return gameBuild;
  }

  getProperties() {
    let properties = new Map();
    for (let propertyName in Civ5SavePropertyDefinitions) {
      let propertyDefinition = Civ5SavePropertyDefinitions[propertyName];
      switch (propertyDefinition.type) {
        case "int16":
          properties[propertyName] = (new Civ5SaveInt16Property(propertyDefinition, this.saveData));
          break;

        case "int32":
          properties[propertyName] = (new Civ5SaveInt32Property(propertyDefinition, this.saveData));
          break;

        case "skip":
          properties[propertyName] = (new Civ5SaveProperty(propertyDefinition, this.saveData));
          break;

        case "string":
          properties[propertyName] = (new Civ5SaveStringProperty(propertyDefinition, this.saveData));
          break;

        default: {
          throw new Error(`Property type ${propertyDefinition.type} not handled: ${propertyName}, ${propertyDefinition}`);
        }
      }
    }

    return properties;
  }

  getSectionOffsets() {
    const sectionDelimiter = [0x40, 0, 0, 0];

    let saveDataBytes = new Int8Array(this.saveData.buffer);
    let sectionOffsets = [];
    let section = {
      start: 0,
    };
    sectionOffsets.push(section);

    saveDataBytes.forEach((byte, byteOffset) => {
      if (areArraysEqual(saveDataBytes.slice(byteOffset, byteOffset + 4), sectionDelimiter)) {
        let section = {
          start: byteOffset,
        };
        sectionOffsets.push(section);
        sectionOffsets[sectionOffsets.length - 2].end = byteOffset - 1;
      }
    });

    return sectionOffsets;
  }

  verifySaveGameVersion() {
    if (this.saveGameVersion !== 8) {
      throw new Error(`Savegame version ${this.saveGameVersion} unsupported. Please file an issue at ${repoUrl}.`);
    }
  }

  getProperty(propertyName) {
    this.populatePropertyAttributes(propertyName);

    return this.properties[propertyName].value;
  }

  populatePropertyAttributes(propertyName) {
    this.populatePropertySection(propertyName);
    this.populatePropertyByteOffsetInSection(propertyName);
    this.populatePropertyByteOffset(propertyName);
  }

  populatePropertySection(propertyName) {
    let property = this.properties[propertyName];
    if (isNullOrUndefined(property.section)) {
      for (var build in property.sectionByBuild) {
        if (Number.parseInt(this.gameBuild) > Number.parseInt(build)) {
          property.section = property.sectionByBuild[build];
        }
      }
    }
  }

  populatePropertyByteOffsetInSection(propertyName) {
    let property = this.properties[propertyName];
    if (isNullOrUndefined(property.byteOffsetInSection)) {
      let previousPropertyName = property.previousProperty;
      let previousProperty = this.properties[previousPropertyName];
      this.populatePropertyAttributes(previousPropertyName);
      property.byteOffsetInSection = previousProperty.byteOffsetInSection + previousProperty.length;
    }
  }

  populatePropertyByteOffset(propertyName) {
    let property = this.properties[propertyName];
    if (isNullOrUndefined(property.byteOffset)) {
      property.byteOffset = this.sectionOffsets[property.section - 1].start + property.byteOffsetInSection;
    }
  }

  get saveGameVersion() {
    return this.getProperty("saveGameVersion");
  }

  get gameVersion() {
    return this.getProperty("gameVersion");
  }

  get gameBuild() {
    if (isNullOrUndefined(this._gameBuild)) {
      this._gameBuild = this.getGameBuild();
    }

    return this._gameBuild;
  }

  get maxTurns() {
    // return this.getProperty("maxTurns");

    let gameVersion = this.getProperty("maxTurns");
    // console.log(this.properties);
    return gameVersion;
  }
}

// Subclassing DataView in babel requires https://www.npmjs.com/package/babel-plugin-transform-builtin-extend
class Civ5SaveDataView extends DataView {
  getString(byteOffset, byteLength) {
    let string = "";
    for (let byte = byteOffset; byte < byteOffset + byteLength; byte++) {
      string += String.fromCharCode(this.getInt8(byte));
    }
    return string;
  }
}

class Civ5SaveProperty {
  constructor(propertyDefinition, saveData) {
    this.byteOffset = propertyDefinition.byteOffset;
    this.byteOffsetInSection = propertyDefinition.byteOffsetInSection;
    this._length = propertyDefinition.length;
    this.previousProperty = propertyDefinition.previousProperty;
    this.saveData = saveData;
    this.section = propertyDefinition.section;
    this.sectionByBuild = propertyDefinition.sectionByBuild;
  }

  get length() {
    return this._length;
  }
}

class Civ5SaveInt16Property extends Civ5SaveProperty {
  get value() {
    return this.saveData.getInt16(this.byteOffset, true);
  }
}

class Civ5SaveInt32Property extends Civ5SaveProperty {
  get value() {
    return this.saveData.getInt32(this.byteOffset, true);
  }
}

class Civ5SaveStringProperty extends Civ5SaveProperty {
  get length() {
    if (isNullOrUndefined(this._length)) {
      this._length = this.getStringLength(this.byteOffset) + 4;
    }
    return this._length;
  }

  get value() {
    return this.saveData.getString(this.byteOffset + 4, this.length - 4);
  }

  getStringLength(byteOffset) {
    return this.saveData.getInt32(byteOffset, true);
  }
}

// https://stackoverflow.com/a/22395463/399105
function areArraysEqual(array1, array2) {
  return (array1.length == array2.length) && array1.every(function(element, index) {
    return element === array2[index];
  });
}

// https://stackoverflow.com/a/416327/399105
function isNullOrUndefined(variable) {
  return typeof variable === "undefined" || variable === null;
}
