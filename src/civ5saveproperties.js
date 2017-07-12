export default {
  "fileSignature": {
    "byteOffset": 0,
    "length": 4,
    "previousProperty": null,
    "type": "fixedLengthString"
  },
  "saveGameVersion": {
    "byteOffset": 4,
    "length": 4,
    "previousProperty": "fileSignature",
    "type": "int32"
  },
  "gameVersion": {
    "byteOffset": 8,
    "length":  null,
    "previousProperty": "saveGameVersion",
    "type": "variableLengthString"
  },
  "gameBuild": {
    "byteOffset": null,
    "length":  null,
    "previousProperty": "gameVersion",
    "type": "variableLengthString"
  }
}
