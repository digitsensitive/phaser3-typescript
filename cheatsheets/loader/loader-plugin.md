## Phaser.Loader

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

The Loader Plugin is one of the [seven default plugins](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene/systems.md#default-plugins). It is installed into every scene unless you specify otherwise and can be accessed with `this.load`.

It handles loading of all external contents. Use the `preload` method to preload
your assets in the scene. Files are loaded in parallel by default and the amount of
concurrent connections can be controlled in the [game config](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/boot/config.md)
with `maxParallelDownloads`.

### Public Functions

#### setBaseURL
Append a URL before the path of any asset.
> Once a base URL is set it will affect every file loaded by the Loader from that point on.
It does not change any file already being loaded. To reset it, call this method with no arguments.

#### setPath
The value of `path`, if set, is placed before any relative file path given.

```
this.load.setPath("images/sprites/");
this.load.image("ball", "ball.png"); -> images/sprites/ball.png
this.load.image("boom", "http://server.com/explode.png"); -> http://server.com/explode.png
```

> Please note that the path is added before the filename but after the baseURL (if set.)

#### setPrefix
An optional prefix that is automatically prepended to the start of every file key.

#### setCORS
Set the Cross Origin Resource Sharing value used when loading files.

> https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

#### keyExists
Check the key and type of the given file to see if it will conflict with anything already
in a Cache, the Texture Manager, or the list or inflight queues.

#### addPack
Takes a well formed, fully parsed pack file object and adds its entries into the load queue.

> Usually you do not call this method directly, but instead use `Loader.pack` and
supply a path to a JSON file that holds the pack data.

#### isLoading
Is the Loader actively loading, or processing loaded files?

#### isReady
Is the Loader ready to start a new load?

#### flagForRemoval
Add a file into the pending-deletion queue.

#### saveJSON
Convert the given JSON data into a file that the browser then prompts you
to download so you can save it locally.

> The data must be well formed JSON and ready-parsed, not a JavaScript object.

#### save
Causes the browser to save the given data as a file to its default Downloads folder.

> Creates a DOM level anchor link, assigns it as being a `download` anchor, sets the href
to be an ObjectURL based on the given data, and then invokes a click event.

#### reset
Reset the Loader.

> This will clear all lists and reset the base URL, path and prefix.
