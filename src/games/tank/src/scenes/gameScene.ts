import { Player } from '../objects/Player';
import { Enemy } from '../objects/Enemy';
import { Obstacle } from '../objects/obstacles/Obstacle';
import { Bullet } from '../objects/Bullet';
import { MenuButton } from '../objects/button/normal-button/MenuButton';
import SceneKeys from '../consts/SceneKeys';
import EventKeys from '../consts/EventKeys';

export class GameScene extends Phaser.Scene {
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private layer: Phaser.Tilemaps.TilemapLayer;

  private player: Player;
  private enemies: Phaser.GameObjects.Group;
  private obstacles: Phaser.GameObjects.Group;
  private textScore!: Phaser.GameObjects.Text;

  private buttonMenu!: MenuButton;
  private zone!: Phaser.GameObjects.Zone;

  // audio
  private audioBattle: Phaser.Sound.BaseSound;
  private audioPlayerShooter: Phaser.Sound.BaseSound;
  private audioPlayerDeath: Phaser.Sound.BaseSound;
  private audioEnemyDeath: Phaser.Sound.BaseSound;

  constructor() {
    super({
      key: SceneKeys.GAME_SCENE
    });
    
  }

  init(): void {
  }

  create(): void {
    
    this.initAudio();
    this.createUI();
    this.createMap();
    this.initEnemies();
    this.initObstacles();
    this.createObjects();
    this.handlePhysics();
    this.initListenEvents();
    this.setUpCameraFollowPlayer();
  }

  update(): void {
    this.player.update();
    this.updateEnemys();
  }

  private initAudio() {
    this.audioBattle = this.sound.add('battle');
    this.audioBattle.play();
    this.audioPlayerShooter = this.sound.add('player-shooter');
    this.audioPlayerDeath = this.sound.add('player-death');
    this.audioEnemyDeath = this.sound.add('enemy-death');
  }

  private createUI(){
    const camerasWidth= this.cameras.main.width;
    const camerasHeight= this.cameras.main.height;

    this.buttonMenu = new MenuButton({
      scene: this,
      x: 0,
      y: 0,
      texture: "btn-menu",
      soundPress: 'click',
    }).setScrollFactor(0);

    this.textScore = this.add.text(
      0, 
      0, 
      `Score: ${this.registry.get('score')}`, 
      {
			fontFamily: 'Quicksand',
			fontSize: '48px',
			color: '#fff'
		  }
    )
      .setScrollFactor(0)
      .setOrigin(0, 0);
    
    this.zone = this.add.zone(
      camerasWidth/2, 
      camerasHeight  / 2, 
      camerasWidth - 40, 
      camerasHeight - 20
    )
    Phaser.Display.Align.In.TopLeft(
      this.buttonMenu,
      this.zone
    );
    
    Phaser.Display.Align.In.TopRight(
      this.textScore,
      this.zone
    );
    this.textScore.setX(this.textScore.x - 25)
  }

  private createMap(){
    // create tilemap from tiled JSON
    this.map = this.make.tilemap({ key: 'levelMap' });

    this.tileset = this.map.addTilesetImage('tiles');
    this.layer = this.map.createLayer('tileLayer', this.tileset, 0, 0);
    this.layer.setCollisionByProperty({ collide: true });
  }

  private initEnemies(){
    this.enemies = this.add.group({
      /*classType: Enemy*/
    });
  }

  private initObstacles(){
    this.obstacles = this.add.group({
      /*classType: Obstacle,*/
      runChildUpdate: true
    });
  }

  private setUpCameraFollowPlayer(){
    this.cameras.main.startFollow(this.player);
  }

  private handlePhysics(){

    this.physics.world.setBounds(
      0, 
      0, 
      this.layer.width, 
      this.layer.height
    );

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
    
    this.physics.add.collider(
      this.player.getBullets(),
      this.enemies,
      (obj1, obj2) =>this.playerBulletHitEnemy(obj1 as Bullet, obj2 as Enemy),
      null,
      this
    );
    
    this.enemies.children.each((enemy: Enemy) => {
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

  private initListenEvents() {
    this.events.on('pause', ()=>{
      if(this.input.mouse.locked)
        this.input.mouse.releasePointerLock();
      // pause audio
      this.audioBattle.pause();
      this.scene.sendToBack();
    })
    
    this.events.on('resume', () => {
      if(!this.registry.get('muteMusic')&&!this.audioBattle.isPlaying){
        if(this.audioBattle.isPaused)
          this.audioBattle.resume();
        else  
          this.audioBattle.play();
      }
      else if(this.audioBattle.isPlaying && this.registry.get('muteMusic')){
        this.audioBattle.pause();
      }
    })

    this.events.on(EventKeys.PLAYER_SHOOTING,()=>{
      if(!this.registry.get('muteSound'))
        this.audioPlayerShooter.play();
    })

    this.events.on(EventKeys.PLAYER_DEATH,()=>{
      if(!this.registry.get('muteSound'))
        this.audioPlayerDeath.play();
    })

    this.events.on(EventKeys.ENEMY_DEATH,()=>{
      if(!this.registry.get('muteSound'))
        this.audioEnemyDeath.play();
    })

    this.events.on("start",()=>{
      this.removeListener();
    })

  }

  private removeListener(){
    this.events.removeListener(EventKeys.PLAYER_SHOOTING);
    this.events.removeListener(EventKeys.PLAYER_DEATH);
    this.events.removeListener('enemy_death');
  }


  private createObjects(): void {
    // find the object layer in the tilemap named 'objects'
    const objects = this.map.getObjectLayer('objects').objects as any[];

    objects.forEach((object) => {
      switch (object.type) {
        case "player": {
          this.player = this.createPlayer(object.x, object.y);
          break;
        }
        
        case "enemy":{
          let enemy = this.createEnemy(object.x, object.y);
          this.enemies.add(enemy);
          break;
        }
        
        default:{
          let obstacle = this.createObstacle(object.x, object.y, object.type);
          this.obstacles.add(obstacle);
          break;
        }
      }
    });
  }

  private createPlayer(x: number, y: number): Player {
    return new Player({
      scene: this,
      x: x,
      y: y,
      texture: 'tankBlue',
      rateOfFire: 80,
    });
  }

  private createEnemy(x: number, y: number): Enemy {
    return new Enemy({
      scene: this,
      x: x,
      y: y,
      texture: 'tankRed',
      rateOfFire: 1000,
    });
  }

  private createObstacle(x: number, y: number, texture: string): Obstacle {
    return new Obstacle({
      scene: this,
      x: x,
      y: y - 40,
      texture: texture
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
    var particlesBullet = this.add.particles('flares')
      .createEmitter({
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
    this.textScore.setText(`Score: ${this.registry.get('score')}`);
  }

  private updateEnemys(){
    this.enemies.children.each((enemy: Enemy) => {
      enemy.update(this.player);
    }, this);
  }
}
