const LEVELS = [
  {
    CLOCK_SPEED: [200, 450],
    TILED_OUTPUT: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
  },
  {
    CLOCK_SPEED: [200, 450],
    TILED_OUTPUT: [
      0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0,
      0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
  }
];

export let settings = {
  GRID_SIZE_IN_PIXELS: 40,
  LEVELS: LEVELS,
  LEVEL_HEIGHT_IN_TILES: 8,
  LEVEL_WIDTH_IN_TILES: 8,
  currentLevel: 0
};
