import { CONST } from "../consts/const";
import { Player } from "../objects/Player";

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

export const playSound = function (scene: Phaser.Scene, audioKey: string){
  scene.sound.add(audioKey).play;
}

export const newPlayer = function (scene: Phaser.Scene, x: number, y: number){
  return new Player({
    scene: this,
    x: x,
    y: y,
    texture: 'tankBlue',
    rateOfFire: 80,
  });
}