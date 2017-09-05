import Civ5SaveIntProperty from './Civ5SaveIntProperty';

export default class Civ5SaveIntArray {
  constructor(byteOffset, items, saveData) {
    this.byteOffset = byteOffset;
    this._array = new Array();

    let currentByteOffset = this.byteOffset;
    for (let i = 0; i < items; i++) {
      let arrayItem = new Civ5SaveIntProperty(currentByteOffset, 4, saveData);
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
