import Civ5SaveProperties from "./civ5saveproperties";

const repoUrl = "https://github.com/bmaupin/civ5save";

export default class Civ5Save {
  constructor(saveData) {
    this.saveData = saveData;

    this.saveData.getVariableLengthString = function (byteOffset) {
      let stringLength = this.getStringLength(byteOffset);
      return this.getAsciiString(byteOffset + 4, stringLength);
    }

    this.saveData.getStringLength = function (byteOffset) {
      return saveData.getInt32(byteOffset, true);
    }

    this.saveData.getAsciiString = function (byteOffset, byteLength) {
      let string = "";
      for (let byte = byteOffset; byte < byteOffset + byteLength; byte++) {
        string += String.fromCharCode(this.getInt8(byte));
      }
      return string;
    }
  }

  // Use a static factory to instantiate the object since it relies on data that needs to be fetched asynchronously
  // https://stackoverflow.com/a/24686979/399105
  static async fromFile(saveFile) {
    let saveData = await Civ5Save.loadData(saveFile);
    let civ5save = new Civ5Save(saveData);
    civ5save.verifyFileSignature();
    civ5save.verifySaveGameVersion();
    return civ5save;
  }

  static loadData(saveFile) {
    return new Promise(function (resolve, reject) {
      let reader = new FileReader();

      reader.onload = function () {
        // Use a DataView for the savegame data since the ArrayBuffer returned by reader.result can't be used to
        // manipulate the data. A typed array such as Int8Array wouldn't be ideal either since the data contains types
        // of variable lengths
        resolve(new DataView(reader.result));
      }
      reader.onerror = function () {
        reject(reader.error);
      }

      reader.readAsArrayBuffer(saveFile);
    });
  }

  verifyFileSignature() {
    if (this.saveData.getAsciiString(Civ5SaveProperties.fileSignature.byteOffset, 4) !== "CIV5") {
      throw new Error("File signature does not match. Is this a Civ 5 savegame?");
    }
  }

  verifySaveGameVersion() {
    if (this.saveGameVersion !== 8) {
      throw new Error(`Savegame version ${this.saveGameVersion} unsupported. Please file an issue at ${repoUrl}.`);
    }
  }

  getProperty(propertyName) {
    switch (Civ5SaveProperties[propertyName].type) {
      case "fixedLengthString":
        break;

      case "int32":
        return this.saveData.getInt32(Civ5SaveProperties[propertyName].byteOffset, true);

      case "variableLengthString":
        this.populatePropertyOffsetAndLength(propertyName);
        console.log(`${propertyName} byteOffset=${Civ5SaveProperties[propertyName].byteOffset}`);
        console.log(`${propertyName} length=${Civ5SaveProperties[propertyName].length}`);
        return this.saveData.getVariableLengthString(Civ5SaveProperties[propertyName].byteOffset);
    }
  }

  populatePropertyOffsetAndLength(propertyName) {
    console.log(`populatePropertyOffsetAndLength(${propertyName})`);
    if (Civ5SaveProperties[propertyName].byteOffset === null) {
      console.log(`${propertyName} byteOffset is null`);
      let previousPropertyName = Civ5SaveProperties[propertyName].previousProperty;
      this.populatePropertyOffsetAndLength(previousPropertyName);
      Civ5SaveProperties[propertyName].byteOffset = Civ5SaveProperties[previousPropertyName].byteOffset + Civ5SaveProperties[previousPropertyName].length;
    }
    if (Civ5SaveProperties[propertyName].length === null) {
      console.log(`${propertyName} length is null`);
      Civ5SaveProperties[propertyName].length = this.saveData.getStringLength(
        Civ5SaveProperties[propertyName].byteOffset) + 4;
    }
  }

  get saveGameVersion() {
    return this.getProperty("saveGameVersion");
  }

  get gameVersion() {
    return this.getProperty("gameVersion");
  }

  get gameBuild() {
    return this.getProperty("gameBuild");
  }
}
