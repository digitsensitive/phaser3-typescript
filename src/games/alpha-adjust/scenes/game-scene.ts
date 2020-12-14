/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2020 digitsensitive
 * @description  Alpha Adjust: Game Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
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
    this.load.image("crystal", "../assets/crystal.png");
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

    // init input
    this.input.on(
      "pointerdown",
      () => {
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
        fontFamily: "Arial",
        fontSize: 100,
        stroke: "#000000",
        strokeThickness: 8,
        fill: "#ffffff"
      }
    );

    let textConfig = {
      fontFamily: "Arial",
      fontSize: 50,
      stroke: "#000000",
      strokeThickness: 8,
      fill: "#ffffff"
    };

    let selectedText;
    if (difference >= 0.5) {
      selectedText = "You can do better!";
    } else if (difference < 0.5 && difference >= 0.3) {
      selectedText = "OK!";
    } else if (difference < 0.3 && difference >= 0.1) {
      selectedText = "Great!";
    } else if (difference < 0.1) {
      selectedText = "Wonderful!";
    }

    this.feedbackText = this.add.text(
      this.sys.canvas.width / 2 - selectedText.length * 12,
      this.sys.canvas.height / 2 - 150,
      selectedText,
      textConfig
    );
  }
}
