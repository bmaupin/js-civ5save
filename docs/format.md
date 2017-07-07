| Section | Type | Sample values | Notes |
| --- | --- | --- | --- |
| 1 |  |  |  |
|  |  | Must be `CIV5` | File signature |
|  | String | `1.0.3.18 (379995)`<br>`1.0.3.279(130961)` | Version |
|  | String | `379995`<br>`403694` | Build |
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
|  | Short | 0x0<br>0x14a<br>0x1f4 | Max turns |
| 19/20 |  |  | City states |
| 24/25 |  |  | Player colours |
| 25/26 |  |  | Sea level |
| 28/29 |  |  |  |
|  |  |  | Turn timer |
|  | Byte |  | Victory conditions |
| 29/30 |  |  | Various map and game options |
| 32/33 |  |  | zlib compressed data starts with 0x789c |

Notes:
---
- Sections are separated by 0x40000000
- Savegames may contain different number of sections
  - Version 1.0.3.279
    - Contains 33 sections
    - Section 18 is an additional section that contains mostly 0xff
      - TODO: figure out exact version/build number this extra section was added
  - Version 1.0.3.18
    - Contains 32 sections
- Within each section, string values are prefixed by their length. For example:  
  `1400 0000 4349 5649 4c49 5a41 5449 4f4e 5f4d 4f52 4f43 434f`
  - `1400 0000` = 0x14 (little endian) = 20 bytes
  - `4349...` = `CIVILIZATION_MOROCCO` (20 bytes long)

References:
---
- https://github.com/rivarolle/civ5-saveparser
- https://github.com/urbanski/010_Civ5Save/blob/master/civ5.bt
- Victory conditions/max turns
  - https://gaming.stackexchange.com/a/273907/154341
- Multiplayer turn types
  - http://blog.frank-mich.com/civilization-v-how-to-change-turn-type-of-a-started-game/
- Multiplayer lobby public/private
  - https://github.com/Canardlaquay/Civ5SavePrivate/blob/master/Civ5PrivateSave/Form1.cs
- Multiplayer pitboss setting
  - https://github.com/Bownairo/Civ5SaveEditor/blob/master/SaveEditor.c
