import { BootScene } from './scenes/boot-scene';
import { MainMenuScene } from './scenes/main-menu-scene';
import { GameScene } from './scenes/game-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Asteroid',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '0.0.1',
  type: Phaser.AUTO,
  scene: [BootScene, MainMenuScene, GameScene],
  scale: { width: '100%', height: '100%', parent: 'game' },
  input: {
    keyboard: true,
    mouse: false,
    touch: false,
    gamepad: false
  },
  physics: {
    default: 'arcade'
  },
  backgroundColor: '#000000',
  render: { antialias: true }
};
