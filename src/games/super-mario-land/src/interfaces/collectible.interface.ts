export interface ICollectibleConstructor {
  scene: Phaser.Scene;
  points: number;
  x: number;
  y: number;
  texture: string;
  frame?: string | number;
}
