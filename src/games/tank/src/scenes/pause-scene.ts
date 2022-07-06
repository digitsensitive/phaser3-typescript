import { ButtonMusic } from "../objects/Button/toggle-button/button-music";
import { ButtonSound } from "../objects/Button/toggle-button/button-sound";
import { ButtonReplay } from "../objects/Button/normal-button/button-replay";
import { ButtonPlay } from "../objects/Button/normal-button/button-play";

export class PauseScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'PauseScene'
    });
  }

  create(): void {

    
    const btn_music =  new ButtonMusic({
      scene: this,
      x: -600,
      y: 140,
      texture: 'btn-music',
      frame: 1,
    }, 2)
    this.tweens.add({
      targets: btn_music,
      x: 300,
      ease: 'Power1',
      duration: 300,
    });
    // Phaser.Display.Align.In.BottomRight(btn_music, this.add.zone(140, 90, this.cameras.main.width - 140*2, this.cameras.main.height - 90*2).setOrigin(0,0));
    
    const btn_sound =  new ButtonSound({
      scene: this,
      x: -600,
      y: 140,
      texture: 'btn-sound',
      frame: 1,
    }, 2);
    this.tweens.add({
      targets: btn_sound,
      x: 100,
      ease: 'Power1',
      duration: 300,
      delay: 200,
    });
    // Phaser.Display.Align.In.TopLeft(btn_sound, this.add.zone(140, 140, this.cameras.main.width - 140*2, this.cameras.main.height - 90*2).setOrigin(0,0));
    const btn_play =  new ButtonPlay({
      scene: this,
      x: -600,
      y: 300,
      texture: 'btn-play',
    }).setOrigin(0,0)
    this.tweens.add({
      targets: btn_play,
      x: 100,
      ease: 'Power1',
      duration: 300,
      delay: 400,
    });
    // Phaser.Display.Align.In.BottomRight(btn_music, this.add.zone(140, 90, this.cameras.main.width - 140*2, this.cameras.main.height - 90*2).setOrigin(0,0));
    
    const btn_replay =  new ButtonReplay({
      scene: this,
      x: -600,
      y: 460,
      texture: 'btn-replay',
    }).setOrigin(0,0);
    this.tweens.add({
      targets: btn_replay,
      x: 100,
      ease: 'Power1',
      duration: 300,
      delay: 600,
    });
    // Phaser.Display.Align.In.TopLeft(btn_sound, this.add.zone(140, 140, this.cameras.main.width - 140*2, this.cameras.main.height - 90*2).setOrigin(0,0));

    this.events.on('restartGame', ()=>{
      this.tweens.add({
        targets: [btn_replay, btn_play, btn_sound, btn_music],
        x: -600,
        ease: 'Power1',
        duration: 500,
        onComplete: () => {
          this.scene.stop();
          this.scene.stop("GameScene");
          this.scene.stop("MenuScene");
          this.scene.start("MenuScene");
        }
      });
      console.log("restart: ");
    }, this);

    // create events
    this.events.on('continue', ()=>{
      this.tweens.add({
        targets: [btn_replay, btn_play, btn_sound, btn_music],
        x: -600,
        ease: 'Power1',
        duration: 500,
        onComplete: () => {
          this.scene.stop();
          this.game.input.mouse.requestPointerLock();
          this.scene.resume("GameScene");
        }
      });
    }, this);

  }

  update(): void {
  }
}
