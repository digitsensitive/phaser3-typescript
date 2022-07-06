/* eslint no-undef: 0 */
/* eslint no-unused-expressions: 0 */
import 'phaser';
import { ButtonReplay } from '../objects/Button/normal-button/button-replay';

export default class GameOverScene extends Phaser.Scene {
  private gameOverText!: Phaser.GameObjects.Text;
  private madeByText!: Phaser.GameObjects.Text;
  private zone!: Phaser.GameObjects.Zone;
  private madeByTween!: Phaser.Tweens.Tween;
  private creditsTween!: Phaser.Tweens.Tween;
  private score!: Phaser.GameObjects.Text;
  private tween!: Phaser.Tweens.Tween;
  constructor() {
    super('GameOverScene');
  }

  create() {

    this.gameOverText = this.add.text(0, 0, 'Game Over', { fontFamily: 'Quicksand',fontSize: '64px'});
    this.madeByText = this.add.text(0, 0, `Current score`, { fontFamily: 'Quicksand',fontSize: '48px'});
    const highScoreText = this.add.text(0, 0, `High score`, { fontFamily: 'Quicksand',fontSize: '48px'})
      .setOrigin(0.5,0.5)
      .setVisible(false)
      .setDepth(2);
    const highScore = this.add.text(0, 0, `1000`, { fontFamily: 'Quicksand',fontSize: '48px'})
      .setOrigin(0.5,0.5)
      .setVisible(false)
      .setDepth(2);;
    this.score = this.add.text(0, 0, `0`, { fontFamily: 'Quicksand',fontSize: '48px'})
      .setOrigin(0.5,0.5)
      .setVisible(false)
      .setDepth(2);;
    var score = 100;
    this.tween = this.tweens.addCounter({
        from: 0,
        to: score,
        duration:(score/100)* 5000,
        paused: true
    });
    const btn_replay =  new ButtonReplay({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-replay',
    }).setOrigin(0,0);
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
      btn_replay,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      highScore,
      this.zone,
    );
    Phaser.Display.Align.In.Center(
      highScoreText,
      this.zone,
    );

    this.madeByText.setY(this.cameras.main.height + 100);
    btn_replay.setY(this.cameras.main.height + 100);
    this.score.setY(300);
    highScoreText.setY(400);
    highScore.setY(500);
    this.creditsTween = this.tweens.add({
      targets: this.gameOverText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete() {
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: 200,
      ease: 'Power1',
      duration: 5000,
      delay: 1000,
      onComplete: ()=>{
        this.score.visible = true;
        this.tween.resume();
      },
    });
    

    this.events.on('restartGame', ()=>{
      this.tweens.add({
        targets: [this.madeByText, highScoreText, highScore, this.score],
        y: - 200,
        ease: 'Power1',
        duration: 500,
      });

      this.tweens.add({
        targets: [btn_replay],
        y: this.cameras.main.height + 200,
        ease: 'Power1',
        duration: 500,
        onComplete: () => {
          this.scene.stop();
          this.scene.stop("GameScene");
          this.scene.start("MenuScene");
        }
      });
      console.log("restart: ");
    }, this);

    this.tween.on("complete", () =>{
      highScoreText.setVisible(true);
      highScore.setVisible(true);
      console.log("score: ");
      this.tweens.add({
        targets: btn_replay,
        y: this.cameras.main.height - 300,
        ease: 'Power1',
        duration: 1000,
      });
    })
  }
  update(time: number, delta: number): void {
    this.score.setText(Math.floor(this.tween.getValue()).toString())
  }
}