import Civ5SaveProperty from './Civ5SaveProperty';

export default class Civ5SaveStringProperty extends Civ5SaveProperty {
  constructor(byteOffset, length, saveData) {
    super(byteOffset, length);

    if (this._isNullOrUndefined(this.length)) {
      this.length = this._getStringLength(saveData, this.byteOffset) + 4;
    }
  }

  _isNullOrUndefined(variable) {
    return typeof variable === 'undefined' || variable === null;
  }

  _getStringLength(saveData, byteOffset) {
    return saveData.getUint32(byteOffset, true);
  }

  getValue(saveData) {
    return saveData.getString(this.byteOffset + 4, this.length - 4);
  }
}
