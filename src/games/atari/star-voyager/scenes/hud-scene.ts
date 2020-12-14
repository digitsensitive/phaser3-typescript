/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Star Voyager: Hud Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class HUDScene extends Phaser.Scene {
  private cockpit: Phaser.GameObjects.Graphics;
  private cockpitLines: Phaser.GameObjects.Graphics[];
  private miniMap: Phaser.GameObjects.Graphics[];
  private miniMapEnemy: Phaser.GameObjects.Graphics;
  private miniMapPlayer: Phaser.GameObjects.Graphics;
  private sights: Phaser.GameObjects.Graphics[];

  private textElements: Map<string, Phaser.GameObjects.BitmapText>;
  private timer: Phaser.Time.TimerEvent;

  constructor() {
    super({
      key: "HUDScene"
    });
  }

  create(): void {
    // create cockpit
    this.cockpit = this.add
      .graphics({
        x: 0,
        y: 0,
        lineStyle: { width: 60, color: 0xc8c8c8, alpha: 1 }
      })
      .strokeRect(0, 0, 384, 320);

    // create cockpit lines
    this.cockpitLines = [];
    for (let l = 0; l < 43; l++) {
      let newLine = this.add
        .graphics({
          x: 0,
          y: 0,
          fillStyle: { color: 0x000000, alpha: 1 }
        })
        .fillRect(5, 31 + l * 6, 20, 5);
      this.cockpitLines.push(newLine);
    }

    // create minimap
    this.miniMap = [];
    this.miniMap.push(
      this.add
        .graphics({
          x: 0,
          y: 0,
          fillStyle: { color: 0xf5ec42, alpha: 1 },
          lineStyle: { width: 5, color: 0xc8c8c8, alpha: 1 }
        })
        .fillRect(
          this.sys.canvas.width / 2 - 30,
          this.sys.canvas.height - 50,
          60,
          40
        )
        .strokeRect(
          this.sys.canvas.width / 2 - 30,
          this.sys.canvas.height - 50,
          60,
          40
        )
    );

    // create sights (two lines)
    this.sights = [];
    let sight1;
    sight1 = this.add
      .graphics({
        x: this.sys.canvas.width / 2 - 20,
        y: this.sys.canvas.height / 2,
        lineStyle: { width: 2, color: 0x5a8de0, alpha: 1 }
      })
      .lineBetween(0, 0, 10, 0);
    this.sights.push(sight1);

    let sight2;
    sight2 = this.add
      .graphics({
        x: this.sys.canvas.width / 2 + 10,
        y: this.sys.canvas.height / 2,
        lineStyle: { width: 2, color: 0x5a8de0, alpha: 1 }
      })
      .lineBetween(0, 0, 10, 0);
    this.sights.push(sight2);

    // create text elements
    this.textElements = new Map([
      [
        "ENEMY HITS",
        this.addText(
          80,
          this.sys.canvas.height - 25,
          `${this.registry.get("enemyHits")}`
        )
      ],
      [
        "ENERGY LEVEL",
        this.addText(
          250,
          this.sys.canvas.height - 25,
          `${this.registry.get("energyLevel")}`
        )
      ]
    ]);

    // mini map enemy
    this.miniMapEnemy = this.add
      .graphics({
        x: 0,
        y: 0,
        fillStyle: { color: 0xf54254, alpha: 1 }
      })
      .fillRect(0, 0, 3, 3);

    // mini map player
    this.miniMapPlayer = this.add
      .graphics({
        x: 0,
        y: 0,
        fillStyle: { color: 0x000000, alpha: 1 }
      })
      .fillRect(0, 0, 3, 3);

    // create events
    const level = this.scene.get("GameScene");
    level.events.on("enemyHitChanged", this.updateEnemyHit, this);
    level.events.on("energyLevelChanged", this.updateLevelChanged, this);
    level.events.on(
      "miniMapPlayerPositionChanged",
      this.updateMiniMapPlayer,
      this
    );
    level.events.on(
      "miniMapEnemyPositionChanged",
      this.updateMiniMapEnemy,
      this
    );
  }

  update(): void {}

  private updateMiniMapPlayer(): void {
    // get position
    let x = (arguments[0][0] / 768) * 60;
    let y = (arguments[0][1] / 640) * 40;

    // update mini map player graphics
    this.miniMapPlayer.clear();
    this.miniMapPlayer.fillStyle(0x000000, 1);
    this.miniMapPlayer.fillRect(
      this.sys.canvas.width / 2 - 30 + x,
      this.sys.canvas.height - 50 + y,
      3,
      3
    );
  }

  private updateMiniMapEnemy(): void {
    // get position
    let x = (arguments[0][0] / 1152) * 60;
    let y = (arguments[0][1] / 960) * 40;

    // update mini map player graphics
    this.miniMapEnemy.clear();
    this.miniMapEnemy.fillStyle(0xf54254, 1);
    this.miniMapEnemy.fillRect(
      this.sys.canvas.width / 2 - 30 + x,
      this.sys.canvas.height - 50 + y,
      3,
      3
    );
  }

  private addText(
    x: number,
    y: number,
    value: string
  ): Phaser.GameObjects.BitmapText {
    return this.add.bitmapText(x, y, "font", value, 20);
  }

  private updateEnemyHit() {
    this.textElements
      .get("ENEMY HITS")
      .setText(`${this.registry.get("enemyHits")}`);
  }

  private updateLevelChanged() {
    this.textElements
      .get("ENERGY LEVEL")
      .setText(`${this.registry.get("energyLevel")}`);
  }
}
