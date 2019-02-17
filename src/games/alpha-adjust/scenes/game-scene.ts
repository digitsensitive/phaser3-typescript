/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Alpha Adjust: Game Scene
 * @license      Digitsensitive
 */

import { CloneCrystal } from "../objects/clone-crystal";
import { OriginalCrystal } from "../objects/original-crystal";

export class GameScene extends Phaser.Scene {
  private cloneCrystal: CloneCrystal;
  private originalCrystal: OriginalCrystal;
  private playerHasClicked: boolean;
  private alphaDifferenceText: Phaser.GameObjects.Text;
  private feedbackText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  preload(): void {
    this.load.image("crystal", "./src/games/alpha-adjust/assets/crystal.png");
  }

  init(): void {
    this.playerHasClicked = false;
    this.alphaDifferenceText = null;
    this.feedbackText = null;
  }

  create(): void {
    // create game objects
    this.cloneCrystal = new CloneCrystal({
      scene: this,
      x: this.sys.canvas.width / 2 - 150,
      y: this.sys.canvas.height / 2,
      key: "crystal"
    });

    this.originalCrystal = new OriginalCrystal({
      scene: this,
      x: this.sys.canvas.width / 2 + 150,
      y: this.sys.canvas.height / 2,
      key: "crystal",
      alpha: Phaser.Math.RND.realInRange(0, 1)
    });

    this.input.on(
      "pointerdown",
      function() {
        if (!this.playerHasClicked) {
          this.playerHasClicked = true;
        } else {
          this.scene.start("GameScene");
        }
      },
      this
    );
  }

  update(): void {
    if (!this.playerHasClicked) {
      this.cloneCrystal.update();
    } else {
      let difference = this.calculateAlphaDifference();
      this.createResultTexts(difference);
    }
  }

  private calculateAlphaDifference(): number {
    return Math.abs(this.cloneCrystal.alpha - this.originalCrystal.alpha);
  }

  private createResultTexts(difference: number): void {
    this.alphaDifferenceText = this.add.text(
      this.sys.canvas.width / 2 - 100,
      this.sys.canvas.height / 2 + 100,
      difference.toFixed(2) + "",
      {
        fontFamily: "Connection",
        fontSize: 100,
        stroke: "#000000",
        strokeThickness: 8,
        fill: "#ffffff"
      }
    );

    let textConfig = {
      fontFamily: "Connection",
      fontSize: 50,
      stroke: "#000000",
      strokeThickness: 8,
      fill: "#ffffff"
    };

    if (difference >= 0.5) {
      this.feedbackText = this.add.text(
        this.sys.canvas.width / 2 - 250,
        this.sys.canvas.height / 2 - 150,
        "You can do better!",
        textConfig
      );
    } else if (difference < 0.5 && difference >= 0.3) {
      this.feedbackText = this.add.text(
        this.sys.canvas.width / 2 - 40,
        this.sys.canvas.height / 2 - 150,
        "OK!",
        textConfig
      );
    } else if (difference < 0.3 && difference >= 0.1) {
      this.feedbackText = this.add.text(
        this.sys.canvas.width / 2 - 90,
        this.sys.canvas.height / 2 - 150,
        "Great!",
        textConfig
      );
    } else if (difference < 0.1) {
      this.feedbackText = this.add.text(
        this.sys.canvas.width / 2 - 145,
        this.sys.canvas.height / 2 - 150,
        "Wonderful!",
        textConfig
      );
    }
  }
}
