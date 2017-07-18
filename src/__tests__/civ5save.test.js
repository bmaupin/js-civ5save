import Civ5Save from "../civ5save";

const path = require('path');

const TEST_SAVEGAME_V100 = path.join(__dirname, "resources", "1.0.0.17 (test).Civ5Save");
const TEST_SAVEGAME_V103 = path.join(__dirname, "resources", "1.0.3.279.victory-all-advanced-all.Civ5Save");

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

test("Get max turns", () => {
  expect(savegame100.maxTurns).toBe(500);
  expect(savegame103.maxTurns).toBe(330);
});
