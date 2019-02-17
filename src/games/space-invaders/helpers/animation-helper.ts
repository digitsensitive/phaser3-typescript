/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Animation Helper
 * @license      Digitsensitive
 */

/**
 * Configs taken from official Phaser library code and edited
 *
 * AnimationConfig
 * {string}           [key] - The key that the animation will be associated with. i.e. sprite.animations.play(key)
 * {AnimationFrameConfig[]} [frames] - An object containing data used to generate the frames for the animation
 * {string}           [defaultTextureKey=null] - The key of the texture all frames of the animation will use. Can be overridden on a per frame basis.
 * {integer}          [frameRate] - The frame rate of playback in frames per second (default 24 if duration is null)
 * {integer}          [duration] - How long the animation should play for in milliseconds. If not given its derived from frameRate.
 * {boolean}          [skipMissedFrames=true] - Skip frames if the time lags, or always advanced anyway?
 * {integer}          [delay=0] - Delay before starting playback. Value given in milliseconds.
 * {integer}          [repeat=0] - Number of times to repeat the animation (-1 for infinity)
 * {integer}          [repeatDelay=0] - Delay before the animation repeats. Value given in milliseconds.
 * {boolean}          [yoyo=false] - Should the animation yoyo? (reverse back down to the start) before repeating?
 * {boolean}          [showOnStart=false] - Should sprite.visible = true when the animation starts to play?
 * {boolean}          [hideOnComplete=false] - Should sprite.visible = false when the animation finishes?
 *
 * AnimationFrameConfig
 * {string}           key - The key that the animation will be associated with. i.e. sprite.animations.play(key)
 * {(string|number)}  frame - [description]
 * {number}           [duration=0] - [description]
 * {boolean}          [visible] - [description]
 *
 * GenerateFrameNamesConfig
 * {string}           [prefix=''] - [description]
 * {integer}          [start=0] - [description]
 * {integer}          [end=0] - [description]
 * {string}           [suffix=''] - [description]
 * {integer}          [zeroPad=0] - [description]
 * {boolean}          [frames=false] - [description]
 *
 * GenerateFrameNumbersConfig
 * {integer}          [start=0] - [At which frame the animation starts]
 * {integer}          [end=-1] - [At which frame the animation stops]
 * {boolean}          [first=false] - [description]
 * {boolean}          [frames=false] - [description]
 */

/**
 * This is a helper class for your game animations.
 *
 * There is a easier way to load animations from JSON:
 * https://labs.phaser.io/edit.html?src=src\animation\from%20json.js
 *
 * The only problem with that approach is, that you can not use
 * generateFrameNames and generateFrameNumbers and with that not load
 * your frames from your atlas.
 *
 * The class needs a scene from you game to be able to create the animations.
 * Since the Animation Manager is global, any scene from your game is okay.
 * The class also needs the animation data to be able to create the animations.
 * We load a JSON upfront and get the data from the global cache.
 * @param scene [Any scene from your game]
 * @param data  [Animation data from the cache, loaded from JSON]
 */
export class AnimationHelper {
  private scene: Phaser.Scene;
  private animationData: any;

  constructor(scene: Phaser.Scene, data: any) {
    this.scene = scene;
    this.animationData = data;
    this.createGameAnimations();
  }

  private createGameAnimations(): void {
    for (let data of this.animationData.anims) {
      let frames;
      let framesArray;
      if (data.frames.typeOfGeneration === "generateFrameNames") {
        frames = this.scene.anims.generateFrameNames(data.frames.key, {
          prefix: data.frames.prefix || "",
          start: data.frames.start || 0,
          end: data.frames.end || 0,
          suffix: data.frames.suffix || "",
          zeroPad: data.frames.zeroPad || 0,
          frames: data.frames.frames || false
        });
      } else if (data.frames.typeOfGeneration === "generateFrameNumbers") {
        frames = this.scene.anims.generateFrameNumbers(data.frames.key, {
          start: data.frames.start || 0,
          end: data.frames.end || -1,
          first: data.frames.first || false,
          frames: data.frames.frames || false
        });
      } else {
        for (let i of data.frames) {
          let frame = {
            key: i.key,
            frame: i.frame,
            duration: i.duration || 0,
            visible: i.visible
          };
          framesArray.push(frame);
        }
      }

      this.scene.anims.create({
        key: data.key,
        frames: frames || framesArray,
        defaultTextureKey: data.defaultTextureKey || null,
        frameRate: data.frameRate || 24,
        duration: data.duration,
        skipMissedFrames: data.skipMissedFrames || true,
        delay: data.delay || 0,
        repeat: data.repeat || 0,
        repeatDelay: data.repeatDelay || 0,
        yoyo: data.yoyo || false,
        showOnStart: data.showOnStart || false,
        hideOnComplete: data.hideOnComplete || false
      });
    }
  }
}
