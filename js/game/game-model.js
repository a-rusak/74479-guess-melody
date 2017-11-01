import {
  getLevel,
  nextLevel,
  // getAllLevelsTypes,
  tick,
  levels as levelsData,
  MAX_ERRORS_COUNT,
  LEVELS_COUNT,
} from '../data/game.data';

export default class GameModel {
  constructor(data = levelsData) {
    this.data = data;
  }

  update(newState) {
    this.state = Object.assign({}, this.state, newState);
    // console.log(this.state);
    return this.state;
  }

  resetAnswers(state) {
    state.answers = [];
  }

  getCurrentLevel() {
    return getLevel(this.state.level, this.data);
  }

  nextLevel() {
    this.update(nextLevel(this.state, this.data));
  }

  tick() {
    this.update(tick(this.state));
  }

  getMistakes() {
    return MAX_ERRORS_COUNT - this.state.remainingAttempts;
  }

  getLevelType() {
    return this.getCurrentLevel().type;
  }

  /* getAllLevelsTypes() {
    return getAllLevelsTypes();
  } */

  isLastLevel() {
    return this.state.level === LEVELS_COUNT - 1;
  }
}
