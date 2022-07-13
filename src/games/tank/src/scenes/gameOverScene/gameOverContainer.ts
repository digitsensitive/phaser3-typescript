import SceneKeys from "../../consts/SceneKeys";
import { highScore } from "../../helpers/helpers";
import { ButtonReplay } from "../../objects/button/normalButton/buttonReplay";

export class GameOverContainer extends Phaser.GameObjects.Container{
  private zone!: Phaser.GameObjects.Zone;
  private score!: Phaser.GameObjects.Text;
  private gameOverText!: Phaser.GameObjects.Text;
  private currentScoreText!: Phaser.GameObjects.Text;
  private highScoreText!: Phaser.GameObjects.Text;
  private highScore!: Phaser.GameObjects.Text;
  private tween!: Phaser.Tweens.Tween;
  private btnReplay!: ButtonReplay;

  private currentScene: Phaser.Scene;
  
  constructor(scene: Phaser.Scene, x: number, y: number){
    super(scene, x, y);
    this.currentScene = scene;
    this.createUI();
    this.alignUI();
    this.setStartPosition();
    this.createTweens();
    this.setDepth(3);
    this.scene.add.existing(this);
  }

  private createUI() {
    this.gameOverText = this.currentScene.add.text(0, 0, 'Game Over', { fontFamily: 'Quicksand',fontSize: '96px'});
    this.currentScoreText = this.currentScene.add.text(0, 0, `Current score`, { fontFamily: 'Quicksand',fontSize: '48px'});

    this.highScoreText = this.currentScene.add.text(0, 0, `High score`, { fontFamily: 'Quicksand',fontSize: '48px'})
      .setOrigin(0.5,0.5)
      .setVisible(false)
      .setDepth(4);
    this.highScore = this.currentScene.add.text(0, 0, `${highScore(this.currentScene)}`, { fontFamily: 'Quicksand',fontSize: '48px'})
      .setOrigin(0.5,0.5)
      .setVisible(false)
      .setDepth(4);;
    this.score = this.currentScene.add.text(0, 0, `${this.currentScene.registry.get('score')}`, { fontFamily: 'Quicksand',fontSize: '48px'})
      .setOrigin(0.5,0.5)
      .setVisible(false)
      .setDepth(4);

    this.btnReplay =  new ButtonReplay({
      scene: this.currentScene,
      x: 0,
      y: 0,
      texture: 'btn-replay',
      soundPress: 'click',
    }).setOrigin(0,0)
      .setDepth(4);

    const camerasWidth= this.currentScene.cameras.main.width;
    const camerasHeight= this.currentScene.cameras.main.height;

    this.zone = this.currentScene.add.zone(140, 90, camerasWidth - 140*2, camerasHeight - 90*2).setOrigin(0,0);
    this.add([this.zone, this.btnReplay, this.highScoreText, this.highScore, this.currentScoreText, this.score, this.gameOverText])    
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
      this.btnReplay,
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
    this.currentScoreText.setY(this.scene.cameras.main.height + 100);
    this.btnReplay.setY(this.scene.cameras.main.height + 100);
    this.score.setY(300);
    this.highScoreText.setY(400);
    this.highScore.setY(500);
  }

  private createTweens() {
    this.tween = this.currentScene.tweens.addCounter({
      from: 0,
      to: this.currentScene.registry.get('score'),
      duration:(this.currentScene.registry.get('score')/100)* 5000,
      paused: true
    });

    this.currentScene.tweens.add({
      targets: this.gameOverText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete() {
        this.destroy;
      },
    });

    this.currentScene.tweens.add({
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
      this.highScoreText.setVisible(true);
      this.highScore.setVisible(true);
      console.log("score: ");
      this.currentScene.tweens.add({
        targets: this.btnReplay,
        y: this.currentScene.cameras.main.height - 300,
        ease: 'Power1',
        duration: 1000,
      });
    })
  }
  
  public createTweenClose(){
    this.currentScene.tweens.add({
      targets: [this.currentScoreText, this.highScoreText, this.highScore, this.score],
      y: - 200,
      ease: 'Power1',
      duration: 500,
    });

    this.currentScene.tweens.add({
      targets: [this.btnReplay],
      y: this.currentScene.cameras.main.height + 200,
      ease: 'Power1',
      duration: 500,
      onComplete: () => {
        this.currentScene.scene.stop();
        this.currentScene.scene.stop(SceneKeys.GameScene);
        this.currentScene.scene.stop(SceneKeys.MenuScene);
        this.currentScene.scene.start(SceneKeys.MenuScene);
      }
    });
  }

  update(...args: any[]): void  {
    this.score.setText(Math.floor(this.tween.getValue()).toString())
  }
}