import Civ5Save from '../civ5save';

const path = require('path');

const TEST_SAVEGAME_V10017 = path.join(__dirname, 'resources', '1.0.0.17.Civ5Save');
const TEST_SAVEGAME_V101135 = path.join(__dirname, 'resources', '1.0.1.135.Civ5Save');
const TEST_SAVEGAME_V101221 = path.join(__dirname, 'resources', '1.0.1.221.Civ5Save');
const TEST_SAVEGAME_V10213 = path.join(__dirname, 'resources', '1.0.2.13.Civ5Save');
const TEST_SAVEGAME_V103279 = path.join(__dirname, 'resources', '1.0.3.279.Civ5Save');

const NEW_CULTURAL_VICTORY = false;
const NEW_DIPLOMATIC_VICTORY = true;
const NEW_DOMINATION_VICTORY = true;
const NEW_MAX_TURNS = 123;
const NEW_PRIVATE_GAME = false;
const NEW_SAVEGAME_FILENAME = 'New.Civ5Save';
const NEW_SCIENCE_VICTORY = false;
const NEW_TIME_VICTORY = true;

let savegame10017;
let savegame101135;
let savegame101221;
let savegame10213;
let savegame103279;

function getFileBlob(url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.addEventListener('load', function() {
      resolve(xhr.response);
    });
    xhr.addEventListener('error', function() {
      reject(xhr.statusText);
    });
    xhr.send();
  });
}

test('Create new Civ5Save instances from file', async () => {
  let fileBlob = await getFileBlob(TEST_SAVEGAME_V10017);
  savegame10017 = await Civ5Save.fromFile(fileBlob);

  fileBlob = await getFileBlob(TEST_SAVEGAME_V101135);
  savegame101135 = await Civ5Save.fromFile(fileBlob);

  fileBlob = await getFileBlob(TEST_SAVEGAME_V101221);
  savegame101221 = await Civ5Save.fromFile(fileBlob);

  fileBlob = await getFileBlob(TEST_SAVEGAME_V10213);
  savegame10213 = await Civ5Save.fromFile(fileBlob);

  fileBlob = await getFileBlob(TEST_SAVEGAME_V103279);
  savegame103279 = await Civ5Save.fromFile(fileBlob);
});

test('Get game build', () => {
  expect(savegame10017.gameBuild).toBe('201080');
  expect(savegame101135.gameBuild).toBe('210752');
  expect(savegame101221.gameBuild).toBe('218015');
  expect(savegame10213.gameBuild).toBe('341540');
  expect(savegame103279.gameBuild).toBe('403694');
});

test('Get game version', () => {
  expect(savegame10017.gameVersion).not.toBeDefined();
  expect(savegame101135.gameVersion).not.toBeDefined();
  expect(savegame101221.gameVersion).not.toBeDefined();
  expect(savegame10213.gameVersion).toBe('1.0.2.13 (341540)');
  expect(savegame103279.gameVersion).toBe('1.0.3.279(130961)');
});

test('Get current turn', () => {
  expect(savegame10017.currentTurn).toBe(19);
  expect(savegame101135.currentTurn).toBe(176);
  expect(savegame101221.currentTurn).toBe(52);
  expect(savegame10213.currentTurn).toBe(12);
  expect(savegame103279.currentTurn).toBe(264);
});

test('Get game mode', () => {
  expect(savegame10017.gameMode).not.toBeDefined();
  expect(savegame101135.gameMode).not.toBeDefined();
  expect(savegame101221.gameMode).not.toBeDefined();
  expect(savegame10213.gameMode).toBe('Single player');
  expect(savegame103279.gameMode).toBe('Multiplayer');
});

test('Get player 1 civilization', () => {
  expect(savegame10017.player1Civilization).toBe('CIVILIZATION_PERSIA');
  expect(savegame101135.player1Civilization).toBe('CIVILIZATION_ARABIA');
  expect(savegame101221.player1Civilization).toBe('CIVILIZATION_FRANCE');
  expect(savegame10213.player1Civilization).toBe('CIVILIZATION_SPAIN');
  expect(savegame103279.player1Civilization).toBe('CIVILIZATION_DENMARK');
});

test('Get difficulty', () => {
  expect(savegame10017.difficulty).toBe('HANDICAP_CHIEFTAIN');
  expect(savegame101135.difficulty).toBe('HANDICAP_WARLORD');
  expect(savegame101221.difficulty).toBe('HANDICAP_PRINCE');
  expect(savegame10213.difficulty).toBe('HANDICAP_IMMORTAL');
  expect(savegame103279.difficulty).toBe('HANDICAP_SETTLER');
});

test('Get starting era', () => {
  expect(savegame10017.startingEra).toBe('ERA_ANCIENT');
  expect(savegame101135.startingEra).toBe('ERA_ANCIENT');
  expect(savegame101221.startingEra).toBe('ERA_MEDIEVAL');
  expect(savegame10213.startingEra).toBe('ERA_ANCIENT');
  expect(savegame103279.startingEra).toBe('ERA_FUTURE');
});

test('Get current era', () => {
  expect(savegame10017.currentEra).toBe('ERA_ANCIENT');
  expect(savegame101135.currentEra).toBe('ERA_ANCIENT');
  expect(savegame101221.currentEra).toBe('ERA_RENAISSANCE');
  expect(savegame10213.currentEra).toBe('ERA_ANCIENT');
  expect(savegame103279.currentEra).toBe('ERA_FUTURE');
});

test('Get game pace', () => {
  expect(savegame10017.gamePace).toBe('GAMESPEED_STANDARD');
  expect(savegame101135.gamePace).toBe('GAMESPEED_MARATHON');
  expect(savegame101221.gamePace).toBe('GAMESPEED_QUICK');
  expect(savegame10213.gamePace).toBe('GAMESPEED_STANDARD');
  expect(savegame103279.gamePace).toBe('GAMESPEED_QUICK');
});

test('Get map size', () => {
  expect(savegame10017.mapSize).toBe('WORLDSIZE_SMALL');
  expect(savegame101135.mapSize).toBe('WORLDSIZE_HUGE');
  expect(savegame101221.mapSize).toBe('WORLDSIZE_STANDARD');
  expect(savegame10213.mapSize).toBe('WORLDSIZE_STANDARD');
  expect(savegame103279.mapSize).toBe('WORLDSIZE_DUEL');
});

test('Get map file', () => {
  expect(savegame10017.mapFile).toBe('Assets\\Maps\\Continents.lua');
  expect(savegame101135.mapFile).toBe('Assets/Maps/Pangaea.lua');
  expect(savegame101221.mapFile).toBe('Assets\\DLC\\DLC_02\\Scenarios\\NewWorldScenario\\NewWorld_Scenario_MapScript.lua');
  expect(savegame10213.mapFile).toBe('Assets\\Maps\\Pangaea.lua');
  expect(savegame103279.mapFile).toBe('Assets\\Maps\\Earth_Duel.Civ5Map');
});

test('Get max turns', () => {
  expect(savegame10017.maxTurns).toBe(500);
  expect(savegame101135.maxTurns).toBe(1500);
  expect(savegame101221.maxTurns).toBe(100);
  expect(savegame10213.maxTurns).toBe(500);
  expect(savegame103279.maxTurns).toBe(0);
});

test('Set max turns', () => {
  savegame10017.maxTurns = NEW_MAX_TURNS;
  savegame101135.maxTurns = NEW_MAX_TURNS;
  savegame101221.maxTurns = NEW_MAX_TURNS;
  savegame10213.maxTurns = NEW_MAX_TURNS;
  savegame103279.maxTurns = NEW_MAX_TURNS;
  expect(savegame10017.maxTurns).toBe(NEW_MAX_TURNS);
  expect(savegame101135.maxTurns).toBe(NEW_MAX_TURNS);
  expect(savegame101221.maxTurns).toBe(NEW_MAX_TURNS);
  expect(savegame10213.maxTurns).toBe(NEW_MAX_TURNS);
  expect(savegame103279.maxTurns).toBe(NEW_MAX_TURNS);
});

test('Get private game', () => {
  expect(savegame10017.privateGame).toBe(false);
  expect(savegame101135.privateGame).toBe(false);
  expect(savegame101221.privateGame).toBe(false);
  expect(savegame10213.privateGame).toBe(false);
  expect(savegame103279.privateGame).toBe(true);
});

test('Set private game', () => {
  savegame10017.privateGame = NEW_PRIVATE_GAME;
  savegame101135.privateGame = NEW_PRIVATE_GAME;
  savegame101221.privateGame = NEW_PRIVATE_GAME;
  savegame10213.privateGame = NEW_PRIVATE_GAME;
  savegame103279.privateGame = NEW_PRIVATE_GAME;
  expect(savegame10017.privateGame).toBe(NEW_PRIVATE_GAME);
  expect(savegame101135.privateGame).toBe(NEW_PRIVATE_GAME);
  expect(savegame101221.privateGame).toBe(NEW_PRIVATE_GAME);
  expect(savegame10213.privateGame).toBe(NEW_PRIVATE_GAME);
  expect(savegame103279.privateGame).toBe(NEW_PRIVATE_GAME);
});

test('Get time victory', () => {
  expect(savegame10017.timeVictory).toBe(true);
  expect(savegame101135.timeVictory).toBe(true);
  expect(savegame101221.timeVictory).toBe(true);
  expect(savegame10213.timeVictory).toBe(true);
  expect(savegame103279.timeVictory).toBe(false);
});

test('Set time victory', () => {
  savegame10017.timeVictory = NEW_TIME_VICTORY;
  savegame101135.timeVictory = NEW_TIME_VICTORY;
  savegame101221.timeVictory = NEW_TIME_VICTORY;
  savegame10213.timeVictory = NEW_TIME_VICTORY;
  savegame103279.timeVictory = NEW_TIME_VICTORY;
  expect(savegame10017.timeVictory).toBe(NEW_TIME_VICTORY);
  expect(savegame101135.timeVictory).toBe(NEW_TIME_VICTORY);
  expect(savegame101221.timeVictory).toBe(NEW_TIME_VICTORY);
  expect(savegame10213.timeVictory).toBe(NEW_TIME_VICTORY);
  expect(savegame103279.timeVictory).toBe(NEW_TIME_VICTORY);
});

test('Get science victory', () => {
  expect(savegame10017.scienceVictory).toBe(true);
  expect(savegame101135.scienceVictory).toBe(true);
  expect(savegame101221.scienceVictory).toBe(false);
  expect(savegame10213.scienceVictory).toBe(true);
  expect(savegame103279.scienceVictory).toBe(true);
});

test('Set science victory', () => {
  savegame10017.scienceVictory = NEW_SCIENCE_VICTORY;
  savegame101135.scienceVictory = NEW_SCIENCE_VICTORY;
  savegame101221.scienceVictory = NEW_SCIENCE_VICTORY;
  savegame10213.scienceVictory = NEW_SCIENCE_VICTORY;
  savegame103279.scienceVictory = NEW_SCIENCE_VICTORY;
  expect(savegame101221.scienceVictory).toBe(NEW_SCIENCE_VICTORY);
  expect(savegame10017.scienceVictory).toBe(NEW_SCIENCE_VICTORY);
  expect(savegame101135.scienceVictory).toBe(NEW_SCIENCE_VICTORY);
  expect(savegame10213.scienceVictory).toBe(NEW_SCIENCE_VICTORY);
  expect(savegame103279.scienceVictory).toBe(NEW_SCIENCE_VICTORY);
});

test('Get domination victory', () => {
  expect(savegame10017.dominationVictory).toBe(true);
  expect(savegame101135.dominationVictory).toBe(true);
  expect(savegame101221.dominationVictory).toBe(false);
  expect(savegame10213.dominationVictory).toBe(true);
  expect(savegame103279.dominationVictory).toBe(false);
});

test('Set domination victory', () => {
  savegame10017.dominationVictory = NEW_DOMINATION_VICTORY;
  savegame101135.dominationVictory = NEW_DOMINATION_VICTORY;
  savegame101221.dominationVictory = NEW_DOMINATION_VICTORY;
  savegame10213.dominationVictory = NEW_DOMINATION_VICTORY;
  savegame103279.dominationVictory = NEW_DOMINATION_VICTORY;
  expect(savegame10017.dominationVictory).toBe(NEW_DOMINATION_VICTORY);
  expect(savegame101135.dominationVictory).toBe(NEW_DOMINATION_VICTORY);
  expect(savegame101221.dominationVictory).toBe(NEW_DOMINATION_VICTORY);
  expect(savegame10213.dominationVictory).toBe(NEW_DOMINATION_VICTORY);
  expect(savegame103279.dominationVictory).toBe(NEW_DOMINATION_VICTORY);
});

test('Get cultural victory', () => {
  expect(savegame10017.culturalVictory).toBe(true);
  expect(savegame101135.culturalVictory).toBe(true);
  expect(savegame101221.culturalVictory).toBe(false);
  expect(savegame10213.culturalVictory).toBe(true);
  expect(savegame103279.culturalVictory).toBe(true);
});

test('Set cultural victory', () => {
  savegame10017.culturalVictory = NEW_CULTURAL_VICTORY;
  savegame101135.culturalVictory = NEW_CULTURAL_VICTORY;
  savegame101221.culturalVictory = NEW_CULTURAL_VICTORY;
  savegame10213.culturalVictory = NEW_CULTURAL_VICTORY;
  savegame103279.culturalVictory = NEW_CULTURAL_VICTORY;
  expect(savegame10017.culturalVictory).toBe(NEW_CULTURAL_VICTORY);
  expect(savegame101135.culturalVictory).toBe(NEW_CULTURAL_VICTORY);
  expect(savegame101221.culturalVictory).toBe(NEW_CULTURAL_VICTORY);
  expect(savegame10213.culturalVictory).toBe(NEW_CULTURAL_VICTORY);
  expect(savegame103279.culturalVictory).toBe(NEW_CULTURAL_VICTORY);
});

test('Get diplomatic victory', () => {
  expect(savegame10017.diplomaticVictory).toBe(true);
  expect(savegame101135.diplomaticVictory).toBe(true);
  expect(savegame101221.diplomaticVictory).toBe(false);
  expect(savegame10213.diplomaticVictory).toBe(true);
  expect(savegame103279.diplomaticVictory).toBe(false);
});

test('Set diplomatic victory', () => {
  savegame10017.diplomaticVictory = NEW_DIPLOMATIC_VICTORY;
  savegame101135.diplomaticVictory = NEW_DIPLOMATIC_VICTORY;
  savegame101221.diplomaticVictory = NEW_DIPLOMATIC_VICTORY;
  savegame10213.diplomaticVictory = NEW_DIPLOMATIC_VICTORY;
  savegame103279.diplomaticVictory = NEW_DIPLOMATIC_VICTORY;
  expect(savegame10017.diplomaticVictory).toBe(NEW_DIPLOMATIC_VICTORY);
  expect(savegame101135.diplomaticVictory).toBe(NEW_DIPLOMATIC_VICTORY);
  expect(savegame101221.diplomaticVictory).toBe(NEW_DIPLOMATIC_VICTORY);
  expect(savegame10213.diplomaticVictory).toBe(NEW_DIPLOMATIC_VICTORY);
  expect(savegame103279.diplomaticVictory).toBe(NEW_DIPLOMATIC_VICTORY);
});

test('Get pitboss', () => {
  expect(savegame10017.pitboss).toBe(false);
  expect(savegame101135.pitboss).toBe(false);
  expect(savegame101221.pitboss).toBe(false);
  expect(savegame10213.pitboss).toBe(false);
  expect(savegame103279.pitboss).toBe(true);
});

test('Get turn type', () => {
  expect(savegame10017.turnType).toBe(Civ5Save.TURN_TYPES.SEQUENTIAL);
  expect(savegame101135.turnType).toBe(Civ5Save.TURN_TYPES.SEQUENTIAL);
  expect(savegame101221.turnType).toBe(Civ5Save.TURN_TYPES.SEQUENTIAL);
  expect(savegame10213.turnType).toBe(Civ5Save.TURN_TYPES.SEQUENTIAL);
  expect(savegame103279.turnType).toBe(Civ5Save.TURN_TYPES.HYBRID);
});

test('Save to file', async () => {
  let newSavegameFile = savegame103279.toFile(NEW_SAVEGAME_FILENAME);
  let newSavegame = await Civ5Save.fromFile(newSavegameFile);

  expect(newSavegame.maxTurns).toBe(NEW_MAX_TURNS);
  expect(newSavegame.privateGame).toBe(NEW_PRIVATE_GAME);
  expect(newSavegame.timeVictory).toBe(NEW_TIME_VICTORY);
  expect(newSavegame.scienceVictory).toBe(NEW_SCIENCE_VICTORY);
  expect(newSavegame.dominationVictory).toBe(NEW_DOMINATION_VICTORY);
  expect(newSavegame.culturalVictory).toBe(NEW_CULTURAL_VICTORY);
  expect(newSavegame.diplomaticVictory).toBe(NEW_DIPLOMATIC_VICTORY);
});
