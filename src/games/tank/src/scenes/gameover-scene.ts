/* eslint no-undef: 0 */
/* eslint no-unused-expressions: 0 */
import 'phaser';
import { ButtonReplay } from '../objects/Button/normal-button/button-replay';

export default class GameOverScene extends Phaser.Scene {
  private zone!: Phaser.GameObjects.Zone;
  private score!: Phaser.GameObjects.Text;
  private gameOverText!: Phaser.GameObjects.Text;
  private currentScoreText!: Phaser.GameObjects.Text;
  private highScoreText!: Phaser.GameObjects.Text;
  private highScore!: Phaser.GameObjects.Text;
  private tween!: Phaser.Tweens.Tween;
  private btn_replay!: ButtonReplay;
  constructor() {
    super('GameOverScene');
  }

  create() {
    this.createUI();
    this.createTweens();
    this.createHandleEvents();
  }
  update(time: number, delta: number): void {
    this.score.setText(Math.floor(this.tween.getValue()).toString())
  }

  private createUI() {
    this.gameOverText = this.add.text(0, 0, 'Game Over', { fontFamily: 'Quicksand',fontSize: '96px'});
    this.currentScoreText = this.add.text(0, 0, `Current score`, { fontFamily: 'Quicksand',fontSize: '48px'});

    this.highScoreText = this.add.text(0, 0, `High score`, { fontFamily: 'Quicksand',fontSize: '48px'})
      .setOrigin(0.5,0.5)
      .setVisible(false)
      .setDepth(3);
    this.highScore = this.add.text(0, 0, `${this.getHighScore()}`, { fontFamily: 'Quicksand',fontSize: '48px'})
      .setOrigin(0.5,0.5)
      .setVisible(false)
      .setDepth(3);;
    this.score = this.add.text(0, 0, `${this.registry.get('score')}`, { fontFamily: 'Quicksand',fontSize: '48px'})
      .setOrigin(0.5,0.5)
      .setVisible(false)
      .setDepth(3);

    this.btn_replay =  new ButtonReplay({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-replay',
    }).setOrigin(0,0)
      .setDepth(3);
    this.zone = this.add.zone(140, 90, this.cameras.main.width - 140*2, this.cameras.main.height - 90*2).setOrigin(0,0);

    Phaser.Display.Align.In.Center(
      this.gameOverText,
      this.zone,
    );
    Phaser.Display.Align.In.Center(
      this.score,
      this.zone,
    );
    Phaser.Display.Align.In.BottomCenter(
      this.btn_replay,
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
    
    this.currentScoreText.setY(this.cameras.main.height + 100);
    this.btn_replay.setY(this.cameras.main.height + 100);
    this.score.setY(300);
    this.highScoreText.setY(400);
    this.highScore.setY(500);    
  }
  private createHandleEvents(){
    this.events.on('restartGame', ()=>{
      this.tweens.add({
        targets: [this.currentScoreText, this.highScoreText, this.highScore, this.score],
        y: - 200,
        ease: 'Power1',
        duration: 500,
      });

      this.tweens.add({
        targets: [this.btn_replay],
        y: this.cameras.main.height + 200,
        ease: 'Power1',
        duration: 500,
        onComplete: () => {
          this.scene.stop();
          this.scene.stop("GameScene");
          this.scene.start("MenuScene");
        }
      });
    }, this);
  }
  private createTweens() {
    this.tween = this.tweens.addCounter({
      from: 0,
      to: this.registry.get('score'),
      duration:(this.registry.get('score')/100)* 5000,
      paused: true
    });

    this.tweens.add({
      targets: this.gameOverText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete() {
        this.destroy;
      },
    });

    this.tweens.add({
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
      this.tweens.add({
        targets: this.btn_replay,
        y: this.cameras.main.height - 300,
        ease: 'Power1',
        duration: 1000,
      });
    })
  }

  private getHighScore(){
    var score = this.registry.get('score');
    if (localStorage.getItem('highscore')) {
      if (localStorage.getItem('highscore') < score) {
        localStorage.setItem('highscore', score);
      }
    } else {
      localStorage.setItem('highscore', score);
    }
    return localStorage.getItem('highscore');
  }

}