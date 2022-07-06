import { Player } from '../objects/player';
import { Enemy } from '../objects/enemy';
import { Obstacle } from '../objects/obstacles/obstacle';
import { Bullet } from '../objects/bullet';
import { ButtonPause } from '../objects/Button/toggle-button/button-pause';
import { ButtonMenu } from '../objects/Button/normal-button/button-menu';

export class GameScene extends Phaser.Scene {
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private layer: Phaser.Tilemaps.TilemapLayer;

  private player: Player;
  private enemies: Phaser.GameObjects.Group;
  private obstacles: Phaser.GameObjects.Group;

  private target: Phaser.Math.Vector2;
  private btn_menu!: ButtonMenu;

  constructor() {
    super({
      key: 'GameScene'
    });
    
  }

  init(): void {
  }

  create(): void {
    
    // create tilemap from tiled JSON
    this.map = this.make.tilemap({ key: 'levelMap' });

    this.tileset = this.map.addTilesetImage('tiles');
    this.layer = this.map.createLayer('tileLayer', this.tileset, 0, 0);
    this.layer.setCollisionByProperty({ collide: true });

    this.obstacles = this.add.group({
      /*classType: Obstacle,*/
      runChildUpdate: true
    });

    this.enemies = this.add.group({
      /*classType: Enemy*/
    });
    this.convertObjects();
    this.physics.world.setBounds(0, 0, this.layer.width, this.layer.height);
    // collider layer and obstacles
    this.physics.add.collider(this.player, this.layer);
    this.physics.add.collider(this.player, this.obstacles);

    // collider for bullets
    this.physics.add.collider(
      this.player.getBullets(),
      this.layer,
      this.bulletHitLayer,
      null,
      this
    );

    this.physics.add.collider(
      this.player.getBullets(),
      this.obstacles,
      this.bulletHitObstacles,
      null,
      this
    );

    this.enemies.children.each((enemy: Enemy) => {
      this.physics.add.overlap(
        this.player.getBullets(),
        enemy,
        this.playerBulletHitEnemy,
        null,
        this
      );
      this.physics.add.overlap(
        enemy.getBullets(),
        this.player,
        this.enemyBulletHitPlayer,
        null
      );

      this.physics.add.collider(
        enemy.getBullets(),
        this.obstacles,
        this.bulletHitObstacles,
        null
      );
      this.physics.add.collider(
        enemy.getBullets(),
        this.layer,
        this.bulletHitLayer,
        null
      );
    }, this);

    this.cameras.main.startFollow(this.player);

    this.btn_menu = new ButtonMenu({
      scene: this,
      x: 0,
      y: 0,
      texture: "btn-menu",
    }).setScrollFactor(0);

    Phaser.Display.Align.In.TopLeft(
      this.btn_menu,
      this.add.zone(this.cameras.main.width/2+10, this.cameras.main.height / 2+10, this.cameras.main.width, this.cameras.main.height),
    );
    
    this.initEvents();
  }

  update(): void {
    this.player.update();

    this.enemies.children.each((enemy: Enemy) => {
      enemy.update();
      if (this.player.active && enemy.active) {
        var angle = Phaser.Math.Angle.Between(
          enemy.body.x,
          enemy.body.y,
          this.player.body.x,
          this.player.body.y
        );

        enemy.getBarrel().angle =
          (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
      }
    }, this);
  }

  private initEvents() {
    this.events.on('pause', ()=>{
      if(this.input.mouse.locked)
        this.input.mouse.releasePointerLock();
      // set alpha
      this.btn_menu.setAlpha(0.2);
      this.layer.setAlpha(0.2);
      this.obstacles.setAlpha(0.3);
      this.player.setAlpha(0.3);
      this.enemies.setAlpha(0.3);
    })
    this.events.on('resume', () => {
      // set alpha
      this.layer.setAlpha(1);
      this.btn_menu.setAlpha(1);
      this.obstacles.setAlpha(1);
      this.player.setAlpha(1);
      this.enemies.setAlpha(1);
      console.log('Scene A resumed');
    })
  }
  
  private convertObjects(): void {
    // find the object layer in the tilemap named 'objects'
    const objects = this.map.getObjectLayer('objects').objects as any[];

    objects.forEach((object) => {
      if (object.type === 'player') {
        this.player = new Player({
          scene: this,
          x: object.x,
          y: object.y,
          texture: 'tankBlue'
        });
      } else if (object.type === 'enemy') {
        let enemy = new Enemy({
          scene: this,
          x: object.x,
          y: object.y,
          texture: 'tankRed'
        });

        this.enemies.add(enemy);
      } else {
        let obstacle = new Obstacle({
          scene: this,
          x: object.x,
          y: object.y - 40,
          texture: object.type
        });

        this.obstacles.add(obstacle);
      }
    });
  }

  private bulletHitLayer(bullet: Bullet): void {
    if(bullet.scene){
      const particles = bullet.scene.add.particles('flares');
      var particlesBullet = particles.createEmitter({
        frame: 'red',
        x: bullet.x,
        y: bullet.y,
        lifespan: 500,
        speed: { min: 400, max: 600 },
        angle: {min: 0, max: 360},
        scale: { start: 0.1, end: 0 },
        quantity: 2,
        blendMode: 'ADD',
      });
      bullet.scene.time.delayedCall(150, ()=>{
        particles.destroy();
        particlesBullet.remove();
      }, [], this)
    }
    bullet.destroy();
  }

  private bulletHitObstacles(bullet: Bullet, obstacle: Obstacle): void {
    if(bullet.scene){
      const particles = bullet.scene.add.particles('flares');
      var particlesBullet = particles.createEmitter({
        frame: 'red',
        x: bullet.x,
        y: bullet.y,
        lifespan: 500,
        speed: { min: 400, max: 600 },
        angle: {min: 0, max: 360},
        scale: { start: 0.1, end: 0 },
        quantity: 2,
        blendMode: 'ADD',
      });
      bullet.scene.time.delayedCall(150, ()=>{
        particles.destroy();
        particlesBullet.remove();
      }, [], this)
    }
    bullet.destroy();
  }

  private enemyBulletHitPlayer(bullet: Bullet, player: Player): void {
    if(bullet.scene){
      const particles = bullet.scene.add.particles('flares');
      var particlesBullet = particles.createEmitter({
        frame: 'red',
        x: bullet.x,
        y: bullet.y,
        lifespan: 500,
        speed: { min: 400, max: 600 },
        angle: {min: 0, max: 360},
        scale: { start: 0.1, end: 0 },
        quantity: 2,
        blendMode: 'ADD',
      });
      bullet.scene.time.delayedCall(150, ()=>{
        particles.destroy();
        particlesBullet.remove();
      }, [], this)
    }
    bullet.destroy();
    player.updateHealth();
  }

  private playerBulletHitEnemy(bullet: Bullet, enemy: Enemy): void {
    if(bullet.scene){
      const particles = bullet.scene.add.particles('flares');
      var particlesBullet = particles.createEmitter({
        frame: 'red',
        x: bullet.x,
        y: bullet.y,
        lifespan: 500,
        speed: { min: 400, max: 600 },
        angle: {min: 0, max: 360},
        scale: { start: 0.1, end: 0 },
        quantity: 2,
        blendMode: 'ADD',
      });
      bullet.scene.time.delayedCall(150, ()=>{
        particles.destroy();
        particlesBullet.remove();
      }, [], this)
    }
    bullet.destroy();
    enemy.updateHealth();
  }
}
