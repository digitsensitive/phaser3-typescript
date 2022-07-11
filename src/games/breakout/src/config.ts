import { BootScene } from './scenes/bootScene';
import { GameScene } from './scenes/gameScene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Breakout',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '1.0',
  type: Phaser.AUTO,
  scene: [BootScene, GameScene],

  input: {
    keyboard: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      // debug: true,
    }
  },
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    parent: 'game',
    width: 480,
    height: 640
  },
  backgroundColor: 0x262626,
  render: { pixelArt: true }
};
