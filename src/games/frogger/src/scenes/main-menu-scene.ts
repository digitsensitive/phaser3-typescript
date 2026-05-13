export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'MainMenuScene'
    });
  }

  create(): void {
    this.cameras.main.setBackgroundColor(0x1a1a2e);

    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Title
    this.add
      .text(centerX, centerY - 80, 'FROGGER', {
        fontSize: '48px',
        color: '#00ff00',
        fontFamily: 'Arial'
      })
      .setOrigin(0.5);

    // Instructions
    this.add
      .text(centerX, centerY, 'Use Arrow Keys to Move', {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: 'Arial'
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY + 40, 'Avoid Cars - Reach the Green Zone', {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: 'Arial'
      })
      .setOrigin(0.5);

    // Start message
    this.add
      .text(centerX, centerY + 100, 'Press SPACE to Start', {
        fontSize: '20px',
        color: '#ffff00',
        fontFamily: 'Arial'
      })
      .setOrigin(0.5);

    // Input
    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });
  }
}
