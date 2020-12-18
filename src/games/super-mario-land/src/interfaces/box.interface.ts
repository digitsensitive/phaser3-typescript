export interface IBoxConstructor {
  scene: Phaser.Scene;
  content: any;
  x: number;
  y: number;
  texture: string;
  frame?: string | number;
}
