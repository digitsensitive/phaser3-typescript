const LEVELS = [
  {
    BRICKS: [
      0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
      0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
      0, 0, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 0, 0,
      0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 0, 0,
      0, 0, 3, 3, 3, 0, 0, 0, 0, 3, 3, 3, 0, 0,
      0, 0, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 0, 0,
      0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
      0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
    ],
    HEIGHT: 8,
    WIDTH: 14
  }
];
export let settings = {
  BRICK: { HEIGHT: 10, MARGIN_TOP: 50, SPACING: 10, WIDTH: 25 },
  LEVELS: LEVELS,
  currentLevel: 0,
  highScore: 0,
  lives: 3,
  score: 0
};
