import { Coin } from '../objects/coin';
import { Player } from '../objects/player';

export class GameScene extends Phaser.Scene {
  private background: Phaser.GameObjects.Image;
  private coin: Coin;
  private coinsCollectedText: Phaser.GameObjects.Text;
  private collectedCoins: number;
  private player: Player;
  private checkAddCoin!: boolean;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(): void {
    this.collectedCoins = 0;
    this.checkAddCoin = false;
  }

  create(): void {
    // create background
    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);

    // create objects
    this.coin = new Coin({
      scene: this,
      x: Phaser.Math.RND.integerInRange(100, 700),
      y: Phaser.Math.RND.integerInRange(100, 500),
      texture: 'coin'
    });
    this.player = new Player({
      scene: this,
      x: this.sys.canvas.width / 2,
      y: this.sys.canvas.height / 2,
      texture: 'player'
    });

    // create texts
    this.coinsCollectedText = this.add.text(
      this.sys.canvas.width / 2,
      this.sys.canvas.height - 50,
      this.collectedCoins + '',
      {
        fontFamily: 'Arial',
        fontSize: 38 + 'px',
        stroke: '#fff',
        strokeThickness: 6,
        color: '#000000'
      }
    );
    
  }

  update(): void {
    // update objects
    this.player.update();
    this.coin.update();

    // do the collision check
    if (
      Phaser.Geom.Intersects.RectangleToRectangle(
        this.player.getBounds(),
        this.coin.getBounds()
      )
    ) {
      if(!this.checkAddCoin){
        this.updateCoinStatus();
        this.checkAddCoin = true;
      }
    }
  }

  private updateCoinStatus(): void {
    this.coin.playerHitCoin();
    this.time.delayedCall(500, ()=>{
      this.collectedCoins++;
      this.coinsCollectedText.setText(this.collectedCoins + '');
      this.checkAddCoin =false
    }, [], this);
  }
}
