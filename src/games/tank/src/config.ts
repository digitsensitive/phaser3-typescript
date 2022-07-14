import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';
import GameOverScene from './scenes/game-over-scene/GameOverScene';
import { MenuScene } from './scenes/menu-scene/MenuScene';
import { PauseScene } from './scenes/pause-scene/PauseScene';

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
