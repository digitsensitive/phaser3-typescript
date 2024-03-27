export const customEmitter = new Phaser.Events.EventEmitter();

export const EMITTERS_TYPES = {
  ENERGY_EMPTY: 'energy-empty',
  LOAD_MAX_ENERGY: 'load-max-energy',
  MAX_ENERGY_LOADED: 'max-energy-loaded',
  REDUCE_ENERGY: 'reduce-energy',
  SCORE_UPDATED: 'score-updated'
};
