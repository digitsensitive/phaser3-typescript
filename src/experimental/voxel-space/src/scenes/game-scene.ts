export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    this.renderAlgorithm(
      new Phaser.Geom.Point(500, 500),
      50,
      120,
      120,
      300,
      800,
      600
    );
  }

  update(): void {}

  private renderAlgorithm(
    point: Phaser.Geom.Point,
    height: number,
    horizon: number,
    scaleHeight: number,
    distance: number,
    screenWidth: number,
    screenHeight: number
  ): void {
    // painter algorithm: draw from back to the front (high to low z coordinate)
    for (let z = distance; z > 0; z--) {
      // Find the line on the map (calculation corresponds to a field of view of 90°)
      const leftPoint = new Phaser.Geom.Point(-z + point.x, -z + point.y);
      const rightPoint = new Phaser.Geom.Point(z + point.x, -z + point.y);

      // segment the line
      const dx = (rightPoint.x - leftPoint.x) / screenWidth;

      // Raster line and draw a vertical line for each segment
      for (let i = 0; i < screenWidth; i++) {
        const heightOnScreen =
          height -
          (this.textures.getPixelAlpha(leftPoint.x, leftPoint.y, 'heightMap') /
            z) *
            scaleHeight +
          horizon;

        const pixelColor = this.textures.getPixel(
          leftPoint.x,
          leftPoint.y,
          'colorMap'
        );

        const color = Phaser.Display.Color.GetColor(
          pixelColor.red,
          pixelColor.green,
          pixelColor.blue
        );
        const line = this.add.line(0, 0, i, heightOnScreen, i, screenHeight);
        line.setFillStyle(color);

        leftPoint.x += dx;
      }
    }
  }
}
