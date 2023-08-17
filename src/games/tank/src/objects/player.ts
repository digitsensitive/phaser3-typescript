import { CONST } from '../consts/const';
import EventKeys from '../consts/EventKeys';
import SceneKeys from '../consts/SceneKeys';
import { Bullet } from './Bullet';

export class Player extends Phaser.GameObjects.Container {
  body: Phaser.Physics.Arcade.Body;
  // variables
  private health: number;
  private nextShoot: number;
  private speed: number;
  private texture: string;
  private rateOfFire: number;

  // children
  private barrel: Phaser.GameObjects.Image;
  private lifeBar: Phaser.GameObjects.Graphics;
  private tank: Phaser.GameObjects.Image;
  
  // game objects
  private bullets: Phaser.GameObjects.Group;
  private cursor: Phaser.GameObjects.Image;

  // input
	private moveKeyLeft: Phaser.Input.Keyboard.Key;
	private moveKeyRight: Phaser.Input.Keyboard.Key;
	private moveKeyUp: Phaser.Input.Keyboard.Key;
	private moveKeyDown: Phaser.Input.Keyboard.Key;

  constructor(aParams: ITankConstructor) {
    super(aParams.scene, aParams.x, aParams.y);
    this.texture = aParams.texture;
    this.rateOfFire = aParams.rateOfFire;

    this.initVariables();
    this.initContainer();
    // input mouse
    this.initHandleInput();

    this.scene.add.existing(this);
    // set body of container
    this.body.setOffset(-this.tank.width/2, -this.tank.height/2);
    this.body.setSize(this.tank.width, this.tank.height);
  }

  update(): void {
    if (this.active) {
      if (!this.scene.input.mouse.locked){
        this.cursor.setVisible(false);
      }
      this.rotateBarrelFollowMoune();
      this.moveCurosrFollowPlayer();
      this.handleInput();

    } else {
      this.destroy();
      this.barrel.destroy();
      this.lifeBar.destroy();
    }
  }

  public getBullets(): Phaser.GameObjects.Group {
    return this.bullets;
  }

  public updateHealth(damage: number): void {
    this.initTweenDamage(damage);

    if (this.health > 0) {
      this.health -= damage;
      this.redrawLifebar();
    } else {
      this.scene.events.emit(EventKeys.PLAYER_DEATH);
      this.health = 0;
      this.active = false;
      this.cursor.setVisible(false);

      // pause current scene and show scene game over
      this.scene.scene.pause();
      this.scene.scene.launch(SceneKeys.GAME_OVER_SCENE);
      this.scene.scene.bringToTop(SceneKeys.GAME_OVER_SCENE);
    }
  }
  
  private initVariables(){
    // variables
    this.health = 1;
    this.nextShoot = 0;
    this.speed = CONST.TANK_SPEED;
  }

  private initContainer() {
    
    // image
    this.tank = this.scene.physics.add.image(0, 0, this.texture);
    this.tank.angle = 180;
    
    this.barrel = this.scene.add.image(0, 0, 'barrelBlue')
      .setOrigin(0.5, 1)
    this.barrel.angle = 180;

    this.cursor = this.scene.physics.add.image(this.x, this.y, 'curosr')
      .setCollideWorldBounds(true)
      .setDisplaySize(64,64)
      .setDepth(2)

    this.lifeBar = this.scene.add.graphics();
    this.redrawLifebar();

    // add objects to container
    this.add([
      this.tank, 
      this.lifeBar, 
      this.barrel
    ]);

    // game objects
    this.bullets = this.scene.add.group({
      /*classType: Bullet,*/
      active: true,
      maxSize: 10,
      runChildUpdate: true
    });

    // physics
    this.scene.physics.world.enable(this);
  }

  private initHandleInput(){
    // input
    this.moveKeyLeft = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.moveKeyRight = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
    this.moveKeyUp = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this.moveKeyDown = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );

    this.scene.input.on(Phaser.Input.Events.POINTER_MOVE, 
      (pointer: Phaser.Input.Pointer)=>{
        this.cursor.x += pointer.movementX;
        this.cursor.y += pointer.movementY;
      }, this);

    this.scene.input.on(Phaser.Input.Events.POINTER_DOWN, 
      (pointer: Phaser.Input.Pointer)=>{
        if (this&&!this.scene?.input.mouse.locked){
          this.cursor.setVisible(true);
          this.scene.game.input.mouse.requestPointerLock();
        }
        else this.shooting();
     }, this); 

    // using unblock mouse
    this.scene.input.keyboard.on('keydown-SPACE', 
      ()=>{
        if (this.scene.input.mouse.locked){
          this.scene.input.mouse.releasePointerLock();
          this.cursor.setVisible(false);
        }
      });

    // when player continue playing
    this.scene.events.on('resume', 
      () => {
        this.cursor.setVisible(true);
      })
  }

  private rotateBarrelFollowMoune(){
    this.barrel.rotation = Phaser.Math.Angle.Between(
      this.x, 
      this.y, 
      this.cursor.x, 
      this.cursor.y
      )
      + Math.PI/2;
  }

  private moveCurosrFollowPlayer() {
    // move cursor
    var bodyCurosr = this.cursor.body as Phaser.Physics.Arcade.Body;
    bodyCurosr.setVelocity(this.body.velocity.x, this.body.velocity.y)
  }

  private handleInput() {
    // move tank forward
    // small corrections with (- MATH.PI / 2) to align tank correctly
    if (this.moveKeyUp.isDown) {
      this.scene.physics.velocityFromRotation(
        this.tank.rotation - Math.PI / 2,
        this.speed,
        this.body.velocity
      );
    } 
    else if (this.moveKeyDown.isDown) {
      this.scene.physics.velocityFromRotation(
        this.tank.rotation - Math.PI / 2,
        -this.speed,
        this.body.velocity
      );
    } 
    else {
      this.body.setVelocity(0, 0);
    }

    // rotate tank
    if (this.moveKeyLeft.isDown) {
      this.tank.rotation -= 0.02;
    } 
    else if (this.moveKeyRight.isDown) {
      this.tank.rotation += 0.02;
    }
  }

  private shooting(): void {
    if (this.scene.time.now > this.nextShoot) {
      this.scene.events.emit(EventKeys.PLAYER_SHOOTING);
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
        this.nextShoot = this.scene.time.now + this.rateOfFire;
      }

    }
  }

  private createTweenWhenShooting() {    
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
    this.lifeBar.strokeRect(
      -this.tank.width / 2, 
      this.tank.height / 2, 
      this.tank.width, 15
    );
    this.lifeBar.setDepth(1);
  }

  private initTweenDamage(damage: number): void {
    const xTextHealth = Phaser.Math.Between(this.x - 30, this.x + 30)
    const yTextHealth = this.y;
    const textDamage  = this.scene.add.text(
      xTextHealth, 
      yTextHealth, 
      `-${damage*100/5}`, 
      {
			fontFamily: 'Bangers',
			fontSize: '50px',
			color: '#4A90E2',
		  }
    )
      .setOrigin(0.5, 0.5);

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
}
