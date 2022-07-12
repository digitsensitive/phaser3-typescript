/* eslint no-undef: 0 */
/* eslint no-unused-expressions: 0 */
import 'phaser';
import { GameOverContainer } from '../objects/container/gameoverContainer';

export default class GameOverScene extends Phaser.Scene {
  private gameOverContainer: GameOverContainer;

  // audio
  private audioGameOver: Phaser.Sound.BaseSound;

  constructor() {
    super('GameOverScene');
  }

  create() {
    this.gameOverContainer = new GameOverContainer(this, 0,0);
    this.add.existing(this.gameOverContainer)
    this.initAudio();
    this.createHandleEvents();
  }
  update(time: number, delta: number): void {
    this.gameOverContainer.update(time, delta);
  }
  private initAudio(){
    this.audioGameOver = this.sound.add('gameover');
    if(!this.registry.get('muteMusic'))
      this.audioGameOver.play();
  }

  private createHandleEvents(){
    this.events.on('restartGame', ()=>{
      this.audioGameOver.pause();
      this.gameOverContainer.createTweenClose();
    }, this);
  }
  
}