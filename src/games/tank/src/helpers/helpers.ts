import { CONST } from "../consts/const";
import { Player } from "../objects/player";

export const highScore = function (scene: Phaser.Scene){
  var score = scene.registry.get('score');
    if (localStorage.getItem('highscore')) {
      if (localStorage.getItem('highscore') < score) {
        localStorage.setItem('highscore', score);
      }
    } else {
      localStorage.setItem('highscore', score);
    }
    return localStorage.getItem('highscore');
}

export const angleParticleBullet = function (angle: number){
  if(angle < 0){
    return angle+360 - 90;
  }
  return angle - 90;
}

export const createTweenRotationTank = function (player: Player, angle: number){
  return player.scene.tweens.add({
    targets: player.getTank(),
    angle: angle,
    ease: 'Sine.easeInOut',
    duration: CONST.timeRotateStep,
    yoyo: false,
    repeat: 0,
  });
}