import { BootScene } from './scenes/boot-scene';
import { GameScene } from './scenes/game-scene';
import { HUDScene } from './scenes/hud-scene';
import { MainMenuScene } from './scenes/main-menu-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Cosmic Chaos',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '0.0.1',
  type: Phaser.AUTO,
  scene: [BootScene, MainMenuScene, HUDScene, GameScene],
  input: {
    keyboard: true,
    mouse: false,
    touch: false,
    gamepad: false
  },
  scale: {
    width: 768,
    height: 640,
    parent: 'game',
    mode: Phaser.Scale.ScaleModes.FIT
  },
  backgroundColor: '#000000',
  render: { pixelArt: true },
  audio: { disableWebAudio: true },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: true
    }
  }
};
