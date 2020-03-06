/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Untextured Raycaster: Game Scene
 * @license      Digitsensitive
 */

import { Player } from "../objects/player";
import { WORLD_MAP } from "../const/map";

export class GameScene extends Phaser.Scene {
  // Map properties
  static mapWidth: number = 24;
  static mapHeight: number = 24;

  // Game objects
  private player: Player;

  // Graphics
  private lineGraphic: Phaser.GameObjects.Graphics;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    // Create our player
    this.player = new Player(this);

    // Graphics
    this.lineGraphic = this.add.graphics();
  }

  create(): void {}

  update(): void {
    // Update player
    this.player.update();

    // Clear graphics
    this.lineGraphic.clear();

    // Raycasting loop
    this.raycastingLoop();
  }

  /**
   * Raycasting Loop using the digital differential analyzer (DDA) algorithm.
   * Interpolation of variables over an interval between start and end point.
   * https://en.wikipedia.org/wiki/Digital_differential_analyzer_(graphics_algorithm)
   */
  private raycastingLoop(): void {
    // Loop through every vertical stripe of the screen
    for (let x = 0; x < this.sys.canvas.width; x++) {
      // x-coordinate on the camera plane that represents the x-position on screen
      // Right side of the screen = 1
      // Center of the screen = 0
      // Lft side of the screen = -1
      let cameraX = (2 * x) / this.sys.canvas.width - 1;

      // Calculate the direction of the ray
      let rayDirectionX =
        this.player.getDirection().x + this.player.getCameraPlane().x * cameraX;
      let rayDirectionY =
        this.player.getDirection().y + this.player.getCameraPlane().y * cameraX;

      /***********************************************************************
       * CALCULATE STEP X AND Y AND SIDE DISTANCE X AND Y
       * DEPENDING ON THE DIRECTION OF THE RAY.
       * If the x- and/or y-component is 0, it doesn't matter what value stepX
       * has since it'll then be unused.
       ***********************************************************************/
      // Current square of the map the ray is in
      let mapX: number = Math.round(this.player.getPosition().x);
      let mapY: number = Math.round(this.player.getPosition().y);

      // Length of ray from current position to next x or y-side
      let sideDistanceX: number;
      let sideDistanceY: number;

      // Length of ray from one x or y-side to next x or y-side
      let deltaDistanceX: number = Math.abs(1 / rayDirectionX);
      let deltaDistanceY: number = Math.abs(1 / rayDirectionY);

      // What direction to step in x or y-direction?
      let stepX;
      let stepY;

      if (rayDirectionX < 0) {
        stepX = -1;
        sideDistanceX = (this.player.getPosition().x - mapX) * deltaDistanceX;
      } else {
        stepX = 1;
        sideDistanceX =
          (mapX + 1.0 - this.player.getPosition().x) * deltaDistanceX;
      }

      if (rayDirectionY < 0) {
        stepY = -1;
        sideDistanceY = (this.player.getPosition().y - mapY) * deltaDistanceY;
      } else {
        stepY = 1;
        sideDistanceY =
          (mapY + 1.0 - this.player.getPosition().y) * deltaDistanceY;
      }

      /***********************************************************************
       * PERFORM ACTUAL DIGITAL DIFFERENTIAL ANALYZER (DDA) ALGORITHM.
       ***********************************************************************/
      // Was there a wall hit?
      let hit = 0;

      // Which side did we hit last?
      let side;

      while (hit === 0) {
        // Jump to the next map square
        if (sideDistanceX < sideDistanceY) {
          // Since the side distance x is smaller we travel one step on the x-axis
          sideDistanceX += deltaDistanceX;
          mapX += stepX;
          side = 0;
        } else {
          // Since the side distance y is smaller we travel one step on the y-axis
          sideDistanceY += deltaDistanceY;
          mapY += stepY;
          side = 1;
        }

        // Check if the ray has hit a wall
        // Remember: We track with the side variable if we have last hit an x- or y-side of a wall
        if (WORLD_MAP[mapX][mapY] > 0) {
          // We have hit a wall
          hit = 1;
        }
      }

      /***********************************************************************
       * CALCULATE DISTANCE OF RAY TO WALL.
       * Important to know how high the wall has to be drawn.
       * To avoid fisheye effect the perpendicular distance and not the
       * Euclidean distance is used.
       * https://en.wikipedia.org/wiki/Perpendicular_distance
       * https://en.wikipedia.org/wiki/Euclidean_distance
       ***********************************************************************/
      let perpendicularDistanceToWall;

      // (1 - stepX) / 2 is 1 if stepX = -1; (1 - stepX) / 2 is 0 if stepX = 1
      if (side === 0) {
        perpendicularDistanceToWall =
          (mapX - this.player.getPosition().x + (1 - stepX) / 2) /
          rayDirectionX;
      } else {
        perpendicularDistanceToWall =
          (mapY - this.player.getPosition().y + (1 - stepY) / 2) /
          rayDirectionY;
      }

      // Calculate height of line to draw on screen
      // It is the inverse of perpendicular distance multiplied by the height
      // Note: Multiply the height f.e. with 2 to get higher walls
      let lineHeight = Math.round(
        this.sys.canvas.height / perpendicularDistanceToWall
      );

      // Now calculate the real upper and lower position to draw the wall
      // The center of the wall should be at the center of the screen, that is
      // why we add the half of the game height.
      let halfOfHeight = lineHeight / 2;

      let upperPointOfLine = -halfOfHeight + this.sys.canvas.height / 2;
      let lowerPointOfLine = halfOfHeight + this.sys.canvas.height / 2;

      // If the upper point is outside the screen, fix it to 0
      if (upperPointOfLine < 0) {
        upperPointOfLine = 0;
      }

      // If the lower point is outside the screen, fix it to the game height - 1
      if (lowerPointOfLine >= this.sys.canvas.height) {
        lowerPointOfLine = this.sys.canvas.height - 1;
      }

      /***********************************************************************
       * CHOOSE WALL COLOR.
       ***********************************************************************/
      let wallColor: number;
      switch (WORLD_MAP[mapX][mapY]) {
        case 1:
          // Red
          wallColor = 0xff0000;
          break;
        case 2:
          // Green
          wallColor = 0x00ff00;
          break;
        case 3:
          // Blue
          wallColor = 0x0000ff;
          break;
        case 4:
          // White
          wallColor = 0xffffff;
          break;
        default:
          // Yellow
          wallColor = 0xffff00;
          break;
      }

      // If an y-side was hit, make the color darker for a nice effect
      if (side === 1) {
        wallColor = wallColor / 2;
      }

      // Draw the pixels of the stripe as a vertical line
      this.lineGraphic.lineStyle(1, wallColor);

      let line: Phaser.Geom.Line = new Phaser.Geom.Line(
        x,
        upperPointOfLine,
        x,
        lowerPointOfLine
      );

      this.lineGraphic.strokeLineShape(line);
    }
  }
}
