import Civ5SavePropertyDefinitions from './civ5saveproperties';

export default class Civ5Save {
  constructor(saveData) {
    this.saveData = new Civ5SaveDataView(saveData.buffer);
    this.verifyFileSignature();
    this.properties = this.getProperties();
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
      };
      reader.onerror = function () {
        reject(reader.error);
      };

      reader.readAsArrayBuffer(saveFile);
    });
  }

  verifyFileSignature() {
    if (this.saveData.getString(0, 4) !== 'CIV5') {
      throw new Error('File signature does not match. Is this a Civ 5 savegame?');
    }
  }

  getProperties() {
    let previousPropertyName = '';
    let previousPropertySection = 0;
    let properties = new Map();
    let sectionOffsets = this.getSectionOffsets();

    for (let propertyName in Civ5SavePropertyDefinitions) {
      // Make propertyDefinition a copy; otherwise it will modify the property for every instance of the Civ5Save class
      let propertyDefinition = Object.assign({}, Civ5SavePropertyDefinitions[propertyName]);

      let propertySection = this.getPropertySection(propertyDefinition);
      // If propertySection is null, it means the property isn't available for the particular game build
      if (isNullOrUndefined(propertySection)) {
        continue;
      }

      let propertyByteOffset = null;
      if (propertySection === previousPropertySection) {
        let previousProperty = properties[previousPropertyName];
        propertyByteOffset = previousProperty.byteOffset + previousProperty.length;

      } else {
        propertyByteOffset = sectionOffsets[propertySection - 1].start + propertyDefinition.byteOffsetInSection;
      }

      properties[propertyName] = new Civ5SaveProperty.fromType(
        propertyDefinition.type,
        propertyByteOffset,
        propertyDefinition.length,
        this.saveData);

      previousPropertyName = propertyName;
      previousPropertySection = propertySection;
    }

    return properties;
  }

  getSectionOffsets() {
    const SECTION_DELIMITER = [0x40, 0, 0, 0];

    let saveDataBytes = new Int8Array(this.saveData.buffer);
    let sectionOffsets = [];
    let section = {
      start: 0,
    };
    sectionOffsets.push(section);

    saveDataBytes.forEach((byte, byteOffset) => {
      if (areArraysEqual(saveDataBytes.slice(byteOffset, byteOffset + 4), SECTION_DELIMITER)) {
        let section = {
          start: byteOffset,
        };
        sectionOffsets.push(section);
        sectionOffsets[sectionOffsets.length - 2].end = byteOffset - 1;
      }
    });

    return sectionOffsets;
  }

  getPropertySection(propertyDefinition) {
    let propertySection = null;
    for (let build in propertyDefinition.sectionByBuild) {
      if (Number.parseInt(this.gameBuild) >= Number.parseInt(build)) {
        propertySection = propertyDefinition.sectionByBuild[build];
      }
    }

    return propertySection;
  }

  get gameBuild() {
    if (isNullOrUndefined(this._gameBuild)) {
      this._gameBuild = this.getGameBuild();
    }

    return this._gameBuild;
  }

  // Game build was only added to the beginning of the savegame in game version 1.0.2. This should be able to get the
  // game build for all savegame versions
  getGameBuild() {
    const GAME_BUILD_MARKER = 'FINAL_RELEASE';
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

    let gameBuild = '';
    let byteOffset = gameBuildMarkerByteOffset - 2;
    while (saveDataBytes.slice(byteOffset, byteOffset + 1)[0] !== 0) {
      gameBuild = String.fromCharCode(saveDataBytes.slice(byteOffset, byteOffset + 1)) + gameBuild;
      byteOffset--;
    }

    return gameBuild;
  }

  get gameVersion() {
    if (this.properties.hasOwnProperty('gameVersion')) {
      return this.properties['gameVersion'].value;
    }
  }

  get currentTurn() {
    return this.properties['currentTurn'].value;
  }

  get player1Civilization() {
    return this.properties['player1Civilization'].value;
  }

  get difficulty() {
    return this.properties['difficulty'].value;
  }

  get startingEra() {
    return this.properties['startingEra'].value;
  }

  get currentEra() {
    return this.properties['currentEra'].value;
  }

  get gamePace() {
    return this.properties['gamePace'].value;
  }

  get mapSize() {
    return this.properties['mapSize'].value;
  }

  get mapFile() {
    return this.properties['mapFile'].value;
  }

  get maxTurns() {
    return this.properties['maxTurns'].value;
  }

  set maxTurns(newValue) {
    this.properties['maxTurns'].value = newValue;
  }

  get timeVictory() {
    return this.properties['timeVictory'].value;
  }

  set timeVictory(newValue) {
    this.properties['timeVictory'].value = newValue;
  }

  get scienceVictory() {
    return this.properties['scienceVictory'].value;
  }

  set scienceVictory(newValue) {
    this.properties['scienceVictory'].value = newValue;
  }

  get dominationVictory() {
    return this.properties['dominationVictory'].value;
  }

  set dominationVictory(newValue) {
    this.properties['dominationVictory'].value = newValue;
  }

  get culturalVictory() {
    return this.properties['culturalVictory'].value;
  }

  set culturalVictory(newValue) {
    this.properties['culturalVictory'].value = newValue;
  }

  get diplomaticVictory() {
    return this.properties['diplomaticVictory'].value;
  }

  set diplomaticVictory(newValue) {
    this.properties['diplomaticVictory'].value = newValue;
  }
}

// Subclassing DataView in babel requires https://www.npmjs.com/package/babel-plugin-transform-builtin-extend
class Civ5SaveDataView extends DataView {
  getBoolean(byteOffset) {
    return Boolean(this.getInt8(byteOffset));
  }

  setBoolean(byteOffset, newValue) {
    this.setInt8(byteOffset, Number(newValue));
  }

  getString(byteOffset, byteLength) {
    let string = '';
    for (let byte = byteOffset; byte < byteOffset + byteLength; byte++) {
      string += String.fromCharCode(this.getInt8(byte));
    }
    return string;
  }
}

class Civ5SaveProperty {
  constructor(byteOffset, length, saveData) {
    this.byteOffset = byteOffset;
    this._length = length;
    this.saveData = saveData;
  }

  get length() {
    return this._length;
  }

  static fromType(type, byteOffset, length, saveData) {
    switch (type) {
    case 'bool':
      return new Civ5SaveBoolProperty(byteOffset, 1, saveData);

    case 'bytes':
      return new Civ5SaveProperty(byteOffset, length, saveData);

    case 'int':
      return new Civ5SaveIntProperty(byteOffset, 4, saveData);

    case 'string':
      return new Civ5SaveStringProperty(byteOffset, length, saveData);

    default: {
      throw new Error(`Property type ${type} not handled`);
    }
    }
  }
}

class Civ5SaveBoolProperty extends Civ5SaveProperty {
  get value() {
    return this.saveData.getBoolean(this.byteOffset);
  }

  set value(newValue) {
    this.saveData.setBoolean(this.byteOffset, newValue);
  }
}

class Civ5SaveIntProperty extends Civ5SaveProperty {
  get value() {
    return this.saveData.getInt32(this.byteOffset, true);
  }

  set value(newValue) {
    this.saveData.setInt32(this.byteOffset, newValue, true);
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
  return typeof variable === 'undefined' || variable === null;
}
