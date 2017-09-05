import Civ5SaveStringProperty from './Civ5SaveStringProperty';

export default class Civ5SaveStringArray {
  constructor(byteOffset, items, saveData) {
    this.byteOffset = byteOffset;
    this._array = new Array();

    let currentByteOffset = this.byteOffset;
    for (let i = 0; i < items; i++) {
      let arrayItem = new Civ5SaveStringProperty(currentByteOffset, null, saveData);
      currentByteOffset += arrayItem.length;
      this._array.push(arrayItem.getValue(saveData));
    }

    this.length = currentByteOffset - this.byteOffset;
    Object.freeze(this._array);
  }

  getArray() {
    return this._array;
  }
}
