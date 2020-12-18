export interface IPlatformConstructor {
  scene: Phaser.Scene;
  tweenProps: any;
  x: number;
  y: number;
  texture: string;
  frame?: string | number;
}
