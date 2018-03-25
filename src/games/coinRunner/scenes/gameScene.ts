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
  private player: Player;
  private coin: Coin;
  private coinsCollectedText: Phaser.GameObjects.Text;
  private collectedCoins: number = 0;

  preload(): void {
    this.load.image("background", "../assets/games/coinRunner/background.png");
    this.load.image("player", "../assets/games/coinRunner/player.png");
    this.load.image("coin", "../assets/games/coinRunner/coin.png");
  }

  create(): void {
    // create background
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    // create objects
    this.player = new Player({ scene: this, x: 150, y: 300, key: "player" });

    this.coin = new Coin({
      scene: this,
      x: Phaser.Math.RND.integerInRange(100, 700),
      y: Phaser.Math.RND.integerInRange(100, 500),
      key: "coin"
    });

    // create texts
    this.coinsCollectedText = this.add.text(
      this.sys.canvas.width / 2,
      this.sys.canvas.height - 50,
      this.collectedCoins + "",
      {
        fontFamily: "arial",
        fontSize: 30,
        stroke: "#fff",
        strokeThickness: 4,
        fill: "#000000"
      }
    );
  }

  update(): void {
    this.player.update();
    this.coin.update();

    if (
      Phaser.Geom.Intersects.RectangleToRectangle(
        this.player.getBounds(),
        this.coin.getBounds()
      ) &&
      this.coin.active
    ) {
      this.collectedCoins++;
      this.updateCoinsText();
      this.coin.changePosition();
    }
  }

  private updateCoinsText(): void {
    this.coinsCollectedText.setText(this.collectedCoins + "");
  }

  private gameover(): void {
    this.scene.start("GameScene");
  }
}
