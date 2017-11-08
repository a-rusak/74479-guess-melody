import {
  getLevel,
  showNextLevel,
  tick,
  MAX_ERRORS_COUNT,
  LEVELS_COUNT,
} from '../data/game.data';

export default class GameModel {
  constructor(data) {
    this.data = data;
  }

  update(newState) {
    this.state = Object.assign({}, this.state, newState);
    return this.state;
  }

  resetAnswers(state) {
    state.answers = [];
  }

  getCurrentLevel() {
    return getLevel(this.state.level, this.data);
  }

  showNextLevel() {
    this.update(showNextLevel(this.state, this.data));
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

  isLastLevel() {
    return this.state.level === LEVELS_COUNT - 1;
  }
}
