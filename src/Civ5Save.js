import Civ5SaveDataView from './Civ5SaveDataView';
import Civ5SavePropertyDefinitions from './Civ5SavePropertyDefinitions.json';
import Civ5SavePropertyFactory from './Civ5SavePropertyFactory';

export default class Civ5Save {
  constructor(saveData) {
    this._saveData = new Civ5SaveDataView(saveData.buffer);
    this._verifyFileSignature();
    this._gameBuild = this._getGameBuild();
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
      // Skip string array properties since there isn't much value in implementing them until they're needed, plus the
      // string array containing player colours doesn't seem to have a predictable length (can have 63 or 64 items)
      if (['playerColours', 'playerNames2', 'section23Skip1'].includes(propertyName)) {
        continue;
      }

      // Make propertyDefinition a copy; otherwise it will modify the property for every instance of the Civ5Save class
      let propertyDefinition = Object.assign({}, Civ5SavePropertyDefinitions[propertyName]);

      let propertySection = this._getPropertySection(propertyDefinition);
      // If propertySection is null, it means the property isn't available for the particular game build
      if (this._isNullOrUndefined(propertySection)) {
        continue;
      }

      if (propertyName === 'section30Skip1') {
        if (properties.enabledDLC.getArray().includes('Expansion - Gods and Kings') ||
          properties.enabledDLC.getArray().includes('Expansion - Brave New World')) {
          propertyDefinition.length = 76;
        } else {
          propertyDefinition.length = 72;
        }
      } else if (propertyName === 'section30Skip3') {
        if (properties.enabledDLC.getArray().includes('Expansion - Brave New World')) {
          propertyDefinition.length = 80;
        } else if (properties.enabledDLC.getArray().includes('Expansion - Gods and Kings')) {
          propertyDefinition.length = 76;
        } else {
          propertyDefinition.length = 72;
        }
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

      // Workaround for a couple values that are preceded by string arrays (see comment above)
      } else if (propertyName === 'privateGame') {
        propertyByteOffset = sectionOffsets[propertySection].start - 10;

      } else if (propertyName === 'turnTimerLength') {
        propertyByteOffset = sectionOffsets[propertySection].start - 4;

      } else {
        propertyByteOffset = sectionOffsets[propertySection - 1].start + propertyDefinition.byteOffsetInSection;
      }

      properties[propertyName] = Civ5SavePropertyFactory.fromType(
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
      if (this._areArraysEqual(saveDataBytes.slice(byteOffset, byteOffset + 4), SECTION_DELIMITER)) {
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

  // https://stackoverflow.com/a/22395463/399105
  _areArraysEqual(array1, array2) {
    return (array1.length == array2.length) && array1.every(function(element, index) {
      return element === array2[index];
    });
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

  _isNullOrUndefined(variable) {
    return typeof variable === 'undefined' || variable === null;
  }

  get gameBuild() {
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
      if (this._areArraysEqual(
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
    return this._getPropertyIfDefined('gameVersion');
  }

  get currentTurn() {
    return this._getPropertyIfDefined('currentTurn');
  }

  get gameMode() {
    if (Number(this.gameBuild) >= 230620) {
      return Civ5SavePropertyDefinitions.gameMode.values[this._properties.gameMode.getValue(this._saveData)];
    }
  }

  get player1Civilization() {
    return this._getPropertyIfDefined('player1Civilization');
  }

  get difficulty() {
    return this._getPropertyIfDefined('difficulty');
  }

  get startingEra() {
    return this._getPropertyIfDefined('startingEra');
  }

  get currentEra() {
    return this._getPropertyIfDefined('currentEra');
  }

  get gamePace() {
    return this._getPropertyIfDefined('gamePace');
  }

  get mapSize() {
    return this._getPropertyIfDefined('mapSize');
  }

  get mapFile() {
    return this._getPropertyIfDefined('mapFile');
  }

  get enabledDLC() {
    if (this._properties.hasOwnProperty('enabledDLC')) {
      return this._properties.enabledDLC.getArray();
    }
  }

  get maxTurns() {
    return this._getPropertyIfDefined('maxTurns');
  }

  set maxTurns(newValue) {
    this._properties.maxTurns.setValue(this._saveData, newValue);
  }

  get turnTimerLength() {
    return this._getPropertyIfDefined('turnTimerLength');
  }

  set turnTimerLength(newValue) {
    this._properties.turnTimerLength.setValue(this._saveData, newValue);
  }

  get privateGame() {
    return this._getPropertyIfDefined('privateGame');
  }

  set privateGame(newValue) {
    this._properties.privateGame.setValue(this._saveData, newValue);
  }

  get timeVictory() {
    return this._getPropertyIfDefined('timeVictory');
  }

  set timeVictory(newValue) {
    this._properties.timeVictory.setValue(this._saveData, newValue);
  }

  get scienceVictory() {
    return this._getPropertyIfDefined('scienceVictory');
  }

  set scienceVictory(newValue) {
    this._properties.scienceVictory.setValue(this._saveData, newValue);
  }

  get dominationVictory() {
    return this._getPropertyIfDefined('dominationVictory');
  }

  set dominationVictory(newValue) {
    this._properties.dominationVictory.setValue(this._saveData, newValue);
  }

  get culturalVictory() {
    return this._getPropertyIfDefined('culturalVictory');
  }

  set culturalVictory(newValue) {
    this._properties.culturalVictory.setValue(this._saveData, newValue);
  }

  get diplomaticVictory() {
    return this._getPropertyIfDefined('diplomaticVictory');
  }

  set diplomaticVictory(newValue) {
    this._properties.diplomaticVictory.setValue(this._saveData, newValue);
  }

  get alwaysPeace() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_ALWAYS_PEACE');
  }

  set alwaysPeace(newValue) {
    this._setNewGameOption('GAMEOPTION_ALWAYS_PEACE', newValue);
  }

  get alwaysWar() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_ALWAYS_WAR');
  }

  set alwaysWar(newValue) {
    this._setNewGameOption('GAMEOPTION_ALWAYS_WAR', newValue);
  }

  get completeKills() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_COMPLETE_KILLS');
  }

  set completeKills(newValue) {
    this._setNewGameOption('GAMEOPTION_COMPLETE_KILLS', newValue);
  }

  get lockMods() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_LOCK_MODS');
  }

  set lockMods(newValue) {
    this._setNewGameOption('GAMEOPTION_LOCK_MODS', newValue);
  }

  get newRandomSeed() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NEW_RANDOM_SEED');
  }

  set newRandomSeed(newValue) {
    this._setNewGameOption('GAMEOPTION_NEW_RANDOM_SEED', newValue);
  }

  get noAncientRuins() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_GOODY_HUTS');
  }

  set noAncientRuins(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_GOODY_HUTS', newValue);
  }

  get noBarbarians() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_BARBARIANS');
  }

  set noBarbarians(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_BARBARIANS', newValue);
  }

  get noChangingWarPeace() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_CHANGING_WAR_PEACE');
  }

  set noChangingWarPeace(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_CHANGING_WAR_PEACE', newValue);
  }

  get noCityRazing() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_CITY_RAZING');
  }

  set noCityRazing(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_CITY_RAZING', newValue);
  }

  get noCultureOverviewUI() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_CULTURE_OVERVIEW_UI');
  }

  set noCultureOverviewUI(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_CULTURE_OVERVIEW_UI', newValue);
  }

  get noEspionage() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_ESPIONAGE');
  }

  set noEspionage(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_ESPIONAGE', newValue);
  }

  get noHappiness() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_HAPPINESS');
  }

  set noHappiness(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_HAPPINESS', newValue);
  }

  get noPolicies() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_POLICIES');
  }

  set noPolicies(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_POLICIES', newValue);
  }

  get noReligion() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_RELIGION');
  }

  set noReligion(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_RELIGION', newValue);
  }

  get noScience() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_SCIENCE');
  }

  set noScience(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_SCIENCE', newValue);
  }

  get noWorldCongress() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_LEAGUES');
  }

  set noWorldCongress(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_LEAGUES', newValue);
  }

  get oneCityChallenge() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_ONE_CITY_CHALLENGE');
  }

  set oneCityChallenge(newValue) {
    this._setNewGameOption('GAMEOPTION_ONE_CITY_CHALLENGE', newValue);
  }

  // https://github.com/Bownairo/Civ5SaveEditor
  get pitboss() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_PITBOSS');
  }

  set pitboss(newValue) {
    this._setNewGameOption('GAMEOPTION_PITBOSS', newValue);
  }

  get policySaving() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_POLICY_SAVING');
  }

  set policySaving(newValue) {
    this._setNewGameOption('GAMEOPTION_POLICY_SAVING', newValue);
  }

  get promotionSaving() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_PROMOTION_SAVING');
  }

  set promotionSaving(newValue) {
    this._setNewGameOption('GAMEOPTION_PROMOTION_SAVING', newValue);
  }

  get ragingBarbarians() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_RAGING_BARBARIANS');
  }

  set ragingBarbarians(newValue) {
    this._setNewGameOption('GAMEOPTION_RAGING_BARBARIANS', newValue);
  }

  get randomPersonalities() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_RANDOM_PERSONALITIES');
  }

  set randomPersonalities(newValue) {
    this._setNewGameOption('GAMEOPTION_RANDOM_PERSONALITIES', newValue);
  }

  get turnTimerEnabled() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_END_TURN_TIMER_ENABLED');
  }

  set turnTimerEnabled(newValue) {
    this._setNewGameOption('GAMEOPTION_END_TURN_TIMER_ENABLED', newValue);
  }

  // http://blog.frank-mich.com/civilization-v-how-to-change-turn-type-of-a-started-game/
  get turnType() {
    if (this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_DYNAMIC_TURNS') === true) {
      return Civ5Save.TURN_TYPES.HYBRID;
    } else if (this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_SIMULTANEOUS_TURNS') === true) {
      return Civ5Save.TURN_TYPES.SIMULTANEOUS;
    } else if (this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_DYNAMIC_TURNS') === false &&
      this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_SIMULTANEOUS_TURNS') === false) {
      return Civ5Save.TURN_TYPES.SEQUENTIAL;
    }
  }

  set turnType(newValue) {
    if (newValue === Civ5Save.TURN_TYPES.HYBRID) {
      this._setNewGameOption('GAMEOPTION_DYNAMIC_TURNS', true);
      this._setNewGameOption('GAMEOPTION_SIMULTANEOUS_TURNS', false);
    } else if (newValue === Civ5Save.TURN_TYPES.SIMULTANEOUS) {
      this._setNewGameOption('GAMEOPTION_DYNAMIC_TURNS', false);
      this._setNewGameOption('GAMEOPTION_SIMULTANEOUS_TURNS', true);
    } else if (newValue === Civ5Save.TURN_TYPES.SEQUENTIAL) {
      this._setNewGameOption('GAMEOPTION_DYNAMIC_TURNS', false);
      this._setNewGameOption('GAMEOPTION_SIMULTANEOUS_TURNS', false);
    }
  }

  _getPropertyIfDefined(propertyName) {
    if (this._properties.hasOwnProperty(propertyName)) {
      return this._properties[propertyName].getValue(this._saveData);
    }
  }

  _setNewGameOption(newGameOptionKey, newGameOptionValue) {
    let newSaveData = this._properties.gameOptionsMap.setValue(this._saveData, newGameOptionKey, newGameOptionValue);
    if (!this._isNullOrUndefined(newSaveData)) {
      this._saveData = newSaveData;
    }
  }
}

// TODO: Turn this into a class field once the proposal makes it into the spec (https://github.com/tc39/proposals)
Civ5Save.TURN_TYPES = {
  HYBRID: 'Hybrid',
  SEQUENTIAL: 'Sequential',
  SIMULTANEOUS: 'Simultaneous'
};
