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