import SceneKeys from "../../consts/SceneKeys";
import { highScore } from "../../helpers/helpers";
import { ReplayButton } from "../../objects/button/normal-button/ReplayButton";

export class GameOverContainer extends Phaser.GameObjects.Container{
  private zone!: Phaser.GameObjects.Zone;
  private score!: Phaser.GameObjects.Text;
  private gameOverText!: Phaser.GameObjects.Text;
  private currentScoreText!: Phaser.GameObjects.Text;
  private highScoreText!: Phaser.GameObjects.Text;
  private highScore!: Phaser.GameObjects.Text;
  private tween!: Phaser.Tweens.Tween;
  private replayButton!: ReplayButton;

  constructor(scene: Phaser.Scene, x: number, y: number){
    super(scene, x, y);
    this.createUI();
    this.alignUI();
    this.setStartPosition();
    this.createTweens();
    this.setDepth(3);
    this.scene.add.existing(this);
  }

  update(...args: any[]): void  {
    this.score.setText(
      Math.floor(this.tween.getValue()).toString()
    )
  }

  public createTweenClose(){
    const camerasHeight= this.scene.cameras.main.height;

    this.scene.tweens.add({
      targets: [this.currentScoreText, this.highScoreText, this.highScore, this.score],
      y: - 200,
      ease: 'Power1',
      duration: 500,
    });

    this.scene.tweens.add({
      targets: [this.replayButton],
      y: camerasHeight + 200,
      ease: 'Power1',
      duration: 500,
      onComplete: () => {
        this.scene.scene.stop();
        this.scene.scene.stop(SceneKeys.GAME_SCENE);
        this.scene.scene.sendToBack();
        this.scene.scene.stop(SceneKeys.MENU_SCENE);
        this.scene.scene.start(SceneKeys.MENU_SCENE);
      }
    });
  }

  private createUI() {
    const camerasWidth= this.scene.cameras.main.width;
    const camerasHeight= this.scene.cameras.main.height;

    const background = this.scene.add.rectangle(
      0, 
      0, 
      camerasWidth, 
      camerasHeight, 
      0x000000
    )
      .setOrigin(0,0)
      .setAlpha(0.8);
    
    this.gameOverText = this.scene.add.text(
      0, 0, 
      'Game Over', 
      { 
        fontFamily: 'Quicksand',
        fontSize: '96px'
      }
    );
    this.currentScoreText = this.scene.add.text(
      0, 0, 
      `Current score`, 
      { 
        fontFamily: 'Quicksand',
        fontSize: '48px'
      }
    );

    this.highScoreText = this.scene.add.text(
      0, 0, 
      `High score`, 
      { 
        fontFamily: 'Quicksand',
        fontSize: '48px'
      }
    )
      .setOrigin(0.5,0.5)
      .setVisible(false)

    this.highScore = this.scene.add.text(
      0, 0, 
      `${highScore(this.scene)}`, 
      { 
        fontFamily: 'Quicksand',
        fontSize: '48px'
      }
    )
      .setOrigin(0.5,0.5)
      .setVisible(false)

    this.score = this.scene.add.text(
      0, 0, 
      `${this.scene.registry.get('score')}`, 
      { 
        fontFamily: 'Quicksand',
        fontSize: '48px'
      }
    )
      .setOrigin(0.5,0.5)
      .setVisible(false)

    this.replayButton =  new ReplayButton({
      scene: this.scene,
      x: 0,
      y: 0,
      texture: 'btn-replay',
      soundPress: 'click',
    }).setOrigin(0,0)

    this.zone = this.scene.add.zone(
      140, 
      90, 
      camerasWidth - 140*2, 
      camerasHeight - 90*2
    )
      .setOrigin(0,0);

    this.add([
      this.zone, 
      this.replayButton, 
      this.highScoreText, 
      this.highScore, 
      this.currentScoreText, 
      this.score, 
      this.gameOverText
    ])    
  }

  private alignUI(){
    Phaser.Display.Align.In.Center(
      this.gameOverText,
      this.zone,
    );
    Phaser.Display.Align.In.Center(
      this.score,
      this.zone,
    );
    Phaser.Display.Align.In.BottomCenter(
      this.replayButton,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.currentScoreText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.highScore,
      this.zone,
    );
    Phaser.Display.Align.In.Center(
      this.highScoreText,
      this.zone,
    );
  }

  private setStartPosition(){
    const camerasHeight = this.scene.cameras.main.height;
    this.currentScoreText.setY(camerasHeight + 100);
    this.replayButton.setY(camerasHeight + 100);
    this.score.setY(300);
    this.highScoreText.setY(400);
    this.highScore.setY(500);
  }

  private createTweens() {
    const durationTween = (this.scene.registry.get('score')/100)* 5000;
    const score = this.scene.registry.get('score')
    this.tween = this.scene.tweens.addCounter({
      from: 0,
      to: score,
      duration: durationTween,
      paused: true
    });

    this.scene.tweens.add({
      targets: this.gameOverText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete() {
        this.destroy;
      },
    });

    this.scene.tweens.add({
      targets: this.currentScoreText,
      y: 200,
      ease: 'Power1',
      duration: 5000,
      delay: 1000,
      onComplete: ()=>{
        this.score.visible = true;
        this.tween.resume();
      },
    });

    this.tween.on("complete", () =>{
      const camerasHeight = this.scene.cameras.main.height;
      this.highScoreText.setVisible(true);
      this.highScore.setVisible(true);
      this.scene.tweens.add({
        targets: this.replayButton,
        y: camerasHeight - 300,
        ease: 'Power1',
        duration: 1000,
      });
    })
  }
}