/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Coin Runner: Game Scene
 * @license      Digitsensitive
 */

import { Coin } from "../objects/coin";
import { Player } from "../objects/player";

export class GameScene extends Phaser.Scene {
  private background: Phaser.GameObjects.Image;
  private coin: Coin;
  private player: Player;

  private collectedCoins: number = 0;
  private coinsCollectedText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  preload(): void {
    this.load.image("background", "./assets/games/coinRunner/background.png");
    this.load.image("player", "./assets/games/coinRunner/player.png");
    this.load.image("coin", "./assets/games/coinRunner/coin.png");
  }

  create(): void {
    // create background
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    // create objects
    this.coin = new Coin({
      scene: this,
      x: Phaser.Math.RND.integerInRange(100, 700),
      y: Phaser.Math.RND.integerInRange(100, 500),
      key: "coin"
    });
    this.player = new Player({ scene: this, x: 150, y: 300, key: "player" });

    // create texts
    this.coinsCollectedText = this.add.text(
      this.sys.canvas.width / 2,
      this.sys.canvas.height - 50,
      this.collectedCoins + "",
      {
        fontFamily: "Connection",
        fontSize: 38,
        stroke: "#fff",
        strokeThickness: 6,
        fill: "#000000"
      }
    );
  }

  update(): void {
    // update player and coin
    this.player.update();
    this.coin.update();

    // do the collision check
    if (
      Phaser.Geom.Intersects.RectangleToRectangle(
        this.player.getBounds(),
        this.coin.getBounds()
      )
    ) {
      this.updateCoinStatus();
    }
  }

  private updateCoinStatus(): void {
    this.collectedCoins++;
    this.coinsCollectedText.setText(this.collectedCoins + "");
    this.coin.changePosition();
  }

  private gameover(): void {
    this.scene.start("GameScene");
  }
}
