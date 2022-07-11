export interface IButtonConstructor {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
  frame?: string | number;
  soundPress: string;
}
