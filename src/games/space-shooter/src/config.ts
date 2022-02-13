import { BootScene } from './scenes/boot-scene';
import { GameScene } from './scenes/game-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Space Shooter',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '1.0.0',
  width: 800,
  height: 600,
  backgroundColor: 0x3a404d,
  type: Phaser.AUTO,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [BootScene, GameScene]
};
