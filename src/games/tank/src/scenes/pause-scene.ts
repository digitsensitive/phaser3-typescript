import { Button } from "../objects/Button/normal-button/button";
import { ButtonMusic } from "../objects/Button/toggle-button/button-music";
import { ButtonStart } from "../objects/Button/normal-button/button-start";
import { ButtonSound } from "../objects/Button/toggle-button/button-sound";

export class PauseScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  constructor() {
    super({
      key: 'PauseScene'
    });
  }

  init(): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.startKey.isDown = false;
  }

  create(): void {
    // this.add.image(0,0,'background')
    //   .setOrigin(0,0)
    //   .setScale(0.75,0.75);
    
    const logo = this.add.image(0,0,'logo');
    //  Center the picture in the game
    Phaser.Display.Align.In.TopCenter(logo, this.add.zone(140, 90, this.cameras.main.width - 140*2, this.cameras.main.height - 90*2).setOrigin(0,0));

    const btn_start = new ButtonStart({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-start'
    });
    this.tweens.add({
      targets: btn_start,
      scaleX: 1.2,
      scaleY: 1.2,
      ease: 'Sine.easeInOut',
      duration: 500,
      yoyo: true,
      repeat: -1,
    })
    Phaser.Display.Align.In.Center(btn_start, this.add.zone(140, 90, this.cameras.main.width - 140*2, this.cameras.main.height - 90*2).setOrigin(0,0));

    const btn_sound =  new ButtonSound({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-sound',
      frame: 1,
    }, 2)
    Phaser.Display.Align.In.BottomLeft(btn_sound, this.add.zone(140, 90, this.cameras.main.width - 140*2, this.cameras.main.height - 90*2).setOrigin(0,0));
    
    const btn_music =  new ButtonMusic({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-music',
      frame: 1,
    }, 2)
    Phaser.Display.Align.In.BottomRight(btn_music, this.add.zone(140, 90, this.cameras.main.width - 140*2, this.cameras.main.height - 90*2).setOrigin(0,0));


    // this.bitmapTexts.push(
    //   this.add.bitmapText(
    //     this.sys.canvas.width / 2 - 120,
    //     this.sys.canvas.height / 2,
    //     'font',
    //     'PRESS S TO PLAY',
    //     30
    //   )
    // );

    // this.bitmapTexts.push(
    //   this.add.bitmapText(
    //     this.sys.canvas.width / 2 - 120,
    //     this.sys.canvas.height / 2 - 100,
    //     'font',
    //     'TANK',
    //     100
    //   )
    // );
  }

  update(): void {
    if (this.startKey.isDown) {
      this.scene.start('GameScene');
    }
  }
}
