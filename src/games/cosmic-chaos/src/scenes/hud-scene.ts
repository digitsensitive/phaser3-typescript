import { EMITTERS_TYPES, customEmitter } from '../emitter';

export class HUDScene extends Phaser.Scene {
  private energyBar: Phaser.GameObjects.Rectangle;
  private energyBarBox: Phaser.GameObjects.Rectangle;
  private cockpitBackground: Phaser.GameObjects.Rectangle;
  private textElements: Map<string, Phaser.GameObjects.BitmapText>;

  readonly energyBarWidth: number;
  private currentEnergy: number;

  constructor() {
    super({
      key: 'HUDScene'
    });

    this.energyBarWidth = 400;
    this.currentEnergy = 0;
  }

  create(): void {
    this.cockpitBackground = this.add
      .rectangle(
        0,
        this.game.canvas.height - 80,
        this.game.canvas.width,
        80,
        0xb5b5b5
      )
      .setOrigin(0, 0);

    this.energyBarBox = this.add.rectangle(
      this.game.canvas.width / 2,
      this.game.canvas.height - 65,
      this.energyBarWidth,
      12,
      0xde0b0b
    );

    this.energyBar = this.add
      .rectangle(
        this.game.canvas.width / 2 - this.energyBarWidth / 2,
        this.game.canvas.height - 71,
        0,
        12,
        0xffdb3b
      )
      .setOrigin(0, 0);

    this.textElements = new Map([
      ['ENERGY', this.addText(80, this.game.canvas.height - 72, `ENERGY`, 14)],
      [
        'SCORE',
        this.addText(
          500,
          this.game.canvas.height - 40,
          `${this.registry.get('score')}`,
          25
        )
      ]
    ]);

    customEmitter.on(EMITTERS_TYPES.LOAD_MAX_ENERGY, this.loadMaxEnergy, this);
    customEmitter.on(EMITTERS_TYPES.REDUCE_ENERGY, this.reduceEnergy, this);
  }

  update(): void {}

  private addText(
    x: number,
    y: number,
    value: string,
    size: number
  ): Phaser.GameObjects.BitmapText {
    return this.add.bitmapText(x, y, 'font', value, size);
  }

  private loadMaxEnergy(): void {
    let energyTween = this.add.tween({
      targets: this.energyBar,
      props: { width: this.energyBarWidth },
      duration: 1500,
      ease: 'Linear',
      onComplete: () => {
        customEmitter.emit(EMITTERS_TYPES.MAX_ENERGY_LOADED);
        energyTween.remove();
      }
    });
  }

  private reduceEnergy(): void {
    if (this.energyBar.width > 0) {
      this.energyBar.width -= 0.05;
    } else {
      customEmitter.emit(EMITTERS_TYPES.ENERGY_EMPTY);
    }
  }
}
