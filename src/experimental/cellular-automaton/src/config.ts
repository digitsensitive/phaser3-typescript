import { GameScene } from './scenes/game-scene';
import { CONST } from './const/const';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Cellular automaton',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '2.0',
  width: 600,
  height: 600,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [GameScene],
  backgroundColor: CONST.BACKGROUND_COLOR,
  render: { pixelArt: true, antialias: false }
};
