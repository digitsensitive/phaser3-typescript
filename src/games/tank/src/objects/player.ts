import BaseState from '../states/baseState';
import DownLeftState from '../states/downLeftState';
import DownState from '../states/downState';
import LeftState from '../states/leftState';
import LeftUpState from '../states/leftUpState';
import RightDownState from '../states/rightDownState';
import RightState from '../states/rightSate';
import UpRightState from '../states/upRightState';
import UpState from '../states/upState';
import { Bullet } from './bullet';

export class Player extends Phaser.GameObjects.Container {
  body: Phaser.Physics.Arcade.Body;
  // variables
  private health: number;
  private lastShoot: number;
  private speed: number;
  private texture: string;
  private rateOfFire: number;

  // children
  private barrel: Phaser.GameObjects.Image;
  private lifeBar: Phaser.GameObjects.Graphics;
  private tank: Phaser.GameObjects.Image;
  
  // game objects
  private bullets: Phaser.GameObjects.Group;
  private tween: Phaser.Tweens.Tween;
  private curosr: Phaser.GameObjects.Image;
  private currentState!: BaseState

  // audio 
  private audioPlayerShooter: Phaser.Sound.BaseSound;
  private audioPlayerDeath: Phaser.Sound.BaseSound;

  public getBullets(): Phaser.GameObjects.Group {
    return this.bullets;
  }

  public getTank(){
    return this.tank;
  }

  public getSpeed(){
    return this.speed;
  }

  public getTween(){
    return this.tween;
  }

  public setTween(tween: Phaser.Tweens.Tween){
    this.tween = tween;
  }

  public setCurrentState(state: string) {
    switch (state) {
      case "Down": {
        console.log("Down state");
        this.currentState = new DownState(this)
        break
      }
      case "DownLeft": {
        console.log("Down state left");
        this.currentState = new DownLeftState(this)
        break
      }
      case "Left": {
        console.log("LeftState  ");
        this.currentState = new LeftState(this)
        break
      }
      case "LeftUp": {
        console.log("LeftUpState");
        this.currentState = new LeftUpState(this)
        break
      }
      case "Up": {
        console.log("UpState")
        this.currentState = new UpState(this)
        break
      }
      case "UpRight": {
        console.log("UpRightState")
        this.currentState = new UpRightState(this)
        break
      }
      case "Right": {
        console.log("Right")
        this.currentState = new RightState(this)
        break
      }
      case "RightDown": {
        console.log("RightDownState")
        this.currentState = new RightDownState(this)
        break
      }
      case "Down": {
        console.log("DownState");
        this.currentState = new DownState(this)
        break
      }
    }
}

  constructor(aParams: ITankConstructor) {
    super(aParams.scene, aParams.x, aParams.y);
    this.texture = aParams.texture;
    this.rateOfFire = aParams.rateOfFire;

    this.initAudio();
    this.initContainer();
    // input mouse
    this.initHandleInput();

    this.scene.add.existing(this);
    // set body of container
    this.body.setOffset(-this.tank.width/2, -this.tank.height/2);
    this.body.setSize(this.tank.width, this.tank.height);
  }
  
  private initAudio(){
    this.audioPlayerShooter = this.scene.sound.add('player-shooter');
    this.audioPlayerDeath = this.scene.sound.add('player-death');
  }

  private initContainer() {
    // variables
    this.health = 1;
    this.lastShoot = 0;
    this.speed = 200;

    // image
    this.tank = this.scene.physics.add.image(0, 0, this.texture);
    this.tank.angle = 180;
    
    this.barrel = this.scene.add.image(0, 0, 'barrelBlue');
    this.barrel.setOrigin(0.5, 1);
    this.barrel.angle = 180;

    this.curosr = this.scene.physics.add.image(this.x, this.y, 'curosr')
      .setCollideWorldBounds(true)
      .setDisplaySize(64,64)
      .setDepth(2);

    this.lifeBar = this.scene.add.graphics();
    this.redrawLifebar();

    // add objects to container
    this.add([this.tank, this.lifeBar, this.barrel]);

    // game objects
    this.bullets = this.scene.add.group({
      /*classType: Bullet,*/
      active: true,
      maxSize: 10,
      runChildUpdate: true
    });

    // physics
    this.scene.physics.world.enable(this);
    this.currentState = new DownState(this)
    
  }

  private initHandleInput(){

    this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer)=>{
        this.curosr.x += pointer.movementX;
        this.curosr.y += pointer.movementY;
    }, this);

    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer)=>{
        if (this&&!this.scene?.input.mouse.locked){
          this.curosr.setVisible(true);
          this.scene.game.input.mouse.requestPointerLock();
        }
        else this.handleShooting();
    }, this);

    this.scene.input.keyboard.on('keydown-SPACE', ()=>{
      if (this.scene.input.mouse.locked){
        this.scene.input.mouse.releasePointerLock();
        this.curosr.setVisible(false);
      }
    });

    this.scene.events.on('resume', () => {
      this.curosr.setVisible(true);
    })
  }

  update(): void {
    if (this.active) {
      if (!this.scene.input.mouse.locked){
        this.curosr.setVisible(false);
      }
      // rotation barrel
      this.barrel.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.curosr.x, this.curosr.y)+ Math.PI/2;
      this.currentState.handleInput()
      this.moveCurosrFollowPlayer();

    } else {
      this.destroy();
      this.barrel.destroy();
      this.lifeBar.destroy();
    }
  }

  private moveCurosrFollowPlayer() {
    // move cursor
    var bodyCurosr = this.curosr.body as Phaser.Physics.Arcade.Body;
    bodyCurosr.setVelocity(this.body.velocity.x, this.body.velocity.y)
  }

  private handleShooting(): void {
    if (this.scene.time.now > this.lastShoot) {
      if(!this.scene.registry.get('muteSound'))
        this.audioPlayerShooter.play();
      this.scene.cameras.main.shake(20, 0.005);

      this.createTweenWhenShooting();

      if (this.bullets.getLength() < 10) {
        this.bullets.add(
          new Bullet({
            scene: this.scene,
            rotation: this.barrel.rotation,
            x: this.x,
            y: this.y,
            texture: 'bulletBlue',
            damage: 0.1
          })
        );
        this.lastShoot = this.scene.time.now + this.rateOfFire;
      }

    }
  }

  private createTweenWhenShooting() {
    this.scene.tweens.add({
      targets: this.barrel,
      scaleX: 1.2,
      scaleY: 0.9,
      duration: this.rateOfFire,
      yoyo: true,
    })
    
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
  }

  private redrawLifebar(): void {
    this.lifeBar.clear();
    this.lifeBar.fillStyle(0xe66a28, 1);
    this.lifeBar.fillRect(
      -this.tank.width / 2,
      this.tank.height / 2,
      this.tank.width * this.health,
      15
    );
    this.lifeBar.lineStyle(2, 0xffffff);
    this.lifeBar.strokeRect(-this.tank.width / 2, this.tank.height / 2, this.tank.width, 15);
    this.lifeBar.setDepth(1);
  }

  private initTweenDamage(damage: number): void {
    const xTextHealth = Phaser.Math.Between(this.x - 30, this.x + 30)
    const yTextHealth = this.y;
    const textDamage  = this.scene.add.text(xTextHealth, yTextHealth, `-${damage*100/5}`, {
			fontFamily: 'Bangers',
			fontSize: '50px',
			color: '#4A90E2',
		}).setOrigin(0.5, 0.5);

    this.scene.tweens.add({
      targets: textDamage,
      y: yTextHealth -100,
      ease: 'Power1',
      duration: 300,
      yoyo: false,
      repeat: 0,
      onComplete: ()=>{
        textDamage.destroy();
      }
    })
  }

  public updateHealth(damage: number): void {
    this.initTweenDamage(damage);

    if (this.health > 0) {
      this.health -= damage;
      this.redrawLifebar();
    } else {
      if(!this.scene.registry.get('muteSound'))
        this.audioPlayerDeath.play();
      this.health = 0;
      this.active = false;
      this.curosr.setVisible(false);

      // pause current scene and show scene game over
      this.scene.scene.pause();
      this.scene.scene.launch('GameOverScene');
      console.log('player is dead');
    }
  }

  // using when pause scene
  public setAlpha(value?: number): this {
    console.log('setAlpha player', value);
    super.setAlpha(value);
    if(this.bullets){
      this.bullets.getChildren().forEach(child => {
        const bullet = child as Bullet;
        bullet.setAlpha(value)
      });
    }
    return this;
  }
}
