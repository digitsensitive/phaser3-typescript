import { Healthpack } from "../objects/healthpack";

import { Stone } from "../objects/stone";
import { IStone } from "../interfaces/stone.interface";

import { Bomb } from "../objects/bomb";

export class GameScene extends Phaser.Scene {
  // variables
  private stoneRespawnTimer: Phaser.Time.TimerEvent;

  // backgrounds
  private cityBackground: Phaser.GameObjects.Image;
  private sunInTheBackground: Phaser.GameObjects.Image;

  // game objects
  private healthpack: Healthpack;
  private stones: Phaser.GameObjects.Group;
  private bomb: Bomb;

  constructor() {
    super({
      key: "GameScene",
    });
  }

  init(): void {}

  create(): void {
    // *****************************************************************
    // VARIABLES
    // *****************************************************************
    this.stoneRespawnTimer = this.time.addEvent({
      delay: Phaser.Math.RND.between(500, 1500),
      callback: this.spawnNewStone,
      callbackScope: this,
      loop: true,
    });

    // *****************************************************************
    // SUN BACKGROUND
    // *****************************************************************
    this.sunInTheBackground = this.add
      .image(0, 0, "sunBackground")
      .setOrigin(0, 0);

    // *****************************************************************
    // GAME OBJECTS
    // *****************************************************************
    this.healthpack = new Healthpack({
      scene: this,
      x: 40,
      y: 40,
      key: "healthpack",
    });

    this.stones = this.add.group({
      runChildUpdate: true,
    });

    this.bomb = new Bomb(this);

    // *****************************************************************
    // CITY BACKGROUND
    // *****************************************************************
    this.cityBackground = this.add
      .image(0, 0, "cityBackground")
      .setOrigin(0, 0);

    // *****************************************************************
    // INPUT
    // *****************************************************************
    this.input.on(
      "pointerdown",
      function (pointer) {
        if (!this.bomb.isActive()) {
          // create a bomb
          this.bomb.createActivationCircle(pointer.x, pointer.y, 2);
        } else {
          // explode the bomb
          this.bomb.explode();
        }
      },
      this
    );

    // *****************************************************************
    // CAMERA
    // *****************************************************************
    this.cameras.main.setBounds(
      0,
      0,
      this.sys.canvas.width,
      this.sys.canvas.height
    );
  }

  update(): void {
    this.healthpack.update();
    this.bomb.update();

    this.stones.children.each((stone: Stone) => {
      if (
        Phaser.Geom.Intersects.CircleToRectangle(
          this.bomb.activationCircle,
          stone.getBounds()
        ) &&
        this.bomb.isExploding &&
        !stone.wasHit
      ) {
        stone.wasHit = true;
        stone.addScore();
      }
    }, this);
  }

  private spawnNewStone(): void {
    this.stones.add(
      new Stone({
        scene: this,
        x: Phaser.Math.RND.between(15, 190),
        y: -10,
        key: "stone",
      })
    );
  }
}
