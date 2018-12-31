/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  The Balloons: Player Container
 * @license      Digitsensitive
 */

import { PlayerBalloon } from "./player-balloon";
import { PlayerMain } from "./player-main";

export class PlayerContainer extends Phaser.GameObjects.Container {
  private currentScene: Phaser.Scene;
  private cursors: Phaser.Input.Keyboard.CursorKeys;
  private flyKey: Phaser.Input.Keyboard.Key;
  private playerBalloon: PlayerBalloon;
  private playerMain: PlayerMain;

  constructor(params) {
    super(params.scene, params.x, params.y);

    this.initVariables(params);
    this.initChildren();
    this.initInput();
    this.initPhysics();

    this.currentScene.add.existing(this);
  }

  private initVariables(params): void {
    this.currentScene = params.scene;
  }

  private initChildren(): void {
    this.playerMain = new PlayerMain({
      scene: this.currentScene,
      x: 0,
      y: 10,
      key: "playerMain"
    });

    this.playerBalloon = new PlayerBalloon({
      scene: this.currentScene,
      x: 0,
      y: 0,
      key: "playerBalloon"
    });

    this.add(this.playerBalloon);
    this.add(this.playerMain);
  }

  private initInput(): void {
    this.cursors = this.currentScene.input.keyboard.createCursorKeys();
    this.flyKey = this.currentScene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  private initPhysics(): void {
    this.currentScene.physics.world.enable(this);
    this.body.setSize(12, 25);
  }

  update(): void {
    this.handleInput();
    this.checkIfOffScreenHorizontally();
    this.playerMain.update();
    this.playerBalloon.update();
  }

  private handleInput(): void {
    // check if flying key is pressed
    if (this.flyKey.isDown) {
      this.body.setVelocityY(-60);
    }

    // check direction keys
    if (this.cursors.right.isDown) {
      this.body.setVelocityX(60);
      this.playerMain.flipX = true;
      this.playerBalloon.flipX = true;
    } else if (this.cursors.left.isDown) {
      this.body.setVelocityX(-60);
      this.playerMain.flipX = false;
      this.playerBalloon.flipX = false;
    } else {
      this.body.setVelocityX(0);
    }
  }

  private checkIfOffScreenHorizontally(): void {
    if (this.x > this.currentScene.sys.canvas.width + this.width / 2) {
      this.x = -this.width / 2;
    } else if (this.x < -this.width / 2) {
      this.x = this.currentScene.sys.canvas.width + this.width / 2;
    }
  }
}
