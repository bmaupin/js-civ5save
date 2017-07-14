import Civ5Save from "../civ5save";

// TODO: Replace this with a relative path if possible
//const noOptionsSavegamePath = "file://./src/__tests__/resources/victory-all-advanced-all.Civ5Save";
const noOptionsSavegamePath = "file:///home/user/Dropbox/Projects/javascript-civ5save/src/__tests__/resources/victory-all-advanced-all.Civ5Save";
// const noOptionsSavegamePath = "file:///home/user/Dropbox/Projects/javascript-civ5save/src/__tests__/resources/test.txt";
// const noOptionsSavegamePath = "file:///home/user/Dropbox/Projects/javascript-civ5save/src/__tests__/resources/1.0.0.17 (Crash).Civ5Save";

function getFileBlob(url) {
  return new Promise(function (resolve, reject) {
    let xhr = new global.XMLHttpRequest();
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

test("Get game version", async () => {
  let fileBlob = await getFileBlob(noOptionsSavegamePath);
  let savegame = await Civ5Save.fromFile(fileBlob);
  expect(savegame.gameVersion).toBe("1.0.3.279(130961)");
});

test("Get game build", async () => {
  let fileBlob = await getFileBlob(noOptionsSavegamePath);
  let savegame = await Civ5Save.fromFile(fileBlob);
  expect(savegame.gameBuild).toBe("403694");
});

test("Get max turns", async () => {
  let fileBlob = await getFileBlob(noOptionsSavegamePath);
  let savegame = await Civ5Save.fromFile(fileBlob);
  expect(savegame.maxTurns).toBe(330);
});