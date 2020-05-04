/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 Digitsensitive
 * @description  Blocks: Block
 * @license      Digitsensitive
 */

import { CONST } from "../const/const";

export class Block extends Phaser.GameObjects.Sprite {
  private currentPosition: [number, number];
  private blockType: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.blockType = params.type;
    this.initSprite();

    this.scene.add.existing(this);
  }

  private initSprite() {
    this.setFrame(this.blockType);
    this.setOrigin(0, 0);
  }

  public moveTo(x: number, y: number) {
    this.currentPosition = [x, y];
    this.setPosition(x * CONST.tileSize, y * CONST.tileSize);
  }

  public getType(): number {
    return this.blockType;
  }
}
