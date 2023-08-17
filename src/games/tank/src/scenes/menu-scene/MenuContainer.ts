import SceneKeys from "../../consts/SceneKeys";
import { StartButton } from "../../objects/button/normal-button/StartButton";
import { ButtonMusic } from "../../objects/button/toggle-button/ButtonMusic";
import { ButtonSound } from "../../objects/button/toggle-button/ButtonSound";

export class MenuContainer extends Phaser.GameObjects.Container {
  private startButton: StartButton;
  private soundButton: ButtonSound;
  private musicButton: ButtonMusic;
  private logo: Phaser.GameObjects.Image;
  private zone!: Phaser.GameObjects.Zone;

  constructor(scene: Phaser.Scene, x: number, y: number){
    super(scene, x, y);
    this.createUI();
    this.alignUI();
    this.createTweens();
  }

  public createTweenClose(){
    this.scene.tweens.add({
      targets: [this.soundButton, this.musicButton],
      y: this.scene.cameras.main.height + 200,
      ease: 'Power1',
      duration: 500,
    });
    this.scene.tweens.add({
      targets: [this.startButton],
      y: -200,
      ease: 'Power1',
      duration: 500,
      onComplete: () => {
        this.scene.game.input.mouse.requestPointerLock();
        this.scene.scene.stop(SceneKeys.MENU_SCENE)
        this.scene.scene.stop(SceneKeys.GAME_SCENE);
        this.scene.scene.start(SceneKeys.GAME_SCENE);
      }
    });
  }

  public setVisibleBtnStart(){
    this.startButton.setVisible(true);
  }
  
  private createUI(){
    const camerasWidth= this.scene.cameras.main.width;
    const camerasHeight= this.scene.cameras.main.height;

    this.scene.add.image(0,0,'background')
      .setOrigin(0,0)
      .setScale(0.75,0.75);
    
    this.logo = this.scene.add.image(0,0,'logo');
    this.zone = this.scene.add.zone(
      140, 
      90, 
      camerasWidth - 140*2, 
      camerasHeight - 90*2
    )
      .setOrigin(0,0);
    this.add(this.zone);
    //  Center the picture in the game
    
    this.startButton = new StartButton({
      scene: this.scene,
      x: 0,
      y: 0,
      texture: 'btn-start',
      soundPress: 'select',
    }).setVisible(false);
    
    
    this.soundButton =  new ButtonSound({
      scene: this.scene,
      x: 0,
      y: 0,
      texture: 'btn-sound',
      frame: 1,
      numberOfFrames: 2,
      soundPress: 'click',
    })
    
    this.musicButton =  new ButtonMusic({
      scene: this.scene,
      x: 0,
      y: 0,
      texture: 'btn-music',
      frame: 1,
      numberOfFrames: 2,
      soundPress: 'click',
    })
    
    this.add([
      this.soundButton, 
      this.musicButton, 
      this.startButton
    ]);
  }

  private alignUI(){
    Phaser.Display.Align.In.TopCenter(
      this.logo, 
      this.zone
    );
    Phaser.Display.Align.In.Center(
      this.startButton, 
      this.zone
    );
    Phaser.Display.Align.In.BottomLeft(
      this.soundButton, 
      this.zone
    );
    Phaser.Display.Align.In.BottomRight(
      this.musicButton, 
      this.zone
    );
  }

  private createTweens(): void {
    this.scene.tweens.add({
      targets: this.startButton,
      scaleX: 1.2,
      scaleY: 1.2,
      ease: 'Sine.easeInOut',
      duration: 500,
      yoyo: true,
      repeat: -1,
    })
  }
}