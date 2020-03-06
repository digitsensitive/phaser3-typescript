/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Untextured Raycaster: Player
 * @license      Digitsensitive
 */

import { WORLD_MAP } from "../const/map";

export class Player {
  // Scene
  private currentScene: Phaser.Scene;

  // Vectors
  private position: Phaser.Math.Vector2;
  private direction: Phaser.Math.Vector2;
  private cameraPlane: Phaser.Math.Vector2;

  // Input
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  // Variables
  private moveSpeed: number;
  private rotationSpeed: number;
  private currentRotationSpeed: number;

  constructor(scene: Phaser.Scene) {
    this.currentScene = scene;
    this.position = new Phaser.Math.Vector2(22, 12);

    // Init the direction vector as a normalized vector
    this.direction = new Phaser.Math.Vector2(-1, 0);

    // Init the camera plane vector with a Field of Vision (FOV) of
    // 2 * atan(0.66/1.0) = 66°
    this.cameraPlane = new Phaser.Math.Vector2(0, 0.66);

    this.moveSpeed = 0.05;
    this.rotationSpeed = 0.02;
    this.currentRotationSpeed = this.rotationSpeed;
    this.cursors = this.currentScene.input.keyboard.createCursorKeys();
  }

  public getPosition(): Phaser.Math.Vector2 {
    return this.position;
  }

  public getDirection(): Phaser.Math.Vector2 {
    return this.direction;
  }

  public getCameraPlane(): Phaser.Math.Vector2 {
    return this.cameraPlane;
  }

  public update(): void {
    this.handleInput();
  }

  private handleInput(): void {
    // The player moves forward
    if (this.cursors.up.isDown) {
      if (
        !this.isInsideWall(
          this.position.x + this.direction.x * this.moveSpeed,
          this.position.y
        )
      ) {
        this.position.x += this.direction.x * this.moveSpeed;
      }

      if (
        !this.isInsideWall(
          this.position.x,
          this.position.y + this.direction.y * this.moveSpeed
        )
      ) {
        this.position.y += this.direction.y * this.moveSpeed;
      }
    }

    // The player moves backwards
    if (this.cursors.down.isDown) {
      if (
        !this.isInsideWall(
          this.position.x - this.direction.x * this.moveSpeed,
          this.position.y
        )
      ) {
        this.position.x -= this.direction.x * this.moveSpeed;
      }

      if (
        !this.isInsideWall(
          this.position.x,
          this.position.y - this.direction.y * this.moveSpeed
        )
      ) {
        this.position.y -= this.direction.y * this.moveSpeed;
      }
    }

    // Rotate to the right
    if (this.cursors.right.isDown) {
      this.currentRotationSpeed = -this.rotationSpeed;
      this.rotateAround();
    }

    // Rotate to the left
    if (this.cursors.left.isDown) {
      this.currentRotationSpeed = this.rotationSpeed;
      this.rotateAround();
    }
  }

  /**
   * Check if the new position is inside a wall.
   * If inside a wall (is not a 0 on the map) --> return true
   * @param x
   * @param y
   */
  private isInsideWall(x: number, y: number): boolean {
    return WORLD_MAP[Math.floor(x)][Math.floor(y)] !== 0;
  }

  /**
   * Rotate direction and camera plane vectors
   */
  private rotateAround(): void {
    this.direction = this.multiplyWithRotationMatrix(this.direction);
    this.cameraPlane = this.multiplyWithRotationMatrix(this.cameraPlane);
  }

  /**
   * Multiply a vector with the rotation matrix
   * It is a matrix that is used to perform a rotation in Euclidean space.
   * https://en.wikipedia.org/wiki/Rotation_matrix
   * @param vector
   */
  private multiplyWithRotationMatrix(
    vector: Phaser.Math.Vector2
  ): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(
      vector.x * Math.cos(this.currentRotationSpeed) -
        vector.y * Math.sin(this.currentRotationSpeed),
      vector.x * Math.sin(this.currentRotationSpeed) +
        vector.y * Math.cos(this.currentRotationSpeed)
    );
  }
}
