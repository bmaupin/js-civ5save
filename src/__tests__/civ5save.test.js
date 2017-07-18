import Civ5Save from "../civ5save";

const path = require('path');

const TEST_SAVEGAME_V100 = path.join(__dirname, "resources", "1.0.0.17 (test).Civ5Save");
const TEST_SAVEGAME_V103 = path.join(__dirname, "resources", "1.0.3.279.victory-none-advanced-none.Civ5Save");

let savegame100;
let savegame103;

function getFileBlob(url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.addEventListener("load", function() {
      resolve(xhr.response);
    });
    xhr.addEventListener("error", function() {
      reject(xhr.statusText);
    });
    xhr.send();
  });
};

beforeAll(async () => {
  let fileBlob = await getFileBlob(TEST_SAVEGAME_V100);
  savegame100 = await Civ5Save.fromFile(fileBlob);
  return savegame100;
});

beforeAll(async () => {
  let fileBlob = await getFileBlob(TEST_SAVEGAME_V103);
  savegame103 = await Civ5Save.fromFile(fileBlob);
  return savegame103;
});

test("Get game build", () => {
  expect(savegame100.gameBuild).toBe("201080");
  expect(savegame103.gameBuild).toBe("403694");
});

test("Get game version", () => {
  expect(savegame100.gameVersion).not.toBeDefined();
  expect(savegame103.gameVersion).toBe("1.0.3.279(130961)");
});

test("Get current turn", () => {
  expect(savegame100.currentTurn).toBe(19);
  expect(savegame103.currentTurn).toBe(0);
});

test("Get player 1 civilization", () => {
  expect(savegame100.player1Civilization).toBe("CIVILIZATION_PERSIA");
  expect(savegame103.player1Civilization).toBe("CIVILIZATION_MOROCCO");
});

test("Get difficulty", () => {
  expect(savegame100.difficulty).toBe("HANDICAP_CHIEFTAIN");
  expect(savegame103.difficulty).toBe("HANDICAP_SETTLER");
});

test("Get starting era", () => {
  expect(savegame100.startingEra).toBe("ERA_ANCIENT");
  expect(savegame103.startingEra).toBe("ERA_ANCIENT");
});

test("Get current era", () => {
  expect(savegame100.currentEra).toBe("ERA_ANCIENT");
  expect(savegame103.currentEra).toBe("ERA_ANCIENT");
});

test("Get game pace", () => {
  expect(savegame100.gamePace).toBe("GAMESPEED_STANDARD");
  expect(savegame103.gamePace).toBe("GAMESPEED_QUICK");
});

test("Get map size", () => {
  expect(savegame100.mapSize).toBe("WORLDSIZE_SMALL");
  expect(savegame103.mapSize).toBe("WORLDSIZE_DUEL");
});

test("Get map file", () => {
  expect(savegame100.mapFile).toBe("Assets\\Maps\\Continents.lua");
  expect(savegame103.mapFile).toBe("Assets\\Maps\\Earth_Duel.Civ5Map");
});

test("Get max turns", () => {
  expect(savegame100.maxTurns).toBe(500);
  expect(savegame103.maxTurns).toBe(0);
});

test("Get time victory", () => {
  expect(savegame100.timeVictory).toBe(true);
  expect(savegame103.timeVictory).toBe(false);
});

test("Get science victory", () => {
  expect(savegame100.scienceVictory).toBe(true);
  expect(savegame103.scienceVictory).toBe(false);
});

test("Get domination victory", () => {
  expect(savegame100.dominationVictory).toBe(true);
  expect(savegame103.dominationVictory).toBe(false);
});

test("Get cultural victory", () => {
  expect(savegame100.culturalVictory).toBe(true);
  expect(savegame103.culturalVictory).toBe(false);
});

test("Get diplomatic victory", () => {
  expect(savegame100.diplomaticVictory).toBe(true);
  expect(savegame103.diplomaticVictory).toBe(false);
});
