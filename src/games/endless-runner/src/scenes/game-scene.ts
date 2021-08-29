import { settings } from '../settings';

export class GameScene extends Phaser.Scene {
  private player: Phaser.GameObjects.Rectangle;
  private towers: Phaser.GameObjects.Group;
  private isPlayerJumping: boolean;
  private loadingBar: Phaser.GameObjects.Rectangle;
  private loadingBarTween: Phaser.Tweens.Tween;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(): void {
    this.isPlayerJumping = false;
    settings.createTowerXPosition = 0;
  }

  create(): void {
    this.loadingBar = this.add
      .rectangle(
        0,
        this.game.canvas.height - settings.BLOCK_WIDTH,
        0,
        settings.BLOCK_WIDTH,
        0xff2463
      )
      .setOrigin(0)
      .setDepth(2);
    this.loadingBarTween = this.tweens
      .add({
        targets: this.loadingBar,
        props: {
          width: {
            value: this.game.canvas.width,
            duration: 1000,
            ease: 'Power0'
          }
        },
        yoyo: true,
        repeat: -1
      })
      .pause();

    this.towers = this.add.group();

    for (let i = 0; i < settings.MAX_ACTIVE_TOWERS; i++) {
      this.spawnNewTower();

      if (i == 0) {
        this.player = this.add
          .rectangle(
            settings.createTowerXPosition,
            0,
            settings.BLOCK_WIDTH,
            settings.BLOCK_WIDTH,
            0xff2463
          )
          .setOrigin(0);

        this.physics.world.enable(this.player);
      }
    }

    // add colliders
    this.physics.add.collider(
      this.player,
      this.towers,
      this.playerTowerCollision,
      null,
      this
    );

    // setup input
    this.input.on(
      'pointerdown',
      () => {
        if (!this.isPlayerJumping) {
          this.loadingBarTween.restart();
        }
      },
      this
    );
    this.input.on('pointerup', this.playerJump, this);

    // setup camera
    this.cameras.main.setBounds(
      0,
      0,
      +this.game.config.width,
      +this.game.config.height
    );
    this.cameras.main.startFollow(this.player);
  }

  update(): void {
    this.towers.getChildren().forEach((tower) => {
      const towerBody = tower.body as Phaser.Physics.Arcade.Body;
      if (this.isPlayerJumping) {
        towerBody.setVelocityX(settings.SCROLLING_SPEED_X_AXIS);
      } else {
        towerBody.setVelocityX(0);
      }

      if (towerBody.position.x < 0) {
        this.spawnNewTower();
        tower.destroy();
      }
    }, this);

    if (this.player.y > this.game.config.height) {
      this.scene.start('GameScene');
    }
  }

  private spawnNewTower(): void {
    const spacingBeforeTower = Phaser.Math.RND.between(
      settings.SPACING.MIN,
      settings.SPACING.MAX
    );

    settings.createTowerXPosition += spacingBeforeTower * settings.BLOCK_WIDTH;

    const towerHeight = Phaser.Math.RND.between(
      settings.TOWER_PROPERTIES.HEIGHT.MIN,
      settings.TOWER_PROPERTIES.HEIGHT.MAX
    );

    const newTower = this.add
      .rectangle(
        settings.createTowerXPosition,
        +this.game.config.height - towerHeight,
        settings.BLOCK_WIDTH,
        towerHeight,
        settings.TOWER_PROPERTIES.COLOR
      )
      .setOrigin(0);

    // add physics to tower
    this.physics.world.enable(newTower);
    const towerBody = newTower.body as Phaser.Physics.Arcade.Body;
    towerBody.setImmovable(true);
    towerBody.setAllowGravity(false);

    // add tower to group
    this.towers.add(newTower);
  }

  private playerJump(): void {
    if (!this.isPlayerJumping) {
      const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
      playerBody.setVelocityY(-this.loadingBar.width);
      this.isPlayerJumping = true;
      this.loadingBarTween.stop();
      this.loadingBar.width = 0;
    }
  }

  private playerTowerCollision(player: any, tower: any): void {
    if (tower.body.touching.up) {
      player.body.setVelocity(0);
      this.isPlayerJumping = false;
    }
  }
}
