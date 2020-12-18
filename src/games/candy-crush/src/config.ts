import { BootScene } from './scenes/boot-scene';
import { GameScene } from './scenes/game-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Candy crush',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '2.0',
  width: 520,
  height: 700,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene, GameScene],
  backgroundColor: '#de3412',
  render: { pixelArt: false, antialias: true }
};
