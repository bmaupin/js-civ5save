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
    if (this.saveData.getAsciiString(0, 4) !== "CIV5") {
      throw new Error("File signature does not match. Is this a Civ 5 savegame?");
    }
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
    this.populatePropertyLength(propertyName);
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

  populatePropertyLength(propertyName) {
    let property = this.properties[propertyName];
    if (isNullOrUndefined(property.length)) {
      property.length = this.saveData.getStringLength(property.byteOffset) + 4;
    }
  }

  get saveGameVersion() {
    return this.getProperty("saveGameVersion");
  }

  get gameVersion() {
    return this.getProperty("gameVersion");
  }

  get gameBuild() {
    return this.getProperty("gameBuild");
  }

  get maxTurns() {
    return this.getProperty("maxTurns");
  }
}

// Subclassing DataView in babel requires https://www.npmjs.com/package/babel-plugin-transform-builtin-extend
class Civ5SaveDataView extends DataView {
  getVariableLengthString(byteOffset) {
    let stringLength = this.getStringLength(byteOffset);
    return this.getAsciiString(byteOffset + 4, stringLength);
  }

  getStringLength(byteOffset) {
    return this.getInt32(byteOffset, true);
  }

  getAsciiString(byteOffset, byteLength) {
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
    this.length = propertyDefinition.length;
    this.previousProperty = propertyDefinition.previousProperty;
    this.saveData = saveData;
    this.section = propertyDefinition.section;
    this.sectionByBuild = propertyDefinition.sectionByBuild;
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
  get value() {
    return this.saveData.getVariableLengthString(this.byteOffset);
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
