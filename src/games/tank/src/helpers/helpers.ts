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