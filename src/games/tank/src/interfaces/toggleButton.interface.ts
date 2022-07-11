export interface IToggleButtonConstructor {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
  frame?: string | number;
  numberOfFrames: number;
  soundPress: string;
}
