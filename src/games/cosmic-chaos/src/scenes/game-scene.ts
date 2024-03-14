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

    this.enemies.add(
      new Hamburger({
        scene: this,
        x: this.game.renderer.width / 2,
        y: 50,
        texture: 'enemy'
      })
    );
  }

  update(): void {
    this.player.update();

    this.enemies.getChildren().forEach((enemy: Enemy) => {
      enemy.update();
    });

    // update energy level
    customEmitter.emit(EMITTERS_TYPES.REDUCE_ENERGY);
  }
}
