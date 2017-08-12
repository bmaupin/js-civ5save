(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Civ5Save"] = factory();
	else
		root["Civ5Save"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Civ5SaveProperty {
  constructor(byteOffset, length) {
    this.byteOffset = byteOffset;
    this.length = length;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Civ5SaveProperty;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Civ5SaveProperty__ = __webpack_require__(0);


class Civ5SaveIntProperty extends __WEBPACK_IMPORTED_MODULE_0__Civ5SaveProperty__["a" /* default */] {
  getValue(saveData) {
    if (this.length === 1) {
      return saveData.getUint8(this.byteOffset);
    } else if (this.length === 4) {
      return saveData.getUint32(this.byteOffset, true);
    }
  }

  setValue(saveData, newValue) {
    if (this.length === 1) {
      saveData.setUint8(this.byteOffset, newValue);
    } else if (this.length === 4) {
      saveData.setUint32(this.byteOffset, newValue, true);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Civ5SaveIntProperty;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Civ5SaveProperty__ = __webpack_require__(0);


class Civ5SaveStringProperty extends __WEBPACK_IMPORTED_MODULE_0__Civ5SaveProperty__["a" /* default */] {
  constructor(byteOffset, length, saveData) {
    super(byteOffset, length);

    if (this._isNullOrUndefined(this.length)) {
      this.length = this._getStringLength(saveData, this.byteOffset) + 4;
    }
  }

  _isNullOrUndefined(variable) {
    return typeof variable === 'undefined' || variable === null;
  }

  _getStringLength(saveData, byteOffset) {
    return saveData.getUint32(byteOffset, true);
  }

  getValue(saveData) {
    return saveData.getString(this.byteOffset + 4, this.length - 4);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Civ5SaveStringProperty;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Subclassing DataView in babel requires https://www.npmjs.com/package/babel-plugin-transform-builtin-extend
class Civ5SaveDataView extends DataView {
  getString(byteOffset, byteLength) {
    let string = '';
    for (let byte = byteOffset; byte < byteOffset + byteLength; byte++) {
      string += String.fromCharCode(this.getUint8(byte));
    }
    return string;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Civ5SaveDataView;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Civ5SaveProperty__ = __webpack_require__(0);


class Civ5SaveBoolProperty extends __WEBPACK_IMPORTED_MODULE_0__Civ5SaveProperty__["a" /* default */] {
  getValue(saveData) {
    if (this.length === 1) {
      return Boolean(saveData.getUint8(this.byteOffset));
    } else if (this.length === 4) {
      return Boolean(saveData.getUint32(this.byteOffset, true));
    }
  }

  setValue(saveData, newValue) {
    if (this.length === 1) {
      saveData.setUint8(this.byteOffset, Number(newValue));
    } else if (this.length === 4) {
      saveData.setUint32(this.byteOffset, Number(newValue), true);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Civ5SaveBoolProperty;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Civ5SaveDataView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Civ5SavePropertyDefinitions_json__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Civ5SavePropertyDefinitions_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Civ5SavePropertyDefinitions_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Civ5SavePropertyFactory__ = __webpack_require__(7);




class Civ5Save {
  constructor(saveData) {
    this._saveData = new __WEBPACK_IMPORTED_MODULE_0__Civ5SaveDataView__["a" /* default */](saveData.buffer);
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

    for (let propertyName in __WEBPACK_IMPORTED_MODULE_1__Civ5SavePropertyDefinitions_json___default.a) {
      // Skip string array properties since there isn't much value in implementing them until they're needed, plus the
      // string array containing player colours doesn't seem to have a predictable length (can have 63 or 64 items)
      if (['playerColours', 'playerNames2', 'section23Skip1'].includes(propertyName)) {
        continue;
      }

      // Make propertyDefinition a copy; otherwise it will modify the property for every instance of the Civ5Save class
      let propertyDefinition = Object.assign({}, __WEBPACK_IMPORTED_MODULE_1__Civ5SavePropertyDefinitions_json___default.a[propertyName]);

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

      properties[propertyName] = __WEBPACK_IMPORTED_MODULE_2__Civ5SavePropertyFactory__["a" /* default */].fromType(
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

    const LAST_PROPERTY_DEFINITION = __WEBPACK_IMPORTED_MODULE_1__Civ5SavePropertyDefinitions_json___default.a[Object.keys(__WEBPACK_IMPORTED_MODULE_1__Civ5SavePropertyDefinitions_json___default.a)[Object.keys(
      __WEBPACK_IMPORTED_MODULE_1__Civ5SavePropertyDefinitions_json___default.a).length - 1]];
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
      return __WEBPACK_IMPORTED_MODULE_1__Civ5SavePropertyDefinitions_json___default.a.gameMode.values[this._properties.gameMode.getValue(this._saveData)];
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

  // https://github.com/Bownairo/Civ5SaveEditor
  get pitboss() {
    return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_PITBOSS');
  }

  set pitboss(newValue) {
    this._setNewGameOption('GAMEOPTION_PITBOSS', newValue);
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
/* harmony export (immutable) */ __webpack_exports__["default"] = Civ5Save;


// TODO: Turn this into a class field once the proposal makes it into the spec (https://github.com/tc39/proposals)
Civ5Save.TURN_TYPES = {
  HYBRID: 'Hybrid',
  SEQUENTIAL: 'Sequential',
  SIMULTANEOUS: 'Simultaneous'
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {
	"fileSignature": {
		"byteOffsetInSection": 0,
		"length": 4,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "string"
	},
	"saveGameVersion": {
		"byteOffsetInSection": 4,
		"length": 4,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "int"
	},
	"gameVersion": {
		"byteOffsetInSection": 8,
		"length": null,
		"sectionByBuild": {
			"230620": 1
		},
		"type": "string"
	},
	"gameBuild": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"230620": 1
		},
		"type": "string"
	},
	"currentTurn": {
		"byteOffsetInSection": null,
		"length": 4,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "int"
	},
	"gameMode": {
		"_comment": "This property exists in all versions but only seems to gain significance around build 230620",
		"byteOffsetInSection": null,
		"length": 1,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "int",
		"values": [
			"Single player",
			"Multiplayer",
			"Hotseat"
		]
	},
	"player1Civilization": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "string"
	},
	"difficulty": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "string"
	},
	"startingEra": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "string"
	},
	"currentEra": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "string"
	},
	"gamePace": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "string"
	},
	"mapSize": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "string"
	},
	"mapFile": {
		"_comment": "The map file appears multiple times; I have no idea why (see section19Map)",
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "string"
	},
	"enabledDLC": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "dlcStringArray"
	},
	"section19Skip1": {
		"byteOffsetInSection": 264,
		"length": null,
		"sectionByBuild": {
			"98650": 17,
			"262623": 18,
			"395070": 19
		},
		"type": "string"
	},
	"section19Skip2": {
		"byteOffsetInSection": null,
		"length": 7,
		"sectionByBuild": {
			"98650": 17,
			"262623": 18,
			"395070": 19
		},
		"type": "bytes"
	},
	"section19Map": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 17,
			"262623": 18,
			"395070": 19
		},
		"type": "string"
	},
	"section19Skip3": {
		"byteOffsetInSection": null,
		"length": 4,
		"sectionByBuild": {
			"98650": 17,
			"262623": 18,
			"395070": 19
		},
		"type": "bytes"
	},
	"maxTurns": {
		"_comment": "https://gaming.stackexchange.com/a/273907/154341",
		"byteOffsetInSection": null,
		"length": 4,
		"sectionByBuild": {
			"98650": 17,
			"262623": 18,
			"395070": 19
		},
		"type": "int"
	},
	"playerNames2": {
		"_comment": "This seems to be the second place in the file with player names. There's enough space for 64 names",
		"byteOffsetInSection": 4,
		"length": null,
		"sectionByBuild": {
			"98650": 21,
			"262623": 22,
			"395070": 23
		},
		"type": "stringArray"
	},
	"section23Skip1": {
		"byteOffsetInSection": null,
		"length": 4,
		"sectionByBuild": {
			"98650": 21,
			"262623": 22,
			"395070": 23
		},
		"type": "int"
	},
	"turnTimerLength": {
		"_comment": "https://steamcommunity.com/app/8930/discussions/0/864973761026018000/#c619568192863618582",
		"byteOffsetInSection": null,
		"length": 4,
		"sectionByBuild": {
			"98650": 21,
			"262623": 22,
			"395070": 23
		},
		"type": "int"
	},
	"playerColours": {
		"_comment": "Starting with build 310700 this is a list of strings. Before that it's a list bytes. Seems like it can have 63 or 64 items.",
		"byteOffsetInSection": 4,
		"length": null,
		"sectionByBuild": {
			"98650": 23,
			"262623": 24,
			"395070": 25
		},
		"type": "stringArray"
	},
	"privateGame": {
		"_comment": "https://github.com/Canardlaquay/Civ5SavePrivate",
		"byteOffsetInSection": null,
		"length": 1,
		"sectionByBuild": {
			"98650": 23,
			"262623": 24,
			"395070": 25
		},
		"type": "bool"
	},
	"section29Timer1": {
		"byteOffsetInSection": 269,
		"length": null,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "string"
	},
	"section29Skip1": {
		"byteOffsetInSection": null,
		"length": 12,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "bytes"
	},
	"section29TurnTimer": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "string"
	},
	"section29TxtKeyTurnTimer": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "string"
	},
	"section29Timer2": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "string"
	},
	"section29Skip2": {
		"byteOffsetInSection": null,
		"length": 25,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "bytes"
	},
	"timeVictory": {
		"_comment": "https://gaming.stackexchange.com/a/273907/154341",
		"byteOffsetInSection": null,
		"length": 1,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "bool"
	},
	"scienceVictory": {
		"_comment": "https://gaming.stackexchange.com/a/273907/154341",
		"byteOffsetInSection": null,
		"length": 1,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "bool"
	},
	"dominationVictory": {
		"_comment": "https://gaming.stackexchange.com/a/273907/154341",
		"byteOffsetInSection": null,
		"length": 1,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "bool"
	},
	"culturalVictory": {
		"_comment": "https://gaming.stackexchange.com/a/273907/154341",
		"byteOffsetInSection": null,
		"length": 1,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "bool"
	},
	"diplomaticVictory": {
		"_comment": "https://gaming.stackexchange.com/a/273907/154341",
		"byteOffsetInSection": null,
		"length": 1,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "bool"
	},
	"section30Skip1": {
		"_comment": "This section is 76 bytes long if either expansion pack is installed. Otherwise it's 72 bytes long.",
		"byteOffsetInSection": 4,
		"length": null,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "bytes"
	},
	"section30MapSize1": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "string"
	},
	"section30TxtKeyMapHelp": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "string"
	},
	"section30Skip2": {
		"byteOffsetInSection": null,
		"length": 8,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "bytes"
	},
	"section30MapSize2": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "string"
	},
	"section30TxtKeyMapSize": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "string"
	},
	"section30MapSize3": {
		"_comment": "This section is 80 bytes long if Brave New World is installed. It's 76 bytes if only Gods and Kings is installed. Otherwise it's 72 bytes long.",
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "string"
	},
	"section30Skip3": {
		"byteOffsetInSection": null,
		"length": 72,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "bytes"
	},
	"gameOptionsMap": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "stringToBoolMap"
	}
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Civ5SaveBoolProperty__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Civ5SaveDLCStringArray__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Civ5SaveIntProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Civ5SaveProperty__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Civ5SaveStringProperty__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Civ5SaveStringToBoolMap__ = __webpack_require__(9);







class Civ5SavePropertyFactory {
  static fromType(type, byteOffset, length, saveData) {
    switch (type) {
    case 'bool':
      return new __WEBPACK_IMPORTED_MODULE_0__Civ5SaveBoolProperty__["a" /* default */](byteOffset, length);

    case 'bytes':
      return new __WEBPACK_IMPORTED_MODULE_3__Civ5SaveProperty__["a" /* default */](byteOffset, length);

    case 'dlcStringArray':
      return new __WEBPACK_IMPORTED_MODULE_1__Civ5SaveDLCStringArray__["a" /* default */](byteOffset, saveData);

    case 'int':
      return new __WEBPACK_IMPORTED_MODULE_2__Civ5SaveIntProperty__["a" /* default */](byteOffset, length);

    case 'string':
      return new __WEBPACK_IMPORTED_MODULE_4__Civ5SaveStringProperty__["a" /* default */](byteOffset, length, saveData);

    case 'stringToBoolMap':
      return new __WEBPACK_IMPORTED_MODULE_5__Civ5SaveStringToBoolMap__["a" /* default */](byteOffset, saveData);

    default:
      throw new Error(`Property type ${type} not handled`);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Civ5SavePropertyFactory;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Civ5SaveIntProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Civ5SaveStringProperty__ = __webpack_require__(2);



class Civ5SaveDLCStringArray {
  constructor(byteOffset, saveData) {
    this.byteOffset = byteOffset;
    this.length = 4;
    this._array = new Array();
    this._size = new __WEBPACK_IMPORTED_MODULE_0__Civ5SaveIntProperty__["a" /* default */](this.byteOffset, 4, saveData);

    if (this._getSize(saveData) > 0) {
      let currentByteOffset = this.byteOffset + 4;
      for (let i = 0; i < this._getSize(saveData); i++) {
        // Skip 16 byte unique identifier followed by 0100 0000
        currentByteOffset += 20;
        let dlcName = new __WEBPACK_IMPORTED_MODULE_1__Civ5SaveStringProperty__["a" /* default */](currentByteOffset, null, saveData);
        currentByteOffset += dlcName.length;

        this._array.push(dlcName.getValue(saveData));
      }

      this.length = currentByteOffset - this.byteOffset;
    }

    Object.freeze(this._array);
  }

  _getSize(saveData) {
    return this._size.getValue(saveData);
  }

  getArray() {
    return this._array;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Civ5SaveDLCStringArray;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Civ5SaveBoolProperty__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Civ5SaveDataView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Civ5SaveIntProperty__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Civ5SaveStringProperty__ = __webpack_require__(2);





class Civ5SaveStringToBoolMap {
  constructor(byteOffset, saveData) {
    this.byteOffset = byteOffset;
    this.length = 4;
    this._items = new Map();
    this._size = new __WEBPACK_IMPORTED_MODULE_2__Civ5SaveIntProperty__["a" /* default */](this.byteOffset, 4, saveData);

    if (this._getSize(saveData) > 0) {
      let currentByteOffset = this.byteOffset + 4;
      for (let i = 0; i < this._getSize(saveData); i++) {
        currentByteOffset = this._addItemToMap(saveData, currentByteOffset);
      }
    }
  }

  _addItemToMap(saveData, byteOffset) {
    let itemKeyProperty = new __WEBPACK_IMPORTED_MODULE_3__Civ5SaveStringProperty__["a" /* default */](byteOffset, null, saveData);
    byteOffset += itemKeyProperty.length;
    let itemValueProperty = new __WEBPACK_IMPORTED_MODULE_0__Civ5SaveBoolProperty__["a" /* default */](byteOffset, 4, saveData);
    byteOffset += itemValueProperty.length;

    this._items.set(itemKeyProperty.getValue(saveData), itemValueProperty);
    this.length = byteOffset - this.byteOffset;

    return byteOffset;
  }

  _getSize(saveData) {
    return this._size.getValue(saveData);
  }

  _setSize(saveData, newValue) {
    this._size.setValue(saveData, newValue);
  }

  getValue(saveData, itemKey) {
    if (this._items.has(itemKey)) {
      return this._items.get(itemKey).getValue(saveData);
    } else {
      return false;
    }
  }

  setValue(saveData, itemKey, newItemValue) {
    if (this._items.has(itemKey)) {
      this._items.get(itemKey).setValue(saveData, newItemValue);

    } else {
      return this._addItemToSaveData(saveData, itemKey, newItemValue);
    }
  }

  _addItemToSaveData(saveData, itemKey, newItemValue) {
    this._setSize(saveData, this._getSize(saveData) + 1);

    let itemKeyLengthArray = this._int32ToUint8Array(itemKey.length);
    let itemKeyArray = this._stringToUint8Array(itemKey);
    let itemValueArray = this._int32ToUint8Array(Number(newItemValue));
    let arrayToInsert = this._concatTypedArrays(
      this._concatTypedArrays(
        itemKeyLengthArray,
        itemKeyArray
      ),
      itemValueArray
    );

    let newSaveDataTypedArray = this._insertIntoTypedArray(
      new Uint8Array(saveData.buffer),
      arrayToInsert,
      this.byteOffset + this.length);
    let newSaveData = new __WEBPACK_IMPORTED_MODULE_1__Civ5SaveDataView__["a" /* default */](newSaveDataTypedArray.buffer);

    this._addItemToMap(newSaveData, this.byteOffset + this.length);

    return newSaveData;
  }

  // Inspired by https://stackoverflow.com/a/12965194/399105
  _int32ToUint8Array(int32) {
    let int32Array = new Uint8Array(4);
    for (let i = 0; i < int32Array.length; i++) {
      let byte = int32 & 0xff;
      int32Array[i] = byte;
      int32 = (int32 - byte) / 256;
    }
    return int32Array;
  }

  _stringToUint8Array(string) {
    let stringArray = new Uint8Array(string.length);
    for (let i = 0; i < string.length; i++) {
      stringArray[i] = string.charCodeAt(i);
    }
    return stringArray;
  }

  // https://stackoverflow.com/a/33703102/399105
  _concatTypedArrays(a, b) {
    var c = new (a.constructor)(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
  }

  _insertIntoTypedArray(array, arrayToInsert, insertAtByteOffset) {
    return this._concatTypedArrays(
      this._concatTypedArrays(
        array.slice(0, insertAtByteOffset),
        arrayToInsert
      ),
      array.slice(insertAtByteOffset, array.length)
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Civ5SaveStringToBoolMap;



/***/ })
/******/ ]);
});