import Civ5SaveIntProperty from './Civ5SaveIntProperty';

export default class Civ5SaveIntArray {
  constructor(byteOffset, items, saveData) {
    this.byteOffset = byteOffset;
    this.length = items * 4;
    this._array = new Array();

    for (let currentByteOffset = this.byteOffset;
      currentByteOffset < this.byteOffset + this.length;
      currentByteOffset += 4) {
      let arrayItem = new Civ5SaveIntProperty(currentByteOffset, 4, saveData);
      this._array.push(arrayItem.getValue(saveData));
    }

    Object.freeze(this._array);
  }

  getArray() {
    return this._array;
  }
}
