import { Bullet } from './bullet';
import { IImageConstructor } from '../interfaces/image.interface';

export class Player extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;

  // variables
  private health: number;
  private lastShoot: number;
  private speed: number;

  // children
  private barrel: Phaser.GameObjects.Image;
  private lifeBar: Phaser.GameObjects.Graphics;

  // game objects
  private bullets: Phaser.GameObjects.Group;
  private tween: Phaser.Tweens.Tween;

  // input
  private rotateKeyLeft: Phaser.Input.Keyboard.Key;
  private rotateKeyRight: Phaser.Input.Keyboard.Key;
  private moveKeyUp: Phaser.Input.Keyboard.Key;
  private moveKeyDown: Phaser.Input.Keyboard.Key;

  public getBullets(): Phaser.GameObjects.Group {
    return this.bullets;
  }

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    this.initImage();
    this.scene.add.existing(this);
  }

  private initImage() {
    // variables
    this.health = 1;
    this.lastShoot = 0;
    this.speed = 120;

    // image
    this.setOrigin(0.5, 0.5);
    this.setDepth(0);
    this.angle = 180;

    this.barrel = this.scene.add.image(this.x, this.y, 'barrelBlue');
    this.barrel.setOrigin(0.5, 1);
    this.barrel.setDepth(1);
    this.barrel.angle = 180;

    this.lifeBar = this.scene.add.graphics();
    this.redrawLifebar();

    // game objects
    this.bullets = this.scene.add.group({
      /*classType: Bullet,*/
      active: true,
      maxSize: 10,
      runChildUpdate: true
    });

    // input
    this.rotateKeyLeft = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.rotateKeyRight = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
    this.moveKeyUp = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this.moveKeyDown = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );

    // physics
    this.scene.physics.world.enable(this);
    // input mouse
    this.initHandleInput();
  }
  private initHandleInput(){
    this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer)=>{
      // rotate barrel
      this.barrel.angle =(Phaser.Math.Angle.Between(
        this.body.x,
        this.body.y,
        pointer.worldX,
        pointer.worldY
      ) + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
    }, this);

    this.scene.input.on('pointerup', function () {
      this.handleShooting();
    }, this);
    
  }
  update(): void {
    // console.log('player: ' +  this.angle);
    
    if (this.active) {
      this.barrel.x = this.x;
      this.barrel.y = this.y;
      this.lifeBar.x = this.x;
      this.lifeBar.y = this.y;
      this.handleInput();
    } else {
      this.destroy();
      this.barrel.destroy();
      this.lifeBar.destroy();
    }
  }

  private handleInput() {
    // move tank forward
    // small corrections with (- MATH.PI / 2) to align tank correctly
    var angle: number|null;
    this.body.setVelocity(0);

    // rotate tank
    if (this.rotateKeyLeft.isDown) {
      this.body.setVelocityX(-this.speed)
    } else if (this.rotateKeyRight.isDown) {
      if(this.angle == -180)
        this.angle  =179;
        this.body.setVelocityX(this.speed)
    }else{
      this.body.setVelocityX(0);
    }

    if (this.moveKeyUp.isDown) {
      this.body.setVelocityY(-this.speed)
    } else if (this.moveKeyDown.isDown) {
      this.body.setVelocityY(this.speed);
    }else{
      this.body.setVelocityY(0);
    }


    // angle
    var angleOfVelocity = this.body.velocity.angle()*Phaser.Math.RAD_TO_DEG;
    console.log(angleOfVelocity);
    if(angleOfVelocity>=90)
      angle = angleOfVelocity - 270;
    else {
      angle = angleOfVelocity + 90;
    }

    if((!this.tween || !this.tween.isPlaying()) && angle!=null && (this.body.velocity.x != 0 || this.body.velocity.y != 0)){
      if(this.angle == 90 && angle == -180)
        angle = 180;
      var duration = Math.abs(this.angle - angle) / 90 * 350;
      // console.log("duration",duration, this.body.velocity);
      this.tween = this.scene.tweens.add({
        targets: this,
        angle: angle,
        ease: 'Sine.easeInOut',
        duration: duration,
        yoyo: false,
        repeat: 0,
      });
    }
  }

  private handleShooting(): void {
    if (this.scene.time.now > this.lastShoot) {
      this.scene.cameras.main.shake(20, 0.005);
      this.scene.tweens.add({
        targets: this,
        props: { alpha: 0.8 },
        delay: 0,
        duration: 5,
        ease: 'Power1',
        easeParams: null,
        hold: 0,
        repeat: 0,
        repeatDelay: 0,
        yoyo: true,
        paused: false
      });

      if (this.bullets.getLength() < 10) {
        this.bullets.add(
          new Bullet({
            scene: this.scene,
            rotation: this.barrel.rotation,
            x: this.barrel.x,
            y: this.barrel.y,
            texture: 'bulletBlue'
          })
        );

        this.lastShoot = this.scene.time.now + 80;
      }
    }
  }

  private redrawLifebar(): void {
    this.lifeBar.clear();
    this.lifeBar.fillStyle(0xe66a28, 1);
    this.lifeBar.fillRect(
      -this.width / 2,
      this.height / 2,
      this.width * this.health,
      15
    );
    this.lifeBar.lineStyle(2, 0xffffff);
    this.lifeBar.strokeRect(-this.width / 2, this.height / 2, this.width, 15);
    this.lifeBar.setDepth(1);
  }

  public updateHealth(): void {
    if (this.health > 0) {
      this.health -= 0.05;
      this.redrawLifebar();
    } else {
      this.health = 0;
      this.active = false;
      // this.scene.scene.start('GameOverScene');
      this.scene.scene.pause();
      this.scene.scene.launch('GameOverScene');
    }
  }
}
