import { Player } from '../objects/player';
import { Enemy } from '../objects/enemy';
import { Obstacle } from '../objects/obstacles/obstacle';
import { Bullet } from '../objects/bullet';
import { ButtonMenu } from '../objects/button/normalButton/buttonMenu';
import SceneKeys from '../consts/SceneKeys';

export class GameScene extends Phaser.Scene {
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private layer: Phaser.Tilemaps.TilemapLayer;

  private player: Player;
  private enemies: Phaser.GameObjects.Group;
  private obstacles: Phaser.GameObjects.Group;
  private TextScore!: Phaser.GameObjects.Text;

  private target: Phaser.Math.Vector2;
  private btn_menu!: ButtonMenu;
  private zone!: Phaser.GameObjects.Zone;

  // audio
  private audioBattle: Phaser.Sound.BaseSound;

  constructor() {
    super({
      key: SceneKeys.GameScene
    });
    
  }

  init(): void {
  }

  create(): void {
    
    this.initAudio();

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
    this.handlePhysics();
    this.cameras.main.startFollow(this.player);

    this.createUI();
    
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

    if(!this.registry.get('muteMusic')&&!this.audioBattle.isPlaying){
      if(this.audioBattle.isPaused)
        this.audioBattle.resume();
      else  
        this.audioBattle.play();
    }
    else if(this.registry.get('muteMusic')&&this.audioBattle.isPlaying){
      this.audioBattle.pause();
      console.log('Audio is paused',this.audioBattle.isPaused);
    }

  }

  private initAudio() {
    this.audioBattle = this.sound.add('battle');
  }

  private createUI(){
    this.btn_menu = new ButtonMenu({
      scene: this,
      x: 0,
      y: 0,
      texture: "btn-menu",
      soundPress: 'click',
    }).setScrollFactor(0);

    this.TextScore = this.add.text(0, 0, `Score: ${this.registry.get('score')}`, {
			fontFamily: 'Quicksand',
			fontSize: '48px',
			color: '#fff'
		}).setScrollFactor(0)
      .setOrigin(0, 0);
    
    this.zone = this.add.zone(this.cameras.main.width/2, this.cameras.main.height / 2, this.cameras.main.width - 10*4, this.cameras.main.height-10*2)
    Phaser.Display.Align.In.TopLeft(
      this.btn_menu,
      this.zone
    );
    
    Phaser.Display.Align.In.TopRight(
      this.TextScore,
      this.zone
    );
    this.TextScore.setX(this.TextScore.x -25)
  }

  private handlePhysics(){
    // collider layer and obstacles
    this.physics.add.collider(this.player, this.layer);
    this.physics.add.collider(this.player, this.obstacles);

    // collider for bullets
    this.physics.add.collider(
      this.player.getBullets(),
      this.layer,
      (obj1, obj2) => this.bulletHitLayer(obj1 as Bullet),
      null,
      this
    );

    this.physics.add.collider(
      this.player.getBullets(),
      this.obstacles,
      (obj1, obj2) =>this.bulletHitObstacles(obj1 as Bullet, obj2 as Obstacle),
      null,
      this
    );

    this.enemies.children.each((enemy: Enemy) => {
      this.physics.add.collider(
        this.player.getBullets(),
        enemy,
        (obj1, obj2) =>this.playerBulletHitEnemy(obj1 as Bullet, obj2 as Enemy),
        null,
        this
      );
      this.physics.add.overlap(
        enemy.getBullets(),
        this.player,
        (obj1, obj2)=>this.enemyBulletHitPlayer(obj1 as Bullet, obj2 as Player),
        null
      );

      this.physics.add.collider(
        enemy.getBullets(),
        this.obstacles,
        (obj1, obj2) =>this.bulletHitObstacles(obj1 as Bullet, obj2 as Obstacle),
        null
      );
      this.physics.add.collider(
        enemy.getBullets(),
        this.layer,
        (obj1, obj2)=>this.bulletHitLayer(obj1 as Bullet),
        null
      );
    }, this);
  }

  private initEvents() {
    this.events.on('pause', ()=>{
      if(this.input.mouse.locked)
        this.input.mouse.releasePointerLock();
      // pause audio
      this.audioBattle.pause();
      // set alpha
      this.setAlpha(0.2);
    })
    this.events.on('resume', () => {
      // set alpha
      this.setAlpha(1.0);
      console.log('Scene A resumed');
    })
    this.events.on('gameOver', () => {
      // set  audio
      this.audioBattle.pause();
      // set alpha
      this.setAlpha(0.2);
      this.enemies.getChildren().forEach((child)=>{
        const enemy = child as Enemy;
        enemy.setActive(false);
      })
    })
  }

  private setAlpha(alpha: number){
    this.layer.setAlpha(alpha);
    this.btn_menu.setAlpha(alpha);
    this.obstacles.setAlpha(alpha);
    this.player.setAlpha(alpha);
    // this.enemies.setAlpha(alpha);
    //set alpha enemies
    this.enemies.getChildren().forEach(child =>{
      const enemy = child as Enemy;
      enemy.setAlpha(alpha);
    })
    this.TextScore.setAlpha(alpha);
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
          texture: 'tankBlue',
          rateOfFire: 80,
        });
      } else if (object.type === 'enemy') {
        let enemy = new Enemy({
          scene: this,
          x: object.x,
          y: object.y,
          texture: 'tankRed',
          rateOfFire: 1000,
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
    this.createEmitter(bullet.x, bullet.y);

    bullet.destroyBullet();
  }

  private bulletHitObstacles(bullet: Bullet, obstacle: Obstacle): void {
    this.createEmitter(bullet.x, bullet.y);
    bullet.destroyBullet();
  }

  private enemyBulletHitPlayer(bullet: Bullet, player: Player): void {
    this.createEmitter(bullet.x, bullet.y);
    bullet.destroyBullet();
    player.updateHealth(bullet.getDamage());
  }

  private playerBulletHitEnemy(bullet: Bullet, enemy: Enemy): void {
    this.createEmitter(bullet.x, bullet.y);
    bullet.destroyBullet();
    this.updateScore();
    enemy.updateHealth(bullet.getDamage());
  }

  private createEmitter(x: number, y: number){
    var particlesBullet = this.add.particles('flares').createEmitter({
      frame: 'red',
      x: x,
      y: y,
      lifespan: 500,
      speed: { min: 400, max: 600 },
      angle: {min: 0, max: 360},
      scale: { start: 0.1, end: 0 },
      quantity: 2,
      blendMode: 'ADD',
    });

    this.time.delayedCall(150, ()=>{
      particlesBullet.remove();
    }, [], this)
  }

  private updateScore(){
    this.registry.set('score' ,this.registry.get('score')+1);
    this.TextScore.setText(`Score: ${this.registry.get('score')}`);
  }
}
