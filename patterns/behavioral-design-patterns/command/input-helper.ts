/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Design patterns: Behavioral design pattern - Command
 *               Input Helper
 * @license      Digitsensitive
 */

import { Command } from "./command.interface";

export class InputHelper {
  // Refrence to the current game scene
  private currentScene: Phaser.Scene;

  // Commands
  private pauseScene: Command;
  private pointerMoved: Command;
  private shooting: Command;

  constructor(scene: Phaser.Scene) {
    this.currentScene = scene;
  }

  /**
   * Set the pause scene command
   * @param command
   */
  public setPauseSceneCommand(command: Command): void {
    this.pauseScene = command;
  }

  /**
   * Set the pointer moved command
   * @param command
   */
  public setPointerMovedCommand(command: Command): void {
    this.pointerMoved = command;
  }

  /**
   * Set the shooting command
   * @param command
   */
  public setShootingCommand(command: Command): void {
    this.shooting = command;
  }

  /**
   * Main function of the input helper
   * Returns commands if corresponding key is pressed
   * It can't execute the commands immediately, because it doesn't know what
   * receiver (= actor) to pass in
   */
  public handleInput(): Command {
    if (
      Phaser.Input.Keyboard.JustDown(
        this.currentScene.input.keyboard.addKey("P")
      )
    ) {
      return this.pauseScene;
    } else if (
      this.currentScene.input.activePointer.prevPosition.x !==
        this.currentScene.input.activePointer.position.x ||
      this.currentScene.input.activePointer.prevPosition.y !==
        this.currentScene.input.activePointer.position.y
    ) {
      return this.pointerMoved;
    } else if (
      Phaser.Input.Keyboard.JustDown(
        this.currentScene.input.keyboard.addKey("SPACE")
      )
    ) {
      return this.shooting;
    }

    return null;
  }
}
