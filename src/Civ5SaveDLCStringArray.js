import Civ5SaveIntProperty from './Civ5SaveIntProperty';
import Civ5SaveStringProperty from './Civ5SaveStringProperty';

export default class Civ5SaveDLCStringArray {
  constructor(byteOffset, saveData) {
    this.byteOffset = byteOffset;
    this.length = 4;
    this._array = new Array();
    this._size = new Civ5SaveIntProperty(this.byteOffset, 4, saveData);

    if (this._getSize(saveData) > 0) {
      let currentByteOffset = this.byteOffset + 4;
      for (let i = 0; i < this._getSize(saveData); i++) {
        // Skip 16 byte unique identifier followed by 0100 0000
        currentByteOffset += 20;
        let dlcName = new Civ5SaveStringProperty(currentByteOffset, null, saveData);
        currentByteOffset += dlcName.length;

        this._array.push(dlcName.getValue(saveData));
      }

      this.length = currentByteOffset - this.byteOffset;
    }

    Object.freeze(this._array);
  }

  _getSize(saveData) {
    return this._size.getValue(saveData);
  }

  getArray() {
    return this._array;
  }
}
