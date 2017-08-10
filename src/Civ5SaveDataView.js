// Subclassing DataView in babel requires https://www.npmjs.com/package/babel-plugin-transform-builtin-extend
export default class Civ5SaveDataView extends DataView {
  getString(byteOffset, byteLength) {
    let string = '';
    for (let byte = byteOffset; byte < byteOffset + byteLength; byte++) {
      string += String.fromCharCode(this.getUint8(byte));
    }
    return string;
  }
}
