export class Healthpack extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.setOrigin(0.5, 0.5);

    this.scene.physics.world.enable(this);
    this.setSize(25, 29);
    this.body.setVelocityY(10);

    this.scene.tweens.add({
      targets: this,
      props: { rotation: -0.2, x: this.x + 4 },
      duration: 1000,
      ease: "Sine",
      yoyo: true,
      repeat: -1,
    });

    this.scene.add.existing(this);
  }
}
