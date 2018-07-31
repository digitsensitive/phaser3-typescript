/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  The Powerful: Coin
 * @license      Digitsensitive
 */

export class Coin extends Phaser.GameObjects.Sprite {
  private currentScene: Phaser.Scene;
  private numberCoin: number;

  constructor(params) {
    super(params.scene, params.x, params.y, "atlas", "coin");

    this.initVariables({ scene: params.scene, number: params.number });
    this.initImage();
    this.initPhysics();

    params.scene.add.existing(this);
  }

  /**
   * VARIABLE customizations
   */
  private initVariables(params): void {
    this.currentScene = params.scene;
    this.numberCoin = params.number;
  }

  /**
   * SPRITE customizations
   */
  private initImage(): void {
    this.setScale(1);
    this.setSize(8, 8);
    this.setAlpha(1);
    this.setFlip(false, false);
    this.setOrigin(0.5, 0.5);
    this.setAngle(0);
  }

  /**
   * PHYSICS customizations
   */
  private initPhysics(): void {
    this.currentScene.physics.world.enable(this);
    this.body.setOffset(4, 3);
  }

  /**
   * When this object has been picked up:
   * 1. Check how many coins the player already has collected
   * 2. Update the new coin number
   * 3. Register this object as collected with game so it is not added to future intances of this level
   * 3. Push an event that everyone knows that the coin number has changed
   * 4. Remove this coin from the scene
   */
  public pickup(): void {
    let currentTotalCoins = this.scene.registry.get("coins");
    this.scene.registry.set("coins", currentTotalCoins + 1);

    this.scene.registry.set(
      `${this.scene.registry.get("load")}_Coins_${this.numberCoin}`,
      "picked"
    );
    this.scene.events.emit("coinStatusChanged");
    this.destroy();
  }
}
