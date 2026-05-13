import { Frog } from '../objects/frog';
import { Car } from '../objects/car';

interface Lane {
  cars: Car[];
  spawnTimer: number;
  spawnDelay: number;
  speed: number;
  direction: number;
}

export class GameScene extends Phaser.Scene {
  private frog: Frog;
  private lanes: Lane[] = [];
  private levelText: Phaser.GameObjects.Text;
  private scoreText: Phaser.GameObjects.Text;
  private level: number = 1;
  private score: number = 0;
  private gameWidth: number = 320;
  private gameHeight: number = 480;
  private laneHeight: number = 40;
  private safeZone: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(): void {
    this.level = 1;
    this.score = 0;
  }

  create(): void {
    this.cameras.main.setBackgroundColor(0x1a1a2e);

    // Safe zone at top
    this.safeZone = this.add.image(this.gameWidth / 2, 20, 'safe-zone');
    this.safeZone.setDepth(1);

    // Create frog
    this.frog = new Frog({
      scene: this,
      x: this.gameWidth / 2,
      y: this.gameHeight - 40,
      texture: 'frog'
    });
    this.frog.setDepth(10);

    // Initialize lanes
    for (let i = 1; i < 11; i++) {
      this.lanes.push({
        cars: [],
        spawnTimer: 0,
        spawnDelay: Math.max(40 - this.level * 5, 20),
        speed: (2 + this.level * 0.5) * (i % 2 === 0 ? 1 : -1),
        direction: i % 2 === 0 ? 1 : -1
      });
    }

    // UI
    this.levelText = this.add
      .text(10, 10, `Level: ${this.level}`, {
        fontSize: '16px',
        color: '#ffff00',
        fontFamily: 'Arial'
      })
      .setDepth(20);

    this.scoreText = this.add
      .text(this.gameWidth - 10, 10, `Score: ${this.score}`, {
        fontSize: '16px',
        color: '#ffff00',
        fontFamily: 'Arial',
        align: 'right'
      })
      .setOrigin(1, 0)
      .setDepth(20);
  }

  update(): void {
    // Update frog
    this.frog.update();

    // Check if frog reached safe zone
    if (this.frog.y <= 40) {
      this.score += 100;
      this.level += 1;
      this.levelText.setText(`Level: ${this.level}`);
      this.scoreText.setText(`Score: ${this.score}`);
      this.scene.restart();
      return;
    }

    // Check if frog fell off
    if (this.frog.y >= this.gameHeight || this.frog.x < 0 || this.frog.x > this.gameWidth) {
      this.scene.start('MainMenuScene');
      return;
    }

    // Update lanes and cars
    for (let i = 0; i < this.lanes.length; i++) {
      const lane = this.lanes[i];
      const laneY = 40 + i * this.laneHeight;

      // Spawn cars
      lane.spawnTimer++;
      if (lane.spawnTimer > lane.spawnDelay) {
        lane.spawnTimer = 0;
        const startX = lane.direction > 0 ? -32 : this.gameWidth;
        const car = new Car({
          scene: this,
          x: startX,
          y: laneY,
          texture: 'car',
          speed: lane.speed
        });
        car.setDepth(5);
        lane.cars.push(car);
      }

      // Update cars
      for (let j = lane.cars.length - 1; j >= 0; j--) {
        const car = lane.cars[j];
        car.update();

        // Remove cars off screen
        if (
          (lane.direction > 0 && car.x > this.gameWidth + 32) ||
          (lane.direction < 0 && car.x < -32)
        ) {
          car.destroy();
          lane.cars.splice(j, 1);
        }

        // Check collision with frog
        if (this.checkCollision(this.frog, car)) {
          this.scene.start('MainMenuScene');
          return;
        }
      }
    }
  }

  private checkCollision(frog: Frog, car: Car): boolean {
    const frogBounds = frog.getBounds();
    const carBounds = car.getBounds();
    return Phaser.Geom.Rectangle.Overlaps(frogBounds, carBounds);
  }
}
