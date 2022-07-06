import { Button } from "../objects/Button/normal-button/button";
import { ButtonMusic } from "../objects/Button/toggle-button/button-music";
import { ButtonStart } from "../objects/Button/normal-button/button-start";
import { ButtonSound } from "../objects/Button/toggle-button/button-sound";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'MenuScene'
    });
  }

  create(): void {
    const background = this.add.image(0,0,'background')
      .setOrigin(0,0)
      .setScale(0.75,0.75);
    
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

    this.events.on('startgame', ()=>{
      this.tweens.add({
        targets: [btn_sound, btn_music],
        y: this.cameras.main.height + 200,
        ease: 'Power1',
        duration: 500,
      });
      this.tweens.add({
        targets: [btn_start],
        y: -200,
        ease: 'Power1',
        duration: 500,
        onComplete: () => {
          this.game.input.mouse.requestPointerLock();
          this.scene.start("GameScene");
        }
      });
      console.log("start: ");
    }, this);

    this.events.on('start', ()=>{
      this.input.mouse.releasePointerLock();
    }, this);
  }

  update(): void {

  }
}
