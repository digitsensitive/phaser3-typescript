/* eslint no-undef: 0 */
/* eslint no-unused-expressions: 0 */
import 'phaser';
import EventKeys from '../../consts/EventKeys';
import SceneKeys from '../../consts/SceneKeys';
import { GameOverContainer } from './GameOverContainer';

export default class GameOverScene extends Phaser.Scene {
  private gameOverContainer: GameOverContainer;

  // audio
  private audioGameOver: Phaser.Sound.BaseSound;

  constructor() {
    super({
      key: SceneKeys.GAME_OVER_SCENE,
    });
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
    this.events.on(EventKeys.RESTART_GAME, 
      ()=>{
      this.audioGameOver.pause();
      this.gameOverContainer.createTweenClose();
    }, this);
  }
  
}