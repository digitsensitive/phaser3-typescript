import { settings } from '../settings';
import { Ball } from '../objects/ball';
import { Clock } from '../objects/clock';

export class GameScene extends Phaser.Scene {
  private canFire: boolean;
  private clocksReached: number;
  private numberClocks: number;

  private activeClock: Clock;
  private ball: Ball;
  private clocksArray: Clock[];

  private handGroup: Phaser.GameObjects.Group;
  private clockGroup: Phaser.GameObjects.Group;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(): void {
    // variables
    this.canFire = true;
    this.clocksReached = 1;
    this.numberClocks = 0;
  }

  create(): void {
    this.clocksArray = [];
    this.handGroup = this.add.group();
    this.clockGroup = this.add.group();

    for (
      let i = 0;
      i < settings.LEVELS[settings.currentLevel].TILED_OUTPUT.length;
      i++
    ) {
      switch (settings.LEVELS[settings.currentLevel].TILED_OUTPUT[i]) {
        // small clock
        case 1:
          this.clocksArray.push(
            this.placeClock(
              new Phaser.Math.Vector2(
                (i % settings.LEVEL_WIDTH_IN_TILES) * 2 + 1,
                Math.floor(i / settings.LEVEL_HEIGHT_IN_TILES) * 2 + 1
              ),
              'small'
            )
          );
          break;

        // big clock
        case 2:
          this.clocksArray.push(
            this.placeClock(
              new Phaser.Math.Vector2(
                (i % settings.LEVEL_WIDTH_IN_TILES) * 2 + 2,
                Math.floor(i / settings.LEVEL_HEIGHT_IN_TILES) * 2
              ),
              'big'
            )
          );
          break;
      }
    }

    this.activeClock = Phaser.Utils.Array.GetRandom(this.clocksArray);
    this.activeClock.hasActiveAppearance();

    // add the ball
    this.ball = new Ball({
      scene: this,
      x: +this.game.config.width / 2,
      y: +this.game.config.height / 2,
      texture: 'ball'
    });

    this.physics.world.on(
      'worldbounds',
      function () {
        this.scene.start('GameScene');
      },
      this
    );

    this.input.on('pointerdown', this.throwBall, this);

    this.physics.add.overlap(
      this.ball,
      this.clockGroup,
      this.handleOverlap,
      null,
      this
    );
  }

  update(): void {}

  private placeClock(
    clockCoordinates: Phaser.Math.Vector2,
    prefix: string
  ): Clock {
    const newClock = new Clock({
      scene: this,
      x: clockCoordinates.x * settings.GRID_SIZE_IN_PIXELS,
      y: clockCoordinates.y * settings.GRID_SIZE_IN_PIXELS,
      texture: prefix + 'clock',
      prefix: prefix
    });

    this.clockGroup.add(newClock);
    this.handGroup.add(newClock.getHandSprite());

    this.numberClocks++;

    return newClock;
  }

  private throwBall(): void {
    if (this.canFire) {
      this.canFire = false;

      const handAngle = this.activeClock.getCurrentHandRotation();

      this.ball.setX(this.activeClock.x);
      this.ball.setY(this.activeClock.y);
      this.ball.setVisible(true);

      const ballVelocity = this.physics.velocityFromRotation(
        handAngle,
        this.ball.getSpeed()
      );

      this.ball.body.setVelocity(ballVelocity.x, ballVelocity.y);

      this.activeClock.destroyHandSprite();
      this.activeClock.destroyFaceSprite();
      this.activeClock.destroy();
    }
  }

  // method to handle overlap between ball and clock
  private handleOverlap(ball: Ball, clock: Clock) {
    if (!this.canFire) {
      clock.hasActiveAppearance();
      this.activeClock = clock;
      this.ball.setVisible(false);
      this.ball.body.setVelocity(0, 0);
      this.clocksReached++;

      // are there more clocks to reach?
      if (this.clocksReached < this.numberClocks) {
        // we can fire again
        this.canFire = true;
      } else {
        // advance by one level
        settings.currentLevel =
          (settings.currentLevel + 1) % settings.LEVELS.length;

        // wait one second and a half, then restart the game
        this.time.addEvent({
          delay: 1500,
          callbackScope: this,
          callback: function () {
            this.scene.start('GameScene');
          }
        });
      }
    }
  }
}
