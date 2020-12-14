/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Star Voyager: Enemy
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { GraphicsHelper } from "../helpers/graphics-helper";

export class Enemy extends Phaser.GameObjects.Graphics {
  // variables
  private zoom: number;

  // timers
  private changePositionTimer: Phaser.Time.TimerEvent;

  // helpers
  private graphicsHelper: GraphicsHelper;

  constructor(params) {
    super(params.scene, params);

    // init graphics
    this.x = params.x;
    this.y = params.y;

    // init variables
    this.zoom = 0.2;

    // init timer
    this.changePositionTimer = this.scene.time.addEvent({
      delay: 1200,
      callback: this.changePosition,
      callbackScope: this,
      loop: true
    });

    // init helpers and create graphic
    this.graphicsHelper = new GraphicsHelper(this.scene);
    this.graphicsHelper.create({
      graphic: this,
      width: 9,
      height: 4,
      zoom: this.zoom,
      physics: true,
      pixels: [
        [0, 0, 0xf54254, 1],
        [1, 1, 0xed2136, 1],
        [2, 1, 0xf54254, 1],
        [3, 2, 0xec44f2, 1],
        [4, 2, 0xec44f2, 1],
        [2, 3, 0xeae321, 1],
        [-1, 1, 0xf54254, 1],
        [-2, 1, 0xed2136, 1],
        [-3, 2, 0xec44f2, 1],
        [-4, 2, 0xec44f2, 1],
        [-2, 3, 0xeae321, 1]
      ]
    });

    this.scene.add.existing(this);
  }

  update(): void {
    this.scene.events.emit("miniMapEnemyPositionChanged", [this.x, this.y]);
  }

  private changePosition(): void {
    // update the current camera position
    let borderLeft = this.scene.cameras.main.scrollX + 50;
    let borderRight =
      this.scene.cameras.main.scrollX + this.scene.sys.canvas.width - 50;
    let borderTop = this.scene.cameras.main.scrollY + 50;
    let borderBottom =
      this.scene.cameras.main.scrollY + this.scene.sys.canvas.height - 50;

    // target a new position in the current camera viewport and tween
    this.scene.add.tween({
      targets: this,
      props: {
        x: Phaser.Math.Between(borderLeft, borderRight),
        y: Phaser.Math.Between(borderTop, borderBottom)
      },
      duration: 1200,
      ease: "Sine.easeInOut"
    });

    // update size of enemy
    if (this.zoom < 4) {
      this.zoom += 0.2;
    }

    // refresh graphic with the new size
    this.graphicsHelper.create({
      graphic: this,
      width: 9,
      height: 4,
      zoom: this.zoom,
      physics: true,
      pixels: [
        [0, 0, 0xf54254, 1],
        [1, 1, 0xed2136, 1],
        [2, 1, 0xf54254, 1],
        [3, 2, 0xec44f2, 1],
        [4, 2, 0xec44f2, 1],
        [2, 3, 0xeae321, 1],
        [-1, 1, 0xf54254, 1],
        [-2, 1, 0xed2136, 1],
        [-3, 2, 0xec44f2, 1],
        [-4, 2, 0xec44f2, 1],
        [-2, 3, 0xeae321, 1]
      ]
    });
  }

  public kill(): void {
    this.changePositionTimer.destroy();
    this.destroy();
  }
}
