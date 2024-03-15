export interface ClockConstructor {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
  frame?: string | number;
  prefix: string;
}

export interface ImageConstructor {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string | Phaser.Textures.Texture;
  frame?: string | number;
}
