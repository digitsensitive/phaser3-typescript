## Phaser.Loader.FileTypes.PackFile

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

A single JSON Pack File suitable for loading by the Loader.

### Example

```
const PackFileConfig = {
  key: "gamePack",
  url: "./assets/pack.json",
  extension: 'json',
  dataKey: "",
  xhrSettings: XHRSettingsObject
}

this.load.pack(PackFileConfig);
```

or

```
this.load.pack("preload", "./src/games/tank/assets/pack.json", "preload");
```
