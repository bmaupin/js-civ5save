**Note: these are notes taken during research. For a more accurate description of the Civ5Save file format, see [../src/civ5saveproperties.js](../src/civ5saveproperties.json)**

| Section | Type | Sample values | Notes |
| --- | --- | --- | --- |
| 1 |  |  |  |
|  | String | Must be `CIV5` | File signature |
|  | 32-bit integer | 0x4<br>0x5<br>0x8 | Save game version:<br>4 = 1.0.0<br>5 = 1.0.1<br>8 = 1.0.2 - 1.0.3 |
|  | String | `1.0.2.13 (341540)`<br>`1.0.3.18 (379995)`<br>`1.0.3.80 (389545)`<br>`1.0.3.142 (395070)`<br>`1.0.3.144 (395131)`<br>`1.0.3.279(130961)` | Civ 5 version |
|  | String | `379995`<br>`395131`<br>`403694` | Civ 5 build |
|  | String | `CIVILIZATION_IROQUOIS`<br>`CIVILIZATION_MOROCCO` | Player 1 civilization |
|  | String | `HANDICAP_CHIEFTAIN`<br>`HANDICAP_SETTLER` | Difficulty |
|  | String | `ERA_ANCIENT` | Starting era |
|  | String | `ERA_ANCIENT`<br>`ERA_RENAISSANCE` | Current era |
|  | String | `GAMESPEED_STANDARD`<br>`GAMESPEED_QUICK` | Game pace |
|  | String | `WORLDSIZE_DUEL`<br>`WORLDSIZE_SMALL` | Map size |
|  | String | `Assets\Maps\Continents.lua`<br>`Assets\Maps\Earth_Duel.Civ5Map` | Map |
| 3 |  |  | Player information |
| 8 |  |  | Civilizations |
| 9 |  |  | Leaders |
| 14 |  |  | Climate |
| 18 |  |  | See notes below |
| 18/19 |  |  |  |
|  | 32-bit integer | 0x0<br>0x14a<br>0x1f4 | Max turns |
| 19/20 |  |  | City states |
| 24/25 |  |  | Player colours |
| 25/26 |  |  | Sea level |
| 28/29 |  |  |  |
|  |  |  | Turn timer |
|  | Boolean |  | Victory conditions |
| 29/30 |  |  | Various map and game options |
| 32/33 |  |  | zlib compressed data starts with 0x789c |

Notes:
---
- Sections are separated by 0x40000000
- Savegames may contain different number of sections
  - Version 1.0.3.142 (build 395070)+
    - Contains 33 sections
    - Section 18 is an additional section that contains mostly 0xff
  - Version 1.0.3.18 (379995) - 1.0.3.80 (build 389545)
    - Contains 32 sections
  - [Versions < 1.0.3.18 (379995)](http://www.kynosarges.org/misc/Civ5PatchNotes.txt)
    - ???
- Within each section, string values are prefixed by their length as a little-endian 32-bit integer. For example:  
  `1400 0000 4349 5649 4c49 5a41 5449 4f4e 5f4d 4f52 4f43 434f`
  - `1400 0000` = 0x14 (little endian) = 20 bytes
  - `4349...` = `CIVILIZATION_MOROCCO` (20 bytes long)

References:
---
- File format
  - https://github.com/rivarolle/civ5-saveparser
  - https://github.com/omni-resources/civ5-save-parser
  - https://github.com/urbanski/010_Civ5Save/blob/master/civ5.bt
- Victory conditions/max turns
  - https://gaming.stackexchange.com/a/273907/154341
- Multiplayer turn types
  - http://blog.frank-mich.com/civilization-v-how-to-change-turn-type-of-a-started-game/
- Multiplayer lobby public/private
  - https://github.com/Canardlaquay/Civ5SavePrivate/blob/master/Civ5PrivateSave/Form1.cs
  - https://github.com/Renophaston/DefectiveCivSavePrivatizer/blob/master/main.c
- Multiplayer pitboss setting
  - https://github.com/Bownairo/Civ5SaveEditor/blob/master/SaveEditor.c
- Multiplayer turn timer
  - https://steamcommunity.com/app/8930/discussions/0/864973761026018000/#c619568192863618582
- Multiplayer password and player status
  - https://github.com/omni-resources/civ5-save-parser
