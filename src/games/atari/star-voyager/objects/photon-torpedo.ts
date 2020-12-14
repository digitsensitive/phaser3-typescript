/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Star Voyager: Photon Torpedo
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class PhotonTorpedo extends Phaser.GameObjects.Graphics {
  private size: number;
  private currentSize: number;

  constructor(params) {
    super(params.scene, params);

    // init variables
    this.size = 10;
    this.currentSize = this.size;

    // physics
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.scene.add.existing(this);
  }

  update(): void {
    if (this.currentSize > 0) {
      this.currentSize -= 0.4;
    }

    this.clear();
    this.fillStyle(0xffffff, 1);
    this.fillCircle(0, 0, this.currentSize);
    this.body.setSize(this.currentSize, this.currentSize);
    this.body.setOffset(-this.currentSize / 2, -this.currentSize / 2);
  }

  public activate(shootOrigin: string): void {
    this.setAlpha(1);
    this.currentSize = this.size;
    if (shootOrigin === "LEFT") {
      this.x = this.scene.cameras.main.scrollX;
      this.y =
        this.scene.cameras.main.scrollY + this.scene.sys.canvas.height - 100;
      this.scene.tweens.add({
        targets: this,
        props: { x: this.x + 280, y: this.y - 90, alpha: 0.1 },
        duration: 500,
        ease: "Power0",
        onStart: () => {
          this.setActive(true);
        },
        onComplete: () => {
          this.setActive(false);
          this.body.setSize(0, 0);
        }
      });
    } else {
      this.x = this.scene.cameras.main.scrollX + this.scene.sys.canvas.width;
      this.y =
        this.scene.cameras.main.scrollY + this.scene.sys.canvas.height - 100;
      this.scene.tweens.add({
        targets: this,
        props: { x: this.x - 280, y: this.y - 90, alpha: 0.1 },
        duration: 500,
        ease: "Power0",
        onStart: () => {
          this.setActive(true);
        },
        onComplete: () => {
          this.setActive(false);
          this.body.setSize(0, 0);
        }
      });
    }
  }
}
