export interface IBrickConstructor {
  scene: Phaser.Scene;
  value: number;
  x: number;
  y: number;
  texture: string;
  frame?: string | number;
}
