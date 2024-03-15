import { BlockConstructor } from '../interfaces/block.interface';

export class Block extends Phaser.GameObjects.Sprite {
  private blockType: number;
  private isDying: boolean;

  constructor(params: BlockConstructor) {
    super(params.scene, params.x, params.y, params.texture, params.type);

    this.blockType = params.type;
    this.isDying = false;

    this.initSprite();
    this.scene.add.existing(this);
  }

  update(): void {
    if (this.isDying) {
      this.alpha -= 0.02;

      if (this.alpha === 0) {
        this.isDying = false;
        this.setType(0);
        this.setAlpha(1);
      }
    }
  }

  private initSprite() {
    this.setFrame(this.blockType);
    this.setOrigin(0, 0);
  }

  public getType(): number {
    return this.blockType;
  }

  public setType(id: number): void {
    this.blockType = id;
    this.setFrame(this.blockType);
  }

  public activateDead(): void {
    this.isDying = true;
  }

  public getDead(): boolean {
    return this.isDying;
  }
}
