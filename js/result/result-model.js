import {
  printResult,
  getScore,
  getFastScore,
  scoreBoard,
  resultWin as winData,
  resultTry as tryData,
  resultTime as timeData,
  TIME_FOR_GAME,
  MAX_ERRORS_COUNT
} from '../data/game.data';

const resultData = {
  TRY: tryData,
  TIME: timeData,
  WIN: winData
};

export default class ResultModel {
  constructor(result) {
    this.result = result;

    // result screen shown not after game or Results page has been reoladed
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

  static updateWinData(state) {
    winData.content = printResult(scoreBoard, state);
    winData.score = getScore(state.answers);
    winData.errors = MAX_ERRORS_COUNT - state.remainingAttempts;
    winData.time = TIME_FOR_GAME - state.time;
    winData.fastScore = getFastScore(state.answers);
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

  static failOnMistakes(state) {
    tryData.content = printResult(scoreBoard, state);
  }
}
