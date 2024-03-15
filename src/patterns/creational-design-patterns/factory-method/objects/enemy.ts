/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Factory Method: Enemy
 * @license      Digitsensitive
 */

export class Enemy extends Phaser.GameObjects.Image {
  protected dexterity: number;
  protected intelligence: number;
  protected strength: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);
    this.initImage();
    this.scene.add.existing(this);
  }

  private initImage(): void {
    this.setScale(2);
    this.setOrigin(0.5, 0.5);
  }

  public getDexterity(): number {
    return this.dexterity;
  }

  public getIntelligence(): number {
    return this.intelligence;
  }

  public getStrength(): number {
    return this.strength;
  }
}
