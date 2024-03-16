import { Redhat } from '../objects/redhat';

export class GameScene extends Phaser.Scene {
  private myRedhat: Redhat;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    this.load.image('redhat', '../assets/redhat.png');
    this.load.image('redParticle', '../assets/red.png');
  }

  create(): void {
    const emitter = this.add.particles(0, 0, 'redParticle', {
      speed: 100,
      scale: { start: 0.5, end: 0 },
      blendMode: 'ADD'
    });

    this.myRedhat = new Redhat({
      scene: this,
      x: 400,
      y: 300,
      texture: 'redhat'
    });

    emitter.startFollow(this.myRedhat);
  }
}
