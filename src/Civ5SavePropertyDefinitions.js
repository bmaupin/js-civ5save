export default {
  'fileSignature': {
    'byteOffsetInSection': 0,
    'length': 4,
    'sectionByBuild': {
      '98650': 1
    },
    'type': 'string',
    // Game build is a later property and not yet defined, so the section will need to be determined without it
    getSection(saveGameVersion) {
      return 1;
    },
  },
  'saveGameVersion': {
    'byteOffsetInSection': 4,
    'length': 4,
    'sectionByBuild': {
      '98650': 1
    },
    'type': 'int',
    // Game build is a later property and not yet defined, so the section will need to be determined without it
    getSection(saveGameVersion) {
      return 1;
    },
  },
  // This property is updated if the game is saved with a newer version of Civ 5
  'gameVersion': {
    'byteOffsetInSection': 8,
    'length': null,
    'sectionByBuild': {
      '230620': 1
    },
    'type': 'string',
    // Game build is a later property and not yet defined, so the section will need to be determined without it
    getSection(saveGameVersion) {
      if (saveGameVersion >= 7) {
        return 1;
      } else {
        return null;
      }
    },
  },
  // This property is updated if the game is saved with a newer version of Civ 5. The build of Civ 5 that was originally used when the save file was created is stored later, after gameOptionsMap.
  'gameBuild': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '230620': 1
    },
    'type': 'string',
    // Game build is not yet defined, so the section will need to be determined without it
    getSection(saveGameVersion) {
      if (saveGameVersion >= 7) {
        return 1;
      } else {
        return null;
      }
    },
  },
  'currentTurn': {
    'byteOffsetInSection': null,
    'length': 4,
    'sectionByBuild': {
      '98650': 1
    },
    'type': 'int'
  },
  // This property exists in all versions but only seems to gain significance around build 230620
  'gameMode': {
    'byteOffsetInSection': null,
    'length': 1,
    'sectionByBuild': {
      '98650': 1
    },
    'type': 'int',
    'values': [
      'Single player',
      'Multiplayer',
      'Hotseat'
    ]
  },
  'player1Civilization': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 1
    },
    'type': 'string'
  },
  'difficulty': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 1
    },
    'type': 'string'
  },
  'startingEra': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 1
    },
    'type': 'string'
  },
  'currentEra': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 1
    },
    'type': 'string'
  },
  'gamePace': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 1
    },
    'type': 'string'
  },
  'mapSize': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 1
    },
    'type': 'string'
  },
  // The map file appears multiple times; I have no idea why (see section19Map)
  'mapFile': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 1
    },
    'type': 'string'
  },
  'enabledDLC': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 1
    },
    'type': 'dlcStringArray'
  },
  // Players after the first player marked as none seem to be superfluous
  'playerStatuses': {
    'byteOffsetInSection': 4,
    // Length is number of items, not bytes
    'length': 64,
    'sectionByBuild': {
      '98650': 4
    },
    'type': 'intArray',
    'values': [
      '',
      'AI',
      'Dead',
      'Human',
      'None'
    ]
  },
  // Starting with build 310700 this is a list of strings. Before that I'm not sure if it's a list of bytes or not there at all
  'playerCivilizations': {
    'byteOffsetInSection': 4,
    // Length is number of items, not bytes
    'length': 64,
    'sectionByBuild': {
      '310700': 8
    },
    'type': 'stringArray'
  },
  // This is rare but seems to contain the full path to the save file, e.g. C:\Users\Username\Documents\My Games\Sid Meier's Civilization 5\Saves\multi\auto\AutoSave_0310 AD-2030.Civ5Save
  'section19SkipSavePath': {
    'byteOffsetInSection': 260,
    'length': null,
    'sectionByBuild': {
      '98650': 17,
      '262623': 18,
      '395070': 19
    },
    'type': 'string'
  },
  // This appears to contain the current OS username
  'section19SkipUsername': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 17,
      '262623': 18,
      '395070': 19
    },
    'type': 'string'
  },
  'section19Skip1': {
    'byteOffsetInSection': null,
    'length': 7,
    'sectionByBuild': {
      '98650': 17,
      '262623': 18,
      '395070': 19
    },
    'type': 'bytes'
  },
  'section19Map': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 17,
      '262623': 18,
      '395070': 19
    },
    'type': 'string'
  },
  'section19Skip2': {
    'byteOffsetInSection': null,
    'length': 4,
    'sectionByBuild': {
      '98650': 17,
      '262623': 18,
      '395070': 19
    },
    'type': 'bytes'
  },
  // https://gaming.stackexchange.com/a/273907/154341
  'maxTurns': {
    'byteOffsetInSection': null,
    'length': 4,
    'sectionByBuild': {
      '98650': 17,
      '262623': 18,
      '395070': 19
    },
    'type': 'int'
  },
  // This seems to be the second place in the file with player names
  'playerNames2': {
    'byteOffsetInSection': 4,
    // Length is number of items, not bytes
    'length': 64,
    'sectionByBuild': {
      '98650': 21,
      '262623': 22,
      '395070': 23
    },
    'type': 'stringArray'
  },
  'section23Skip1': {
    'byteOffsetInSection': null,
    'length': 4,
    'sectionByBuild': {
      '98650': 21,
      '262623': 22,
      '395070': 23
    },
    'type': 'int'
  },
  // https://steamcommunity.com/app/8930/discussions/0/864973761026018000/#c619568192863618582
  'turnTimerLength': {
    'byteOffsetInSection': null,
    'length': 4,
    'sectionByBuild': {
      '98650': 21,
      '262623': 22,
      '395070': 23
    },
    'type': 'int'
  },
  // Starting with build 310700 this is a list of strings. Before that it's a list of bytes.
  'playerColours': {
    'byteOffsetInSection': 4,
    // Length is number of items, not bytes
    'length': 64,
    'sectionByBuild': {
      '98650': 23,
      '262623': 24,
      '395070': 25
    },
    'type': 'stringArray'
  },
  // https://github.com/Canardlaquay/Civ5SavePrivate
  'privateGame': {
    'byteOffsetInSection': null,
    'length': 1,
    'sectionByBuild': {
      '98650': 23,
      '262623': 24,
      '395070': 25
    },
    'type': 'bool'
  },
  'section29Timer1': {
    'byteOffsetInSection': 269,
    'length': null,
    'sectionByBuild': {
      '98650': 27,
      '262623': 28,
      '395070': 29
    },
    'type': 'string'
  },
  'section29Skip1': {
    'byteOffsetInSection': null,
    'length': 12,
    'sectionByBuild': {
      '98650': 27,
      '262623': 28,
      '395070': 29
    },
    'type': 'bytes'
  },
  'section29TurnTimer': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 27,
      '262623': 28,
      '395070': 29
    },
    'type': 'string'
  },
  'section29TxtKeyTurnTimer': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 27,
      '262623': 28,
      '395070': 29
    },
    'type': 'string'
  },
  'section29Timer2': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 27,
      '262623': 28,
      '395070': 29
    },
    'type': 'string'
  },
  'section29Skip2': {
    'byteOffsetInSection': null,
    'length': 25,
    'sectionByBuild': {
      '98650': 27,
      '262623': 28,
      '395070': 29
    },
    'type': 'bytes'
  },
  // https://gaming.stackexchange.com/a/273907/154341
  'timeVictory': {
    'byteOffsetInSection': null,
    'length': 1,
    'sectionByBuild': {
      '98650': 27,
      '262623': 28,
      '395070': 29
    },
    'type': 'bool'
  },
  // https://gaming.stackexchange.com/a/273907/154341
  'scienceVictory': {
    'byteOffsetInSection': null,
    'length': 1,
    'sectionByBuild': {
      '98650': 27,
      '262623': 28,
      '395070': 29
    },
    'type': 'bool'
  },
  // https://gaming.stackexchange.com/a/273907/154341
  'dominationVictory': {
    'byteOffsetInSection': null,
    'length': 1,
    'sectionByBuild': {
      '98650': 27,
      '262623': 28,
      '395070': 29
    },
    'type': 'bool'
  },
  // https://gaming.stackexchange.com/a/273907/154341
  'culturalVictory': {
    'byteOffsetInSection': null,
    'length': 1,
    'sectionByBuild': {
      '98650': 27,
      '262623': 28,
      '395070': 29
    },
    'type': 'bool'
  },
  // https://gaming.stackexchange.com/a/273907/154341
  'diplomaticVictory': {
    'byteOffsetInSection': null,
    'length': 1,
    'sectionByBuild': {
      '98650': 27,
      '262623': 28,
      '395070': 29
    },
    'type': 'bool'
  },
  // This section is 76 bytes long if either expansion pack is installed. Otherwise it's 72 bytes long.
  'section30Skip1': {
    'byteOffsetInSection': 4,
    'length': null,
    'sectionByBuild': {
      '98650': 28,
      '262623': 29,
      '395070': 30
    },
    'type': 'bytes'
  },
  'section30MapSize1': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 28,
      '262623': 29,
      '395070': 30
    },
    'type': 'string'
  },
  'section30TxtKeyMapHelp': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 28,
      '262623': 29,
      '395070': 30
    },
    'type': 'string'
  },
  'section30Skip2': {
    'byteOffsetInSection': null,
    'length': 8,
    'sectionByBuild': {
      '98650': 28,
      '262623': 29,
      '395070': 30
    },
    'type': 'bytes'
  },
  'section30MapSize2': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 28,
      '262623': 29,
      '395070': 30
    },
    'type': 'string'
  },
  'section30TxtKeyMapSize': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 28,
      '262623': 29,
      '395070': 30
    },
    'type': 'string'
  },
  'section30MapSize3': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 28,
      '262623': 29,
      '395070': 30
    },
    'type': 'string'
  },
  // This section is 80 bytes long if Brave New World is installed. It's 76 bytes if only Gods and Kings is installed. Otherwise it's 72 bytes long.
  'section30Skip3': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 28,
      '262623': 29,
      '395070': 30
    },
    'type': 'bytes'
  },
  // This is where a large chunk of game options are stored (http://civilization.wikia.com/wiki/Module:Data/Civ5/BNW/GameOptions)
  'gameOptionsMap': {
    'byteOffsetInSection': null,
    'length': null,
    'sectionByBuild': {
      '98650': 28,
      '262623': 29,
      '395070': 30
    },
    'type': 'stringToBoolMap'
  }
};
