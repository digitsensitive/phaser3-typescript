/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2020 digitsensitive
 * @description  Animation Creator Service
 *               A Simple Service that helps creating animations.
 * @version      1.0.0
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
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
export class AnimationCreatorService {
  private scene: Phaser.Scene;
  private animationData: any;

  constructor(scene: Phaser.Scene, data: any) {
    this.scene = scene;
    this.animationData = data;
    this.createGameAnimations();
  }

  private createGameAnimations(): void {
    // go through every object of the array anims, defined in the animations.json
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
          outputArray: data.frames.outputArray || [],
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

      // create the animation through the global Animation Manager of Phaser
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

  /**
   * Appendix:
   * Configs taken from official Phaser library code and edited
   *
   *
   * Phaser.Types.Animations.Animation
   * {string} [key] - The key that the animation will be associated with. i.e. sprite.animations.play(key)
   * {Phaser.Types.Animations.AnimationFrame[]} [frames] - An object containing data used to generate the frames for the animation
   * {string} [defaultTextureKey=null] - The key of the texture all frames of the animation will use. Can be overridden on a per frame basis.
   * {integer} [frameRate] - The frame rate of playback in frames per second (default 24 if duration is null)
   * {integer} [duration] - How long the animation should play for in milliseconds. If not given its derived from frameRate.
   * {boolean} [skipMissedFrames=true] - Skip frames if the time lags, or always advanced anyway?
   * {integer} [delay=0] - Delay before starting playback. Value given in milliseconds.
   * {integer} [repeat=0] - Number of times to repeat the animation (-1 for infinity)
   * {integer} [repeatDelay=0] - Delay before the animation repeats. Value given in milliseconds.
   * {boolean} [yoyo=false] - Should the animation yoyo? (reverse back down to the start) before repeating?
   * {boolean} [showOnStart=false] - Should sprite.visible = true when the animation starts to play?
   * {boolean} [hideOnComplete=false] - Should sprite.visible = false when the animation finishes?
   *
   *
   * Phaser.Types.Animations.AnimationFrame
   * {string} key - The key that the animation will be associated with. i.e. sprite.animations.play(key)
   * {(string|number)} frame - The key, or index number, of the frame within the animation.
   * {number} [duration=0] - The duration, in ms, of this frame of the animation.
   * {boolean} [visible] - Should the parent Game Object be visible during this frame of the animation?
   *
   *
   * Phaser.Types.Animations.GenerateFrameNames
   * {string} [prefix=''] - The string to append to every resulting frame name if using a range or an array of `frames`.
   * {integer} [start=0] - If `frames` is not provided, the number of the first frame to return.
   * {integer} [end=0] - If `frames` is not provided, the number of the last frame to return.
   * {string} [suffix=''] - The string to append to every resulting frame name if using a range or an array of `frames`.
   * {integer} [zeroPad=0] - The minimum expected lengths of each resulting frame's number. Numbers will be left-padded with zeroes until they are this long, then prepended and appended to create the resulting frame name.
   * {Phaser.Types.Animations.AnimationFrame[]} [outputArray=[]] - The array to append the created configuration objects to.
   * {(boolean|integer[])} [frames=false] - If provided as an array, the range defined by `start` and `end` will be ignored and these frame numbers will be used.
   *
   *
   * Phaser.Types.Animations.GenerateFrameNumbers
   * {integer} [start=0] - The starting frame of the animation.
   * {integer} [end=-1] - The ending frame of the animation.
   * {(boolean|integer)} [first=false] - A frame to put at the beginning of the animation, before `start` or `outputArray` or `frames`.
   * {Phaser.Types.Animations.AnimationFrame[]} [outputArray=[]] - An array to concatenate the output onto.
   * {(boolean|integer[])} [frames=false] - A custom sequence of frames.
   */
}
