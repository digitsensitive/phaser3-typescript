import { EMITTERS_TYPES, customEmitter } from '../emitter';

export class MainMenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;
  private isGameStarting: boolean;

  constructor() {
    super({
      key: 'MainMenuScene'
    });
  }

  init(): void {
    this.isGameStarting = false;
    this.startKey = this.input.keyboard.addKey('S');
  }

  create(): void {
    customEmitter.on(EMITTERS_TYPES.MAX_ENERGY_LOADED, () => {
      this.scene.start('GameScene');
    });
  }

  update(): void {
    if (this.startKey.isDown && !this.isGameStarting) {
      this.isGameStarting = true;
      customEmitter.emit(EMITTERS_TYPES.LOAD_MAX_ENERGY);
    }
  }
}
