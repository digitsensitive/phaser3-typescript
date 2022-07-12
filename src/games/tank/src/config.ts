import { BootScene } from './scenes/bootScene';
import { GameScene } from './scenes/gameScene';
import GameOverScene from './scenes/gameOverScene/gameOverScene';
import { MenuScene } from './scenes/menuScene/menuScene';
import { PauseScene } from './scenes/pauseScene/pauseScene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Tank',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '2.0',
  width: 1600,
  height: 1200,
  zoom: 0.6,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene,GameOverScene, MenuScene, GameScene, PauseScene],
  input: {
    keyboard: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      // debug: true
    }
  },
  backgroundColor: '#000000',
  render: { pixelArt: false, antialias: true }
};
