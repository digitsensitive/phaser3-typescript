import { EMITTERS_TYPES, customEmitter } from '../emitter';
import { settings } from '../settings';

export class MainMenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;
  private isGameStarting: boolean;
  private textElements: Map<string, Phaser.GameObjects.BitmapText>;
  private mainMenuBackground: Phaser.GameObjects.Rectangle;
  private mainMenuBackgroundBorder: Phaser.GameObjects.Rectangle;

  constructor() {
    super({
      key: 'MainMenuScene'
    });
  }

  init(): void {
    this.isGameStarting = false;
    this.startKey = this.input.keyboard.addKey('SPACE');
  }

  create(): void {
    customEmitter.on(EMITTERS_TYPES.MAX_ENERGY_LOADED, () => {
      this.scene.start('GameScene');
    });

    this.mainMenuBackgroundBorder = this.add
      .rectangle(48, 48, 672, 454, 0xffffff)
      .setOrigin(0);

    this.mainMenuBackground = this.add
      .rectangle(50, 50, 668, 450, 0x747474)
      .setOrigin(0);

    this.textElements = new Map([
      ['TITLE', this.add.bitmapText(180, 100, 'font', 'COSMIC CHAOS', 30)],
      [
        'MISSLES_SELECT',
        this.add.bitmapText(180, 200, 'font', 'MISSLES CONTROLLED ON', 20)
      ],
      [
        'DIFFICULTY',
        this.add.bitmapText(
          180,
          250,
          'font',
          `DIFFICULTY ${settings.difficulty}`,
          20
        )
      ],
      [
        'START',
        this.add
          .bitmapText(180, 400, 'font', 'PRESS SPACE TO START', 20)
          .setTintFill(0xffdb3b)
      ]
    ]);
  }

  update(): void {
    if (this.startKey.isDown && !this.isGameStarting) {
      this.isGameStarting = true;
      customEmitter.emit(EMITTERS_TYPES.LOAD_MAX_ENERGY);
    }
  }
}
