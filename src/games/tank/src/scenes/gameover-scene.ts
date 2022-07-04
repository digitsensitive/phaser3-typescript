/* eslint no-undef: 0 */
/* eslint no-unused-expressions: 0 */
import 'phaser';

export default class GameOverScene extends Phaser.Scene {
  private gameOverText!: Phaser.GameObjects.Text;
  private madeByText!: Phaser.GameObjects.Text;
  private zone!: Phaser.GameObjects.Zone;
  private madeByTween!: Phaser.Tweens.Tween;
  private creditsTween!: Phaser.Tweens.Tween;
  constructor() {
    super('GameOver');
  }

  create() {

    this.gameOverText = this.add.text(0, 0, 'Game Over', { fontFamily: 'Quicksand',fontSize: '64px'});
    this.madeByText = this.add.text(0, 0, `Current score: 0`, { fontFamily: 'Quicksand',fontSize: '48px'});

    this.zone = this.add.zone(this.cameras.main.width/2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height);

    Phaser.Display.Align.In.Center(
      this.gameOverText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone,
    );

    this.madeByText.setY(this.cameras.main.height + 100);

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
      onComplete: function () { // eslint-disable-line func-names
        this.madeByTween.destroy;
        this.scene.start('MenuScene');
      }.bind(this),
    });
  }
}