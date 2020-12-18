export interface IBulletConstructor {
  scene: Phaser.Scene;
  bulletProperties: { speed: number };
  x: number;
  y: number;
  texture: string;
  frame?: string | number;
}
