import EventKeys from "../consts/EventKeys";
import { Bullet } from "./Bullet";
import { Player } from "./Player";

export class Enemy extends Phaser.GameObjects.Container {
  body: Phaser.Physics.Arcade.Body;

  // variables
  private health: number;
  private nextShoot: number;
  private texture: string;
  private rateOfFire: number;

  // children
  private barrel: Phaser.GameObjects.Image;
  private lifeBar: Phaser.GameObjects.Graphics;
  private tank: Phaser.GameObjects.Image;
  
  // game objects
  private bullets: Phaser.GameObjects.Group;

  constructor(aParams: ITankConstructor) {
    super(aParams.scene, aParams.x, aParams.y);

    this.texture = aParams.texture;
    this.rateOfFire = aParams.rateOfFire;

    this.initVariables();
    this.initContainer();
    this.moveEnemy();
    this.scene.add.existing(this);
  }

  update(player: Player) : void {
    if (player.active && this.active) {
      this.shooting();

      var angle = Phaser.Math.Angle.Between(
        this.body.x,
        this.body.y,
        player.body.x,
        player.body.y
      );

      this.getBarrel().angle =
        (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;

    } else {
      this.destroy();
      this.barrel.destroy();
      this.lifeBar.destroy();
    }
  }

  public getBarrel(): Phaser.GameObjects.Image {
    return this.barrel;
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
      this.scene.events.emit(EventKeys.ENEMY_DEATH)
      this.health = 0;
      // particles
      this.initParticlesDeath();
      this.active = false;
    }
  }

  private initVariables(){
    // variables
    this.health = 1;
    this.nextShoot = 0;
  }

  private initContainer() {
    // image
    this.tank = this.scene.physics.add.image(0, 0, this.texture)
      .setImmovable(true);
    this.body = this.tank.body as Phaser.Physics.Arcade.Body;

    this.barrel = this.scene.add.image(0, 0, 'barrelRed');
    this.barrel.setOrigin(0.5, 1);
    this.barrel.setDepth(1);
    
    this.lifeBar = this.scene.add.graphics();
    this.redrawLifebar();

    // add objects to container
    this.add([
      this.tank, 
      this.lifeBar, 
      this.barrel
    ]);

    // game objects
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

  private moveEnemy(){
    // tweens
    this.scene.tweens.add({
      targets: this,
      props: { y: this.y - 200 },
      delay: 0,
      duration: 2000,
      ease: 'Linear',
      easeParams: null,
      hold: 0,
      repeat: -1,
      repeatDelay: 0,
      yoyo: true
    });
  }

  private shooting(): void {
    if (this.scene.time.now > this.nextShoot) {
      if (this.bullets.getLength() < 10) {
        this.bullets.add(
          new Bullet({
            scene: this.scene,
            rotation: this.barrel.rotation,
            x: this.x,
            y: this.y,
            texture: 'bulletRed',
            damage: 0.05
          })
        );
        this.nextShoot = this.scene.time.now + this.rateOfFire;
      }
    }
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
    const yTextHealth = this.y
    const textHealth = this.scene.add.text(xTextHealth, yTextHealth, `-${damage*100/5}`, {
			fontFamily: 'Bangers',
			fontSize: '50px',
			color: '#B21E1E',
		}).setOrigin(0.5, 0.5);

    this.scene.tweens.add({
      targets: textHealth,
      y: yTextHealth -100,
      ease: 'Power1',
      duration: 300,
      yoyo: false,
      repeat: 0,
      onComplete: ()=>{
        textHealth.destroy();
      }
    })
  }

  private initParticlesDeath(){
    const zone = new Phaser.Geom.Rectangle(-32, -32, 64, 64);
    const particles = this.scene.add.particles('fire');
    particles.createEmitter({
        alpha: { start: 1, end: 0 },
        scale: { start: 0.5, end: 2.5 },
        speed: 20,
        accelerationY: -300,
        angle: { min: -85, max: -95 },
        rotate: { min: -180, max: 180 },
        lifespan: { min: 1000, max: 1100 },
        frequency: 110,
        maxParticles: 10,
        x: this.x,
        y: this.y,
        emitZone: {
          type: 'random' , 
          source: zone, 
          quantity: 10
        }
    });
  }
}
