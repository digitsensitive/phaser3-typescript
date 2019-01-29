## Phaser.DOM.ScaleManager

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

TODO: Write
TODO: Edit config.md
-> scale: {
        mode: Phaser.DOM.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.DOM.CENTER_BOTH,
        width: 800,
        height: 600
    },

### Public Functions

#### startFullscreen
TODO: Write
https://developer.mozilla.org/en-US/docs/Web/API/FullscreenOptions

An example with integrated button to enter fullscreen:
```
var button = this.add.image(16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
button.on('pointerdown', function () {

    if (this.scale.isFullscreen)
    {
        button.setFrame(0);
        this.scale.stopFullscreen();
    }
    else
    {
        button.setFrame(1);
        this.scale.startFullscreen();
    }

}, this);
```

#### getFullscreenTarget
TODO: Write

#### stopFullscreen
TODO: Write

#### toggleFullscreen
TODO: Write

### Extends

- EventEmitter

### References

- [Phaser World Issue 138](https://madmimi.com/p/85e7ad?pact=953842-149350630-9240020332-a0486ff55b3f455813db0a4a44dd2ebc5198d101)
- [Phaser Example](http://labs.phaser.io/100.html?src=src\scalemanager\full%20screen%20game.js&v=138)
