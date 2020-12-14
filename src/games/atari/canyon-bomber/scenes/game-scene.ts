/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Canyon Bomber: Game Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Player } from "../objects/player";
import { Rock } from "../objects/rock";

export class GameScene extends Phaser.Scene {
  // variables
  private widthOfBubbles: number;
  private heightOfBubbles: number;
  private shootVelocity: Phaser.Math.Vector2;

  // game objects
  private backgroundImage: Phaser.GameObjects.Image;
  private rocks: Rock[];
  private player: Player;
  private playerTwo: Player;
  private shoot: Phaser.GameObjects.Graphics;
  private fullscreenButton: Phaser.GameObjects.Sprite;

  // else
  private timer: Phaser.Time.TimerEvent;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    // init bubble field
    this.widthOfBubbles = 20;
    this.heightOfBubbles = 10;
  }

  create(): void {
    this.backgroundImage = this.add.image(0, 0, "background");
    this.backgroundImage.setScale(1);
    this.backgroundImage.setOrigin(0, 0);

    this.rocks = [];
    this.player = new Player({
      scene: this,
      options: {
        color: 0x000000,
        movingRight: true,
        xPos: 7,
        yPos: 30,
        width: 40,
        height: 20,
        key: "A"
      }
    });

    this.playerTwo = new Player({
      scene: this,
      options: {
        color: 0xffffff,
        movingRight: false,
        xPos: 273,
        yPos: 50,
        width: 40,
        height: 20,
        key: "L"
      }
    });

    // create bubble field
    for (let y = 0; y < this.heightOfBubbles; y++) {
      for (let x = 0; x < this.widthOfBubbles; x++) {
        let newRock = new Rock({
          scene: this,
          xPos: 35 + x * 13,
          yPos: 230 + y * 13,
          score: Phaser.Math.RND.between(0, y)
        });

        this.rocks.push(newRock);
      }
    }

    this.timer = this.time.addEvent({
      delay: 500,
      callback: this.updateRows,
      callbackScope: this,
      loop: true
    });

    // button for fullscreen
    this.fullscreenButton = this.add
      .sprite(
        this.sys.canvas.width - 5,
        this.sys.canvas.height - 25,
        "fullscreen",
        0
      )
      .setScale(2)
      .setOrigin(1, 0)
      .setInteractive();

    this.fullscreenButton.on(
      "pointerup",
      function() {
        if (this.scale.isFullscreen) {
          this.fullscreenButton.setFrame(0);
          this.scale.stopFullscreen();
        } else {
          this.fullscreenButton.setFrame(1);
          this.scale.startFullscreen();
        }
      },
      this
    );
  }

  update(): void {
    this.player.update();
    this.playerTwo.update();

    // check for end game
    this.checkIfGameOver();

    for (let i = this.rocks.length - 1; i >= 0; i--) {
      this.rocks[i].update();

      if (this.player.getShoot().visible && this.rocks[i].visible) {
        if (
          Phaser.Geom.Intersects.RectangleToRectangle(
            this.rocks[i].body,
            this.player.getShoot().body
          )
        ) {
          // update score
          this.registry.values.blackScore += this.rocks[i].getScore();
          this.events.emit("blackScoreChanged");

          // the bubble is gone
          this.rocks[i].makeInvisible();
          this.player.getShoot().addAHit();
        }
      }

      if (this.playerTwo.getShoot().visible && this.rocks[i].visible) {
        if (
          Phaser.Geom.Intersects.RectangleToRectangle(
            this.rocks[i].body,
            this.playerTwo.getShoot().body
          )
        ) {
          // update score
          this.registry.values.whiteScore += this.rocks[i].getScore();
          this.events.emit("whiteScoreChanged");

          // the bubble is gone
          this.rocks[i].makeInvisible();
          this.playerTwo.getShoot().addAHit();
        }
      }
    }
  }

  private checkIfGameOver(): void {
    if (this.registry.values.blackMisses === 0) {
      console.log("White Wins!");
    } else if (this.registry.values.whiteMisses === 0) {
      console.log("Black Wins!");
    }
  }
  private updateRows(): void {
    for (let i = this.rocks.length - 1; i >= 0; i--) {
      if (!this.rocks[i].visible) {
        if (this.rocks[i - this.widthOfBubbles])
          if (this.rocks[i - this.widthOfBubbles].visible) {
            let top = this.rocks[i - this.widthOfBubbles];
            let bottom = this.rocks[i];

            // swap in array
            this.rocks[i - this.widthOfBubbles] = bottom;
            this.rocks[i] = top;

            // make the move
            this.rocks[i - this.widthOfBubbles].tweenUp();
            this.rocks[i].tweenDown();
          }
      }
    }
  }
}
