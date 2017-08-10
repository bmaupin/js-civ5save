import Civ5SaveProperty from './Civ5SaveProperty';

export default class Civ5SaveIntProperty extends Civ5SaveProperty {
  getValue(saveData) {
    if (this.length === 1) {
      return saveData.getUint8(this.byteOffset);
    } else if (this.length === 4) {
      return saveData.getUint32(this.byteOffset, true);
    }
  }

  setValue(saveData, newValue) {
    if (this.length === 1) {
      saveData.setUint8(this.byteOffset, newValue);
    } else if (this.length === 4) {
      saveData.setUint32(this.byteOffset, newValue, true);
    }
  }
}
