/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Procedural Generation: Game Scene
 * @license      Digitsensitive
 */

import { GALAXY } from "../const/galaxy";
import { StarSystem } from "../objects/star-system";

export class GameScene extends Phaser.Scene {
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private controls: Phaser.Cameras.Controls.SmoothedKeyControl;
  private numberSectorsX: number;
  private numberSectorsY: number;
  private starSystems: StarSystem[][];

  constructor() {
    super({
      key: "GameScene",
    });
  }

  init(): void {
    // *****************************************************************
    // VARIABLES
    // *****************************************************************
    this.starSystems = [];
    this.numberSectorsX = GALAXY.width / GALAXY.sectorSize;
    this.numberSectorsY = GALAXY.height / GALAXY.sectorSize;

    // *****************************************************************
    // INPUT
    // *****************************************************************
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.input.on("gameobjectover", (pointer, gameObject, event) => {
      gameObject.setStrokeStyle(1, 0xffffff);
    });
    this.input.on("gameobjectout", (pointer, gameObject, event) => {
      gameObject.setStrokeStyle(0, 0xffffff);
    });

    // *****************************************************************
    // CAMERA
    // *****************************************************************
    let controlConfig = {
      camera: this.cameras.main,
      left: this.cursorKeys.left,
      right: this.cursorKeys.right,
      up: this.cursorKeys.up,
      down: this.cursorKeys.down,
      acceleration: 0.02,
      drag: 0.0005,
      maxSpeed: 0.15,
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
      controlConfig
    );
    this.cameras.main.setBounds(0, 0, GALAXY.width, GALAXY.height);
    this.cameras.main.setZoom(3);
  }

  create(): void {
    // Create star systems
    for (let y = 0; y < this.numberSectorsY; y++) {
      this.starSystems[y] = [];
      for (let x = 0; x < this.numberSectorsX; x++) {
        this.starSystems[y][x] = new StarSystem({
          scene: this,
          x: x * GALAXY.sectorSize + 8,
          y: y * GALAXY.sectorSize + 8,
        });
      }
    }
  }

  update(time, delta): void {
    // Update camera
    this.controls.update(delta);
  }
}
