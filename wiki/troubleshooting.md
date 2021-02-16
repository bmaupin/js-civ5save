#### Troubleshooting parsing errors

1. Open civ5save-editor locally or the [deployed version](https://bmaupin.github.io/civ5save-editor/)

1. Open the browser dev tools (F12) and set it to pause on exceptions, including caught exceptions

1. Open the problematic save file

1. In the debugger select `_getProperties` to inspect the property name, byte offset, and values for previous properties

1. Using the [property definitions](https://github.com/bmaupin/js-civ5save/blob/master/src/Civ5SavePropertyDefinitions.js) as a guide, go through the save file to determine where the incorrect byte offset may be
