import {
  getLevel,
  nextLevel,
  printResult,
  getScore,
  getAllLevelsTypes,
  scoreBoard,
  levels as levelsData,
  resultWin as resultWinData,
  resultTry as resultTryData,
  MAX_ERRORS_COUNT,
  initialGame,
  LEVELS_COUNT,
  // setState
} from '../data/game.data';
import Application from '../application';

export default class GameModel {
  constructor(data = levelsData) {
    this.data = data;
  }

  update(newState) {
    this.state = Object.assign({}, this.state, newState);
    console.log(`update state: `, this.state);
    console.log(`initia state: `, initialGame);
    console.log(`==============`);
    return this.state;
    // Application.state = setState(newState);
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

  getMistakes() {
    return MAX_ERRORS_COUNT - this.state.remainingAttempts;
  }

  getLevelType() {
    return this.getCurrentLevel().type;
  }

  getAllLevelsTypes() {
    return getAllLevelsTypes();
  }

  isLastLevel() {
    return this.state.level === LEVELS_COUNT - 1;
  }

  tick() {
    // this.update(tick(state));
  }

  win() {
    resultWinData.content = printResult(scoreBoard, this.state);
    resultWinData.score = getScore(this.state.answers);
    resultWinData.errors = this.getMistakes();
  }
  fail() {
    resultTryData.content = printResult(scoreBoard, this.state);
  }
}
