import { BootScene } from './scenes/boot-scene';
import { GameScene } from './scenes/game-scene';
import { MainMenuScene } from './scenes/main-menu-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Flappy Bird',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '0.0.1',
  width: 390,
  height: 600,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene, MainMenuScene, GameScene],
  input: {
    keyboard: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 300 }
    }
  },
  backgroundColor: '#98d687',
  render: { pixelArt: true, antialias: false }
};
