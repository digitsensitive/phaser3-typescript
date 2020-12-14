/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Star Voyager: Star Portal
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class StarPortal extends Phaser.GameObjects.Graphics {
  // variables
  private color: number;
  private height: number;
  private width: number;
  private zoom: number;
  private colorSet: number[] = [
    0xffffff,
    0xe6e337,
    0x5ae637,
    0x31bacc,
    0xd91671
  ];

  // timer
  private enlargePortalTimer: Phaser.Time.TimerEvent;
  private changePortalColorTimer: Phaser.Time.TimerEvent;

  constructor(params) {
    super(params.scene, params);

    // init graphics
    this.x = params.x;
    this.y = params.y;

    // init variables
    this.color = this.getRandomPortalColor();
    this.height = params.height;
    this.width = params.width;
    this.zoom = 1;

    this.lineStyle(1, 0xffffff, 1);
    this.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);

    // timer
    this.enlargePortalTimer = this.scene.time.addEvent({
      delay: 4000,
      callback: this.enlargePortal,
      callbackScope: this,
      loop: true
    });

    this.changePortalColorTimer = this.scene.time.addEvent({
      delay: 100,
      callback: this.changePortalColor,
      callbackScope: this,
      loop: true
    });

    // physics
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setSize(this.width, this.height);
    this.body.setOffset(-this.width / 2, -this.height / 2);
    this.scene.add.existing(this);
  }

  update(): void {}

  private enlargePortal(): void {
    this.zoom += 2;
    this.scaleX = this.scaleY = this.zoom;
  }

  private changePortalColor(): void {
    this.clear();
    this.lineStyle(1, this.getRandomPortalColor(), 1);
    this.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
  }

  private getRandomPortalColor(): number {
    return this.colorSet[Math.floor(Math.random() * this.colorSet.length)];
  }
}
