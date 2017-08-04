import Civ5SavePropertyDefinitions from './civ5saveproperties.json';

export default class Civ5Save {
  constructor(saveData) {
    this._saveData = new Civ5SaveDataView(saveData.buffer);
    this._verifyFileSignature();
    this._properties = this._getProperties();
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

  toFile(fileName) {
    return new File([this._saveData], fileName, {
      type: 'application/octet-stream'
    });
  }

  _verifyFileSignature() {
    if (this._saveData.getString(0, 4) !== 'CIV5') {
      throw new Error('File signature does not match. Is this a Civ 5 savegame?');
    }
  }

  _getProperties() {
    let previousPropertyName = '';
    let previousPropertySection = 0;
    let properties = new Map();
    let sectionOffsets = this._getSectionOffsets();

    for (let propertyName in Civ5SavePropertyDefinitions) {
      // Player colours is a variable length list of strings so we'll skip it for now
      if (propertyName === 'playerColours') {
        continue;
      }

      // Make propertyDefinition a copy; otherwise it will modify the property for every instance of the Civ5Save class
      let propertyDefinition = Object.assign({}, Civ5SavePropertyDefinitions[propertyName]);

      let propertySection = this._getPropertySection(propertyDefinition);
      // If propertySection is null, it means the property isn't available for the particular game build
      if (isNullOrUndefined(propertySection)) {
        continue;
      }

      let propertyByteOffset = null;
      if (propertySection === previousPropertySection) {
        let previousProperty = properties[previousPropertyName];
        // previousProperty.length is a common spot of failure if something went wrong
        try {
          propertyByteOffset = previousProperty.byteOffset + previousProperty.length;
        } catch (e) {
          break;
        }

      // Workaround for private game since the previous property doesn't have a predictable length
      } else if (propertyName === 'privateGame') {
        propertyByteOffset = sectionOffsets[propertySection].start - 10;

      } else {
        propertyByteOffset = sectionOffsets[propertySection - 1].start + propertyDefinition.byteOffsetInSection;
      }

      properties[propertyName] = Civ5SaveProperty.fromType(
        propertyDefinition.type,
        propertyByteOffset,
        propertyDefinition.length,
        this._saveData);

      previousPropertyName = propertyName;
      previousPropertySection = propertySection;
    }

    return properties;
  }

  _getSectionOffsets() {
    const SECTION_DELIMITER = [0x40, 0, 0, 0];

    const LAST_PROPERTY_DEFINITION = Civ5SavePropertyDefinitions[Object.keys(Civ5SavePropertyDefinitions)[Object.keys(
      Civ5SavePropertyDefinitions).length - 1]];
    const LAST_SECTION = LAST_PROPERTY_DEFINITION.sectionByBuild[Object.keys(
      LAST_PROPERTY_DEFINITION.sectionByBuild)[Object.keys(
      LAST_PROPERTY_DEFINITION.sectionByBuild).length - 1]];

    let saveDataBytes = new Int8Array(this._saveData.buffer);
    let sectionOffsets = [];
    let section = {
      start: 0,
    };
    sectionOffsets.push(section);

    for (let byteOffset = 0; byteOffset < saveDataBytes.length; byteOffset++) {
      if (areArraysEqual(saveDataBytes.slice(byteOffset, byteOffset + 4), SECTION_DELIMITER)) {
        // Player colour section before build 310700 contains hex values, which can include the section delimiter
        if (Number(this.gameBuild) < 310700) {
          let playerColourSection = 23;
          if (Number(this.gameBuild) >= 262623) {
            playerColourSection = 24;
          }
          if (sectionOffsets.length === playerColourSection) {
            if (byteOffset - sectionOffsets[sectionOffsets.length - 1].start < 270) {
              continue;
            }
          }
        }

        let section = {
          start: byteOffset,
        };
        sectionOffsets.push(section);
        sectionOffsets[sectionOffsets.length - 2].end = byteOffset - 1;

        if (sectionOffsets.length === LAST_SECTION) {
          break;
        }
      }
    }

    return sectionOffsets;
  }

  _getPropertySection(propertyDefinition) {
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
      this._gameBuild = this._getGameBuild();
    }

    return this._gameBuild;
  }

  // Game build was only added to the beginning of the savegame in game version 1.0.2. This should be able to get the
  // game build for all savegame versions
  _getGameBuild() {
    const GAME_BUILD_MARKER = 'FINAL_RELEASE';
    const GAME_BUILD_MARKER_ARRAY = (function() {
      let gameBuildMarkerArray = [];
      for (let i = 0; i < GAME_BUILD_MARKER.length; i++) {
        gameBuildMarkerArray.push(GAME_BUILD_MARKER.charCodeAt(i));
      }
      return gameBuildMarkerArray;
    }());

    let gameBuildMarkerByteOffset = 0;
    let saveDataBytes = new Int8Array(this._saveData.buffer);
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
    return this._returnPropertyIfDefined('gameVersion');
  }

  get currentTurn() {
    return this._properties['currentTurn'].value;
  }

  get gameMode() {
    if (Number(this.gameBuild) >= 230620) {
      return Civ5SavePropertyDefinitions.gameMode.values[this._properties.gameMode.value];
    }
  }

  get player1Civilization() {
    return this._returnPropertyIfDefined('player1Civilization');
  }

  get difficulty() {
    return this._returnPropertyIfDefined('difficulty');
  }

  get startingEra() {
    return this._returnPropertyIfDefined('startingEra');
  }

  get currentEra() {
    return this._returnPropertyIfDefined('currentEra');
  }

  get gamePace() {
    return this._returnPropertyIfDefined('gamePace');
  }

  get mapSize() {
    return this._returnPropertyIfDefined('mapSize');
  }

  get mapFile() {
    return this._returnPropertyIfDefined('mapFile');
  }

  get maxTurns() {
    return this._returnPropertyIfDefined('maxTurns');
  }

  set maxTurns(newValue) {
    this._properties['maxTurns'].value = newValue;
  }

  get privateGame() {
    return this._returnPropertyIfDefined('privateGame');
  }

  set privateGame(newValue) {
    this._properties['privateGame'].value = newValue;
  }

  get timeVictory() {
    return this._returnPropertyIfDefined('timeVictory');
  }

  set timeVictory(newValue) {
    this._properties['timeVictory'].value = newValue;
  }

  get scienceVictory() {
    return this._returnPropertyIfDefined('scienceVictory');
  }

  set scienceVictory(newValue) {
    this._properties['scienceVictory'].value = newValue;
  }

  get dominationVictory() {
    return this._returnPropertyIfDefined('dominationVictory');
  }

  set dominationVictory(newValue) {
    this._properties['dominationVictory'].value = newValue;
  }

  get culturalVictory() {
    return this._returnPropertyIfDefined('culturalVictory');
  }

  set culturalVictory(newValue) {
    this._properties['culturalVictory'].value = newValue;
  }

  get diplomaticVictory() {
    return this._returnPropertyIfDefined('diplomaticVictory');
  }

  set diplomaticVictory(newValue) {
    this._properties['diplomaticVictory'].value = newValue;
  }

  _returnPropertyIfDefined(propertyName) {
    if (this._properties.hasOwnProperty(propertyName)) {
      return this._properties[propertyName].value;
    }
  }
}

// Subclassing DataView in babel requires https://www.npmjs.com/package/babel-plugin-transform-builtin-extend
class Civ5SaveDataView extends DataView {
  getBoolean(byteOffset) {
    return Boolean(this.getUint8(byteOffset));
  }

  setBoolean(byteOffset, newValue) {
    this.setUint8(byteOffset, Number(newValue));
  }

  getString(byteOffset, byteLength) {
    let string = '';
    for (let byte = byteOffset; byte < byteOffset + byteLength; byte++) {
      string += String.fromCharCode(this.getUint8(byte));
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

    case 'int8':
      return new Civ5SaveInt8Property(byteOffset, 1, saveData);

    case 'int32':
      return new Civ5SaveInt32Property(byteOffset, 4, saveData);

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

class Civ5SaveInt8Property extends Civ5SaveProperty {
  get value() {
    return this.saveData.getUint8(this.byteOffset);
  }

  set value(newValue) {
    this.saveData.setUint8(this.byteOffset, newValue);
  }
}

class Civ5SaveInt32Property extends Civ5SaveProperty {
  get value() {
    return this.saveData.getUint32(this.byteOffset, true);
  }

  set value(newValue) {
    this.saveData.setUint32(this.byteOffset, newValue, true);
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
    return this.saveData.getUint32(byteOffset, true);
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
