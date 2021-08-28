export interface IClockConstructor {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
  frame?: string | number;
  prefix: string;
}

export interface IImageConstructor {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string | Phaser.Textures.Texture;
  frame?: string | number;
}
