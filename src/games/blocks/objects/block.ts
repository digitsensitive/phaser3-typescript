/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Blocks: Block
 * @license      Digitsensitive
 */

export class Block extends Phaser.GameObjects.Sprite {
  private isActivated: boolean;

  public blockType: number = 0;
  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.blockType = params.value;
    this.initVariables();
    this.initSprite();
    this.initInput();

    this.scene.add.existing(this);
  }
  private initVariables() {
    this.isActivated = false;
  }

  private initSprite() {
    // sprite
    this.setFrame(this.blockType);
    this.setOrigin(0, 0);
  }

  private initInput() {
    if (this.blockType !== 1) {
      this.setInteractive();
    }
  }

  update(): void {
    if (this.isActivated) {
      this.setTint(0xff0000);
    } else {
      this.clearTint();
    }
  }
}
