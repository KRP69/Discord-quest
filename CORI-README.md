# CORI Quest Tool

A public repository for the CORI BetterDiscord quest dashboard and deafen routing hub.

## Overview

CORI is a private-portal style quest dashboard and virtual voice-routing experience designed around a three-file BetterDiscord loader architecture.

## Files

This repository is intended to publish the CORI three-file loader chain exactly as expected by the plugin:

- `CORI.plugin.js` — hub and UI plugin file
- `QuestEngine.js` — quest engine file
- `DeafenEngine.js` — deafen engine file

## Raw GitHub Repository Base

The loader expects a public raw GitHub base URL in the following pattern:

```js
https://raw.githubusercontent.com/CORI-1/CORI-Quest-Tool/main/
```

From that base, the plugin resolves the file chain:

```js
CORI_HUB_URL = CORI_REPO_BASE + "CORI.plugin.js";
CORI_QUEST_URL = CORI_REPO_BASE + "QuestEngine.js";
CORI_DEAFEN_URL = CORI_REPO_BASE + "DeafenEngine.js";
```

## Community

Join the official community server:

https://discord.gg/c2h

For more information, contact Brownie in the CORI community server.
![alt text](image.png)
## License

This repository uses the MIT license.
