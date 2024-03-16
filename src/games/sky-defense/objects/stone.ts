export class Stone extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  public wasHit: boolean;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.wasHit = false;

    this.setOrigin(0.5, 0.5);
    this.setFrame(0);
    this.setScale(Phaser.Math.RND.between(1, 2.5));

    this.scene.physics.world.enable(this);
    this.body.setSize(12, 11);
    this.body.setVelocityY(Phaser.Math.RND.between(60, 100));

    this.scene.tweens.add({
      targets: this,
      props: { x: this.x + Phaser.Math.RND.between(5, 15) },
      duration: 2000,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
    });

    this.scene.add.existing(this);
  }

  update(): void {
    if (this.wasHit) {
      this.anims.play("explosion", true);

      this.scene.tweens.add({
        targets: this,
        props: {
          x: this.x + 5,
        },
        duration: 300,
        ease: "Linear",
        yoyo: false,
        onComplete: function () {
          this.targets[0].destroy();
        },
      });
    } else {
      this.rotation += 0.05;
    }

    if (this.y > 300) {
      this.scene.registry.values.life -= 5;
      this.scene.events.emit("lifeChanged");
      this.destroy();
    }
  }

  public addScore(): void {
    this.scene.registry.values.score += 1;
    this.scene.events.emit("scoreChanged");
  }
}
