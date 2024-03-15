import { BootScene } from './scenes/boot-scene';
import { FactoryMethodScene } from './scenes/factory-method-scene';
import { SimpleFactoryScene } from './scenes/simple-factory-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Factory Method',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '0.0.1',
  width: 160,
  height: 144,
  zoom: 4,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene, SimpleFactoryScene, FactoryMethodScene],
  backgroundColor: '#32484f',
  render: { pixelArt: true, antialias: false }
};
