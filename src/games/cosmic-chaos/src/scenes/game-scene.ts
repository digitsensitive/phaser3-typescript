import { EMITTERS_TYPES, customEmitter } from '../emitter';
import { Enemy } from '../objects/enemy';
import { Hamburger } from '../objects/hamburger';
import { Player } from '../objects/player';

export class GameScene extends Phaser.Scene {
  private player: Player;
  private enemies: Phaser.GameObjects.Group;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  preload(): void {}

  init(): void {
    this.enemies = this.add.group({
      name: 'Enemies',
      active: false,
      runChildUpdate: true
    });
  }

  create(): void {
    // create game objects
    this.player = new Player({
      scene: this,
      x: this.game.renderer.width / 2,
      y: this.game.renderer.height - 140,
      texture: 'player'
    });

    let isEnemySpot: boolean = false;
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 8; x++) {
        if (isEnemySpot) {
          this.enemies.add(
            new Hamburger({
              scene: this,
              x: x * 80 - 200,
              y: y * 80 + 50,
              texture: 'hamburger'
            })
          );
        }
        isEnemySpot = !isEnemySpot;
      }
    }
  }

  update(): void {
    this.player.update();

    this.enemies.getChildren().forEach((enemy: Enemy) => {
      enemy.update();

      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          this.player.getShootBounds(),
          enemy.getBounds()
        )
      ) {
        this.registry.values.score += enemy.getValue();
        customEmitter.emit(EMITTERS_TYPES.SCORE_UPDATED);
        enemy.destroy();
      }
    });

    // update energy level
    customEmitter.emit(EMITTERS_TYPES.REDUCE_ENERGY);
  }
}
