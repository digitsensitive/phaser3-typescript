import { Player } from '../objects/player';

export class GameScene extends Phaser.Scene {
  private player: Player;

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    this.player = new Player({
      scene: this,
      x: 400,
      y: 300,
      texture: 'player'
    });
  }

  update(): void {
    this.player.update();
  }
}
