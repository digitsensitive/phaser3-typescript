import { GameScene } from './scenes/main-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Webpack-Boilerplate',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '2.0',
  backgroundColor: 0x3a404d,
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.MAX_ZOOM,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    parent: 'game',
    width: '100%',
    height: '100%'
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { x: 0, y: 100 }
    }
  },
  scene: [GameScene]
};
