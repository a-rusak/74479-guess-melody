import {
  printResult,
  getScore,
  getFastScore,
  resultWin as winData,
  resultTry as tryData,
  resultTime as timeData,
  phrases,
  TIME_FOR_GAME,
  MAX_ERRORS_COUNT
} from '../data/game.data';
import Loader from '../data/loader';

const resultData = {
  TRY: tryData,
  TIME: timeData,
  WIN: winData
};

export default class ResultModel {
  constructor(result) {
    this.result = result;

    // If result screen shown not after game or Results page has been reloaded
    if (typeof ResultModel.type === `undefined`) {
      // url string with correct param
      if (result) {
        ResultModel.type = `WIN`;
        Object.assign(winData, result);
      } else {
        ResultModel.type = `TIME`;
      }
    }
  }

  getData() {
    return resultData[ResultModel.type];
  }

  static get type() {
    return ResultModel._type;
  }

  static set type(type) {
    ResultModel._type = type;
  }

  static updateWinData(state, stats) {
    winData.content = printResult(stats, state);
    winData.score = getScore(state.answers);
    winData.errors = MAX_ERRORS_COUNT - state.remainingAttempts;
    winData.time = TIME_FOR_GAME - state.time;
    winData.fastScore = getFastScore(state.answers);
    Loader.postResults(winData.score);
  }

  static getStatistics() {
    const {
      score,
      errors,
      time,
      fastScore,
      place,
      playersCount,
      betterThan
    } = winData;

    return {
      score,
      errors,
      time,
      fastScore,
      place,
      playersCount,
      betterThan
    };
  }

  static failOnMistakes() {
    tryData.content = phrases.noMoreAttempts();
  }
}
