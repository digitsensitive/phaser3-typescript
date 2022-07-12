import { ButtonStart } from "../button/normalButton/buttonStart";
import { ButtonMusic } from "../button/toggleButton/buttonMusic";
import { ButtonSound } from "../button/toggleButton/buttonSound";

export class MenuContainer extends Phaser.GameObjects.Container {
  private btnStart: ButtonStart;
  private btnSound: ButtonSound;
  private btnMusic: ButtonMusic;
  private currentScene: Phaser.Scene;
  private zone!: Phaser.GameObjects.Zone;

  constructor(scene: Phaser.Scene, x: number, y: number){
    super(scene, x, y);
    this.currentScene = scene;
    this.createUI();
    this.createTweens();
  }

  private createUI(){
    this.currentScene.add.image(0,0,'background')
      .setOrigin(0,0)
      .setScale(0.75,0.75);
    
    const logo = this.currentScene.add.image(0,0,'logo');
    this.zone = this.currentScene.add.zone(140, 90, this.currentScene.cameras.main.width - 140*2, this.currentScene.cameras.main.height - 90*2).setOrigin(0,0);
    this.add(this.zone);
    //  Center the picture in the game
    
    this.btnStart = new ButtonStart({
      scene: this.currentScene,
      x: 0,
      y: 0,
      texture: 'btn-start',
      soundPress: 'select',
    }).setVisible(false);
    
    
    this.btnSound =  new ButtonSound({
      scene: this.currentScene,
      x: 0,
      y: 0,
      texture: 'btn-sound',
      frame: 1,
      numberOfFrames: 2,
      soundPress: 'click',
    })
    
    this.btnMusic =  new ButtonMusic({
      scene: this.currentScene,
      x: 0,
      y: 0,
      texture: 'btn-music',
      frame: 1,
      numberOfFrames: 2,
      soundPress: 'click',
    })
    
    this.add([this.btnSound, this.btnMusic, this.btnStart]);

    Phaser.Display.Align.In.TopCenter(logo, this.zone);
    Phaser.Display.Align.In.Center(this.btnStart, this.zone);
    Phaser.Display.Align.In.BottomLeft(this.btnSound, this.zone);
    Phaser.Display.Align.In.BottomRight(this.btnMusic, this.zone);
  }

  private createTweens(): void {
    this.currentScene.tweens.add({
      targets: this.btnStart,
      scaleX: 1.2,
      scaleY: 1.2,
      ease: 'Sine.easeInOut',
      duration: 500,
      yoyo: true,
      repeat: -1,
    })
  }

  public createTweenClose(){
    this.currentScene.tweens.add({
      targets: [this.btnSound, this.btnMusic],
      y: this.currentScene.cameras.main.height + 200,
      ease: 'Power1',
      duration: 500,
    });
    this.currentScene.tweens.add({
      targets: [this.btnStart],
      y: -200,
      ease: 'Power1',
      duration: 500,
      onComplete: () => {
        this.currentScene.scene.stop("MenuScene")
        this.currentScene.game.input.mouse.requestPointerLock();
        this.currentScene.scene.stop("GameScene");
        this.currentScene.scene.start("GameScene");
      }
    });
  }

  public setVisibleBtnStart(){
    this.btnStart.setVisible(true);
  }
}