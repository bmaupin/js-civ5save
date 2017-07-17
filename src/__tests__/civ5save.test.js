import Civ5Save from "../civ5save";

const path = require('path');

const TEST_SAVEGAME_V100 = path.join(__dirname, "resources", "1.0.0.17 (test).Civ5Save");
const TEST_SAVEGAME_V103 = path.join(__dirname, "resources", "1.0.3.279.victory-all-advanced-all.Civ5Save");

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

test("Get game build (v1.0.0)", async () => {
  let fileBlob = await getFileBlob(TEST_SAVEGAME_V100);
  let savegame = await Civ5Save.fromFile(fileBlob);
  expect(savegame.gameBuild).toBe("201080");
});

test("Get game build (v1.0.3)", async () => {
  let fileBlob = await getFileBlob(TEST_SAVEGAME_V103);
  let savegame = await Civ5Save.fromFile(fileBlob);
  expect(savegame.gameBuild).toBe("403694");
});

test("Get game version (v1.0.0)", async () => {
  let fileBlob = await getFileBlob(TEST_SAVEGAME_V100);
  let savegame = await Civ5Save.fromFile(fileBlob);
  expect(savegame.gameVersion).not.toBeDefined();
});

test("Get game version (v1.0.3)", async () => {
  let fileBlob = await getFileBlob(TEST_SAVEGAME_V103);
  let savegame = await Civ5Save.fromFile(fileBlob);
  expect(savegame.gameVersion).toBe("1.0.3.279(130961)");
});

test("Get max turns (v1.0.0)", async () => {
  let fileBlob = await getFileBlob(TEST_SAVEGAME_V100);
  let savegame = await Civ5Save.fromFile(fileBlob);
  expect(savegame.maxTurns).toBe(500);
});

test("Get max turns (v1.0.3)", async () => {
  let fileBlob = await getFileBlob(TEST_SAVEGAME_V103);
  let savegame = await Civ5Save.fromFile(fileBlob);
  expect(savegame.maxTurns).toBe(330);
});
