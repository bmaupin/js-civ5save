import Civ5SaveDataView from './Civ5SaveDataView';
import Civ5SavePropertyDefinitions from './Civ5SavePropertyDefinitions.js';
import Civ5SavePropertyFactory from './Civ5SavePropertyFactory';
import ExtendableError from './ExtendableError';

/**
 * A Civilization V save file object.
 */
class Civ5Save {
  /**
   * Create a Civ5Save object.
   *
   * As an alternative, a static factory method is available for more convenient instantiation from a file: [fromFile](#static-method-fromFile)
   * @param {DataView} saveData - The save file contents.
   * @throws {InvalidSignatureError} Invalid file signature.
   * @throws {ParseError} Error while parsing the save file.
   */
  constructor(saveData) {
    /**
     * @private
     */
    // TODO: Convert fields and methods starting with underscores to private once it makes it into the spec
    // (https://github.com/tc39/proposals)
    this._saveData = new Civ5SaveDataView(saveData.buffer);
    /**
     * @private
     */
    this._verifyFileSignature();
    /**
     * @private
     */
    this._properties = this._getProperties();
  }

  /**
   * Create a Civ5Save object from a file.
   *
   * Reading data from a file needs to be done asynchronously; since the
   * [constructor](#instance-constructor-constructor) cannot be async, this static factory is provided as an alternative
   * way to instantiate a Civ5Save object from a file (https://stackoverflow.com/a/24686979/399105).
   * @param {File} saveFile - A Civilization V save file.
   * @return {Civ5Save} A Civ5Save object.
   * @throws {InvalidSignatureError} Invalid file signature.
   * @throws {ParseError} Error while parsing the save file.
   * @example
   * try {
   *   let save = await Civ5Save.fromFile(saveFile);
   *   ...
   */
  static async fromFile(saveFile) {
    let saveData = await Civ5Save._loadData(saveFile);
    return new Civ5Save(saveData);
  }

  /**
   * @private
   */
  static _loadData(saveFile) {
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

  /**
   * Write Civ5Save object to a blob.
   * @return {Blob} The save file with any changes.
   * @example
   * let downloadURL = window.URL.createObjectURL(save.toBlob());
   */
  toBlob() {
    return new Blob([this._saveData], {
      type: 'application/octet-stream'
    });
  }

  /**
   * @private
   */
  _verifyFileSignature() {
    if (this._saveData.getString(0, 4) !== 'CIV5') {
      throw new InvalidSignatureError('File signature does not match. Is this a Civ 5 savegame?');
    }
  }

  /**
   * @private
   */
  _getProperties() {
    this._gameBuild = null;
    let previousPropertyName = null;
    let previousPropertySection = 0;
    let properties = new Map();
    let saveGameVersion = null;
    let sectionOffsets = null;

    for (let propertyName in Civ5SavePropertyDefinitions) {
      // Before build 310700, playerColours is a list of bytes. There isn't much value in implementing that. And
      // privateGame comes after playerColours.
      // TODO: move this logic into property definitions file
      if (propertyName === 'playerColours' || propertyName === 'privateGame') {
        if (Number(this._gameBuild) < 310700) {
          continue;
        }
      }

      // Make propertyDefinition a copy; otherwise it will modify the property for every instance of the Civ5Save class
      let propertyDefinition = Object.assign({}, Civ5SavePropertyDefinitions[propertyName]);

      let propertySection = this._getPropertySection(propertyDefinition, saveGameVersion, this._gameBuild);
      // If propertySection is null, it means the property isn't available for the particular game build
      if (this._isNullOrUndefined(propertySection)) {
        if (propertyName === 'gameBuild') {
          this._gameBuild = this._getGameBuild();
          sectionOffsets = this._getSectionOffsets(this._gameBuild);
        }

        continue;
      }

      // TODO: move this logic into property definitions file
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

      let propertyByteOffset = 0;
      if (propertySection === previousPropertySection) {
        let previousProperty = properties[previousPropertyName];
        propertyByteOffset = previousProperty.byteOffset + previousProperty.length;

      } else if (previousPropertyName !== null) {
        propertyByteOffset = sectionOffsets[propertySection - 1].start + propertyDefinition.byteOffsetInSection;
      }

      try {
        properties[propertyName] = Civ5SavePropertyFactory.fromType(
          propertyDefinition.type,
          propertyByteOffset,
          propertyDefinition.length,
          this._saveData);
      } catch (e) {
        throw new ParseError(`Failure parsing save at property ${propertyName}`);
      }

      if (propertyName === 'gameBuild') {
        this._gameBuild = properties.gameBuild.getValue(this._saveData);
        sectionOffsets = this._getSectionOffsets(this._gameBuild);
      }
      if (propertyName === 'saveGameVersion') {
        saveGameVersion = properties.saveGameVersion.getValue(this._saveData);
      }

      previousPropertyName = propertyName;
      previousPropertySection = propertySection;
    }

    return properties;
  }

  /**
   * @private
   */
  _getSectionOffsets(gameBuild) {
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
        if (Number(gameBuild) < 310700) {
          let playerColourSection = 23;
          if (Number(gameBuild) >= 262623) {
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

  /**
   * @private
   * @see https://stackoverflow.com/a/22395463/399105
   */
  _areArraysEqual(array1, array2) {
    return (array1.length === array2.length) && array1.every(function(element, index) {
      return element === array2[index];
    });
  }

  /**
   * @private
   */
  _getPropertySection(propertyDefinition, saveGameVersion, gameBuild) {
    if (propertyDefinition.hasOwnProperty('getSection')) {
      return propertyDefinition.getSection(saveGameVersion);
    }

    let propertySection = null;

    for (let build in propertyDefinition.sectionByBuild) {
      if (Number.parseInt(gameBuild) >= Number.parseInt(build)) {
        propertySection = propertyDefinition.sectionByBuild[build];
      }
    }

    return propertySection;
  }

  /**
   * @private
   */
  _isNullOrUndefined(variable) {
    return typeof variable === 'undefined' || variable === null;
  }

  /**
   * Game build number.
   * @type {string}
   */
  get gameBuild() {
    return this._gameBuild;
  }

  /**
   * @private
   */
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

  /**
   * Game version.
   *
   * Note that this will be `undefined` if [gameBuild](#instance-get-gameBuild) is less than 230620. `undefined` is used
   * instead of `null` because older save files do not have a spot for this information (`null` might incorrectly imply
   * the spot is there but empty).
   * @type {string|undefined}
   */
  get gameVersion() {
    return this._getPropertyIfDefined('gameVersion');
  }

  /**
   * Current turn.
   * @type {number}
   */
  get currentTurn() {
    return this._getPropertyIfDefined('currentTurn');
  }

  /**
   * Game mode: one of `Civ5Save.GAME_MODES.SINGLE`, `Civ5Save.GAME_MODES.MULTI`, or `Civ5Save.GAME_MODES.HOTSEAT`.
   *
   * Note that this will be `undefined` if [gameBuild](#instance-get-gameBuild) is less than 230620 because the meaning
   * of its value is unknown. `undefined` is used instead of `null` because `null` might incorrectly imply the value is
   * empty.
   * @type {string|undefined}
   */
  get gameMode() {
    if (Number(this.gameBuild) >= 230620) {
      return Civ5SavePropertyDefinitions.gameMode.values[this._properties.gameMode.getValue(this._saveData)];
    }
  }

  /**
   * Game difficulty.
   * @type {string}
   */
  get difficulty() {
    return this._getBeautifiedPropertyIfDefined('difficulty');
  }

  /**
   * Starting era.
   * @type {string}
   */
  get startingEra() {
    return this._getBeautifiedPropertyIfDefined('startingEra');
  }

  /**
   * Current era.
   * @type {string}
   */
  get currentEra() {
    return this._getBeautifiedPropertyIfDefined('currentEra');
  }

  /**
   * Game pace.
   * @type {string}
   */
  get gamePace() {
    return this._getBeautifiedPropertyIfDefined('gamePace');
  }

  /**
   * Map size.
   * @type {string}
   */
  get mapSize() {
    return this._getBeautifiedPropertyIfDefined('mapSize');
  }

  /**
   * Map file.
   * @type {string}
   */
  get mapFile() {
    let mapFileValue = this._getPropertyIfDefined('mapFile');
    if (!this._isNullOrUndefined(mapFileValue)) {
      return this._beautifyMapFileValue(mapFileValue);
    }
  }

  /**
   * List of enabled DLC.
   * @type {Array}
   */
  get enabledDLC() {
    if (this._properties.hasOwnProperty('enabledDLC')) {
      return this._properties.enabledDLC.getArray();
    }
  }

  /**
   * List of players as objects with their civilization and status as properties.
   *
   * Civilization will be `undefined` if [gameBuild](#instance-get-gameBuild) is less than 310700.
   *
   * Status is one of `Civ5Save.PLAYER_STATUSES.AI`, `Civ5Save.PLAYER_STATUSES.DEAD`, `Civ5Save.PLAYER_STATUSES.HUMAN`,
   *     `Civ5Save.PLAYER_STATUSES.NONE`.
   * @type {Array.<{civilization: string|undefined, status: number}>}
   */
  get players() {
    if (this._isNullOrUndefined(this._players)) {
      /**
       * @private
       */
      this._players = new Array();
      let playerStatuses = this._properties.playerStatuses.getArray();
      for (let i = 0; i < playerStatuses.length; i++) {
        let player = new Object();
        player.status = Civ5SavePropertyDefinitions.playerStatuses.values[playerStatuses[i]];

        if (player.status === Civ5Save.PLAYER_STATUSES.NONE) {
          break;
        }

        if (this._properties.hasOwnProperty('playerCivilizations')) {
          if (this._properties.playerCivilizations.getArray()[i] === '') {
            break;
          }
          player.civilization = this._beautifyPropertyValue(this._properties.playerCivilizations.getArray()[i]);

        } else if (i === 0 && this._properties.hasOwnProperty('player1Civilization')) {
          player.civilization = this._beautifyPropertyValue(
            this._properties.player1Civilization.getValue(this._saveData));
        }

        this._players.push(player);
      }
    }

    return this._players;
  }

  /**
   * Max turns.
   * @type {number}
   */
  get maxTurns() {
    return this._getPropertyIfDefined('maxTurns');
  }

  /**
   * Max turns.
   * @type {number}
   */
  set maxTurns(newValue) {
    this._properties.maxTurns.setValue(this._saveData, newValue);
  }

  /**
   * Turn timer length for multiplayer games. If pitboss is enabled, this value represents turn timer in hours.
   *     Otherwise, it is in minutes.
   * @type {number}
   */
  get turnTimerLength() {
    return this._getPropertyIfDefined('turnTimerLength');
  }

  /**
   * Turn timer length for multiplayer games. If pitboss is enabled, this value represents turn timer in hours.
   *     Otherwise, it is in minutes.
   * @type {number}
   */
  set turnTimerLength(newValue) {
    this._properties.turnTimerLength.setValue(this._saveData, newValue);
  }

  /**
   * Private setting for multiplayer games.
   * @type {boolean}
   */
  get privateGame() {
    return this._getPropertyIfDefined('privateGame');
  }

  /**
   * Private setting for multiplayer games.
   * @type {boolean}
   */
  set privateGame(newValue) {
    this._properties.privateGame.setValue(this._saveData, newValue);
  }

  /**
   * Time victory.
   * @type {boolean}
   */
  get timeVictory() {
    return this._getPropertyIfDefined('timeVictory');
  }

  /**
   * Time victory.
   * @type {boolean}
   */
  set timeVictory(newValue) {
    this._properties.timeVictory.setValue(this._saveData, newValue);
  }

  /**
   * Science victory.
   * @type {boolean}
   */
  get scienceVictory() {
    return this._getPropertyIfDefined('scienceVictory');
  }

  /**
   * Science victory.
   * @type {boolean}
   */
  set scienceVictory(newValue) {
    this._properties.scienceVictory.setValue(this._saveData, newValue);
  }

  /**
   * Domination victory.
   * @type {boolean}
   */
  get dominationVictory() {
    return this._getPropertyIfDefined('dominationVictory');
  }

  /**
   * Domination victory.
   * @type {boolean}
   */
  set dominationVictory(newValue) {
    this._properties.dominationVictory.setValue(this._saveData, newValue);
  }

  /**
   * Cultural victory.
   * @type {boolean}
   */
  get culturalVictory() {
    return this._getPropertyIfDefined('culturalVictory');
  }

  /**
   * Cultural victory.
   * @type {boolean}
   */
  set culturalVictory(newValue) {
    this._properties.culturalVictory.setValue(this._saveData, newValue);
  }

  /**
   * Diplomatic victory.
   * @type {boolean}
   */
  get diplomaticVictory() {
    return this._getPropertyIfDefined('diplomaticVictory');
  }

  /**
   * Diplomatic victory.
   * @type {boolean}
   */
  set diplomaticVictory(newValue) {
    this._properties.diplomaticVictory.setValue(this._saveData, newValue);
  }

  /**
   * Always peace.
   * @type {boolean}
   */
  get alwaysPeace() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_ALWAYS_PEACE');
  }

  /**
   * Always peace.
   * @type {boolean}
   */
  set alwaysPeace(newValue) {
    this._setNewGameOption('GAMEOPTION_ALWAYS_PEACE', newValue);
  }

  /**
   * Always war.
   * @type {boolean}
   */
  get alwaysWar() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_ALWAYS_WAR');
  }

  /**
   * Always war.
   * @type {boolean}
   */
  set alwaysWar(newValue) {
    this._setNewGameOption('GAMEOPTION_ALWAYS_WAR', newValue);
  }

  /**
   * Complete kills.
   * @type {boolean}
   */
  get completeKills() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_COMPLETE_KILLS');
  }

  /**
   * Complete kills.
   * @type {boolean}
   */
  set completeKills(newValue) {
    this._setNewGameOption('GAMEOPTION_COMPLETE_KILLS', newValue);
  }

  /**
   * Lock mods.
   * @type {boolean}
   */
  get lockMods() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_LOCK_MODS');
  }

  /**
   * Lock mods.
   * @type {boolean}
   */
  set lockMods(newValue) {
    this._setNewGameOption('GAMEOPTION_LOCK_MODS', newValue);
  }

  /**
   * New random seed.
   * @type {boolean}
   */
  get newRandomSeed() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NEW_RANDOM_SEED');
  }

  /**
   * New random seed.
   * @type {boolean}
   */
  set newRandomSeed(newValue) {
    this._setNewGameOption('GAMEOPTION_NEW_RANDOM_SEED', newValue);
  }

  /**
   * No barbarians.
   * @type {boolean}
   */
  get noBarbarians() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_BARBARIANS');
  }

  /**
   * No barbarians.
   * @type {boolean}
   */
  set noBarbarians(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_BARBARIANS', newValue);
  }

  /**
   * No changing war or peace.
   * @type {boolean}
   */
  get noChangingWarPeace() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_CHANGING_WAR_PEACE');
  }

  /**
   * No changing war or peace.
   * @type {boolean}
   */
  set noChangingWarPeace(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_CHANGING_WAR_PEACE', newValue);
  }

  /**
   * No city razing.
   * @type {boolean}
   */
  get noCityRazing() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_CITY_RAZING');
  }

  /**
   * No city razing.
   * @type {boolean}
   */
  set noCityRazing(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_CITY_RAZING', newValue);
  }

  /**
   * No cultural overview UI.
   * @type {boolean}
   */
  get noCultureOverviewUI() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_CULTURE_OVERVIEW_UI');
  }

  /**
   * No cultural overview UI.
   * @type {boolean}
   */
  set noCultureOverviewUI(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_CULTURE_OVERVIEW_UI', newValue);
  }

  /**
   * No espionage.
   * @type {boolean}
   */
  get noEspionage() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_ESPIONAGE');
  }

  /**
   * No espionage.
   * @type {boolean}
   */
  set noEspionage(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_ESPIONAGE', newValue);
  }

  /**
   * No happiness.
   * @type {boolean}
   */
  get noHappiness() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_HAPPINESS');
  }

  /**
   * No happiness.
   * @type {boolean}
   */
  set noHappiness(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_HAPPINESS', newValue);
  }

  /**
   * No policies.
   * @type {boolean}
   */
  get noPolicies() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_POLICIES');
  }

  /**
   * No policies.
   * @type {boolean}
   */
  set noPolicies(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_POLICIES', newValue);
  }

  /**
   * No religion.
   * @type {boolean}
   */
  get noReligion() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_RELIGION');
  }

  /**
   * No religion.
   * @type {boolean}
   */
  set noReligion(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_RELIGION', newValue);
  }

  /**
   * No science.
   * @type {boolean}
   */
  get noScience() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_SCIENCE');
  }

  /**
   * No science.
   * @type {boolean}
   */
  set noScience(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_SCIENCE', newValue);
  }

  /**
   * No world congress.
   * @type {boolean}
   */
  get noWorldCongress() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_LEAGUES');
  }

  /**
   * No world congress.
   * @type {boolean}
   */
  set noWorldCongress(newValue) {
    this._setNewGameOption('GAMEOPTION_NO_LEAGUES', newValue);
  }

  /**
   * One-city challenge.
   * @type {boolean}
   */
  get oneCityChallenge() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_ONE_CITY_CHALLENGE');
  }

  /**
   * One-city challenge.
   * @type {boolean}
   */
  set oneCityChallenge(newValue) {
    this._setNewGameOption('GAMEOPTION_ONE_CITY_CHALLENGE', newValue);
  }

  /**
   * Pitboss.
   * @type {boolean}
   * @see https://github.com/Bownairo/Civ5SaveEditor
   */
  get pitboss() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_PITBOSS');
  }

  /**
   * Pitboss.
   * @type {boolean}
   * @see https://github.com/Bownairo/Civ5SaveEditor
   */
  set pitboss(newValue) {
    this._setNewGameOption('GAMEOPTION_PITBOSS', newValue);
  }

  /**
   * Policy saving.
   * @type {boolean}
   */
  get policySaving() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_POLICY_SAVING');
  }

  /**
   * Policy saving.
   * @type {boolean}
   */
  set policySaving(newValue) {
    this._setNewGameOption('GAMEOPTION_POLICY_SAVING', newValue);
  }

  /**
   * Promotion saving.
   * @type {boolean}
   */
  get promotionSaving() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_PROMOTION_SAVING');
  }

  /**
   * Promotion saving.
   * @type {boolean}
   */
  set promotionSaving(newValue) {
    this._setNewGameOption('GAMEOPTION_PROMOTION_SAVING', newValue);
  }

  /**
   * Raging barbarians.
   * @type {boolean}
   */
  get ragingBarbarians() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_RAGING_BARBARIANS');
  }

  /**
   * Raging barbarians.
   * @type {boolean}
   */
  set ragingBarbarians(newValue) {
    this._setNewGameOption('GAMEOPTION_RAGING_BARBARIANS', newValue);
  }

  /**
   * Random personalities.
   * @type {boolean}
   */
  get randomPersonalities() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_RANDOM_PERSONALITIES');
  }

  /**
   * Random personalities.
   * @type {boolean}
   */
  set randomPersonalities(newValue) {
    this._setNewGameOption('GAMEOPTION_RANDOM_PERSONALITIES', newValue);
  }

  /**
   * Turn timer enabled.
   * @type {boolean}
   */
  get turnTimerEnabled() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_END_TURN_TIMER_ENABLED');
  }

  /**
   * Turn timer enabled.
   * @type {boolean}
   */
  set turnTimerEnabled(newValue) {
    this._setNewGameOption('GAMEOPTION_END_TURN_TIMER_ENABLED', newValue);
  }

  /**
   * Turn mode: one of `Civ5Save.TURN_MODES.HYBRID`, `Civ5Save.TURN_MODES.SEQUENTIAL`, or
   *     `Civ5Save.TURN_MODES.SIMULTANEOUS`.
   * @type {string}
   * @see http://blog.frank-mich.com/civilization-v-how-to-change-turn-type-of-a-started-game/
   */
  get turnMode() {
    if (this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_DYNAMIC_TURNS') === true) {
      return Civ5Save.TURN_MODES.HYBRID;
    } else if (this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_SIMULTANEOUS_TURNS') === true) {
      return Civ5Save.TURN_MODES.SIMULTANEOUS;
    } else if (this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_DYNAMIC_TURNS') === false &&
      this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_SIMULTANEOUS_TURNS') === false) {
      return Civ5Save.TURN_MODES.SEQUENTIAL;
    }
  }

  /**
   * Turn mode: one of `Civ5Save.TURN_MODES.HYBRID`, `Civ5Save.TURN_MODES.SEQUENTIAL`, or
   *     `Civ5Save.TURN_MODES.SIMULTANEOUS`.
   * @type {string}
   * @see http://blog.frank-mich.com/civilization-v-how-to-change-turn-type-of-a-started-game/
   */
  set turnMode(newValue) {
    if (newValue === Civ5Save.TURN_MODES.HYBRID) {
      this._setNewGameOption('GAMEOPTION_DYNAMIC_TURNS', true);
      this._setNewGameOption('GAMEOPTION_SIMULTANEOUS_TURNS', false);
    } else if (newValue === Civ5Save.TURN_MODES.SIMULTANEOUS) {
      this._setNewGameOption('GAMEOPTION_DYNAMIC_TURNS', false);
      this._setNewGameOption('GAMEOPTION_SIMULTANEOUS_TURNS', true);
    } else if (newValue === Civ5Save.TURN_MODES.SEQUENTIAL) {
      this._setNewGameOption('GAMEOPTION_DYNAMIC_TURNS', false);
      this._setNewGameOption('GAMEOPTION_SIMULTANEOUS_TURNS', false);
    }
  }

  /**
   * @private
   */
  _getPropertyIfDefined(propertyName) {
    if (this._properties.hasOwnProperty(propertyName)) {
      return this._properties[propertyName].getValue(this._saveData);
    }
  }

  /**
   * @private
   */
  _getBeautifiedPropertyIfDefined(propertyName) {
    if (this._properties.hasOwnProperty(propertyName)) {
      return this._beautifyPropertyValue(this._properties[propertyName].getValue(this._saveData));
    }
  }

  /**
   * @private
   */
  _beautifyPropertyValue(propertyValue) {
    propertyValue = propertyValue.split('_')[1];
    propertyValue = propertyValue.toLowerCase();
    propertyValue = propertyValue.charAt(0).toUpperCase() + propertyValue.slice(1);
    return propertyValue;
  }

  /**
   * @private
   */
  _beautifyMapFileValue(mapFileValue) {
    mapFileValue = mapFileValue.split('/').slice(-1)[0];
    mapFileValue = mapFileValue.split('\\').slice(-1)[0];
    mapFileValue = mapFileValue.substring(0, mapFileValue.lastIndexOf('.'));
    mapFileValue = mapFileValue.replace(/_/g, ' ');
    return mapFileValue;
  }

  /**
   * @private
   */
  _setNewGameOption(newGameOptionKey, newGameOptionValue) {
    let newSaveData = this._properties.gameOptionsMap.setValue(this._saveData, newGameOptionKey, newGameOptionValue);
    if (!this._isNullOrUndefined(newSaveData)) {
      this._saveData = newSaveData;
    }
  }
}

// TODO: Turn these into class fields once the proposal makes it into the spec (https://github.com/tc39/proposals)
Civ5Save.GAME_MODES = {
  SINGLE: 'Single player',
  MULTI: 'Multiplayer',
  HOTSEAT: 'Hotseat'
};

Civ5Save.PLAYER_STATUSES = {
  AI: 'AI',
  DEAD: 'Dead',
  HUMAN: 'Human',
  NONE: 'None'
};

Civ5Save.TURN_MODES = {
  HYBRID: 'Hybrid',
  SEQUENTIAL: 'Sequential',
  SIMULTANEOUS: 'Simultaneous'
};

export default Civ5Save;

/**
 * Error signifying the file signature is invalid for a Civ5Save file.
 */
export class InvalidSignatureError extends ExtendableError {}

/**
 * Error signifying there was a problem parsing the save file.
 */
export class ParseError extends ExtendableError {}
