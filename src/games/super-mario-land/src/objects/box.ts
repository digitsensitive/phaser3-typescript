import { Collectible } from './collectible';
import { IBoxConstructor } from '../interfaces/box.interface';

export class Box extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;

  // variables
  private boxContent: string;
  private content: Collectible;
  private hitBoxTween: Phaser.Tweens.Tween;

  public getContent(): Phaser.GameObjects.Sprite {
    return this.content;
  }

  public getBoxContentString(): string {
    return this.boxContent;
  }

  constructor(aParams: IBoxConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    // variables
    this.boxContent = aParams.content;

    this.initSprite();
    this.scene.add.existing(this);
  }

  private initSprite() {
    // variables
    this.content = null;

    // sprite
    this.setOrigin(0, 0);
    this.setFrame(0);

    // physics
    this.scene.physics.world.enable(this);
    this.body.setSize(8, 8);
    this.body.setAllowGravity(false);
    this.body.setImmovable(true);
  }

  update(): void {}

  public yoyoTheBoxUpAndDown(): void {
    this.hitBoxTween = this.scene.add.tween({
      targets: this,
      props: { y: this.y - 10 },
      duration: 60,
      ease: 'Power0',
      yoyo: true,
      onComplete: function () {
        this.targets[0].active = false;
        this.targets[0].setFrame(1);
      }
    });
  }

  public spawnBoxContent(): Collectible {
    this.content = new Collectible({
      scene: this.scene,
      x: this.x,
      y: this.y - 8,
      texture: this.boxContent,
      points: 1000
    });
    return this.content;
  }

  public tweenBoxContent(
    props: {},
    duration: number,
    complete: () => void
  ): void {
    this.hitBoxTween = this.scene.add.tween({
      targets: this.content,
      props: props,
      delay: 0,
      duration: duration,
      ease: 'Power0',
      onComplete: complete
    });
  }

  public startHitTimeline(): void {
    this.hitBoxTween.play();
  }

  public popUpCollectible(): void {
    this.content.body.setVelocity(30, -50);
    this.content.body.setAllowGravity(true);
    this.content.body.setGravityY(-300);
  }

  public addCoinAndScore(coin: number, score: number): void {
    this.scene.registry.values.coins += coin;
    this.scene.events.emit('coinsChanged');
    this.scene.registry.values.score += score;
    this.scene.events.emit('scoreChanged');
  }
}
