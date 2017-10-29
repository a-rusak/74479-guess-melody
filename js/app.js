import View from './view';
import {
  LEVELS_COUNT,
  MAX_ERRORS_COUNT,
  getScore,
  printResult,
  welcome as welcomeData,
  resultTry as resultTryData,
  resultWin as resultWinData,
  levels as levelsData,
  scoreBoard
} from './data/game.data';

class App {
  constructor() {
  }

  init() {
    this.view = new View();
    this.resetGame();
    this.view.on(`start`, this.startHandler.bind(this));
    this.view.on(`answerGenre`, this.answerGenreHandler.bind(this));
    this.view.on(`answerArtist`, this.answerArtistHandler.bind(this));
    this.view.on(`replay`, this.replayHandler.bind(this));
  }

  resetGame() {
    const state = {
      level: {
        index: -1,
        data: {}
      },
      remainingAttempts: MAX_ERRORS_COUNT,
      time: 0,
      answers: []
    };
    this.setState(state);
    this.view.screen = this.view.templates.welcome(welcomeData);
  }

  nextLevel() {
    const index = this.state.level.index + 1;
    const data = levelsData[index];

    this.setState({
      level: {
        index,
        data
      }
    });

    this.view.screen = this.view.templates[`level${data.type}`](this.state);
  }

  setAnswer(answer) {
    const answerObj = {
      isCorrect: answer === this.state.level.data.answer,
      timeSpent: 20
    };
    const answers = this.state.answers;
    const time = this.state.time + answerObj.timeSpent;
    answers.push(answerObj);
    let remainingAttempts = this.state.remainingAttempts;
    if (!answerObj.isCorrect) {
      remainingAttempts--;
    }

    this.setState({
      answers,
      remainingAttempts,
      time
    });
  }

  setGame() {
    if (this.isLastLevel() && this.isAttempts()) {
      // сделан ответ на последнем уровне и есть запас по ошибкам
      resultWinData.content = printResult(scoreBoard, this.state);
      resultWinData.score = getScore(this.state.answers);
      resultWinData.errors = MAX_ERRORS_COUNT - this.state.remainingAttempts;
      this.view.screen = this.view.templates.result(resultWinData);
    } else if (!this.isAttempts()) {
      // превышен лимит ошибок
      resultTryData.content = printResult(scoreBoard, this.state);
      this.view.screen = this.view.templates.result(resultTryData);
    } else {
      this.nextLevel();
    }
  }

  isLastLevel() {
    return this.state.level.index === LEVELS_COUNT - 1;
  }

  isAttempts() {
    // есть запас ошибок
    return this.state.remainingAttempts > 0;
  }

  setState(state) {
    if ({}.toString.call(state).slice(8, -1) !== `Object`) {
      throw new TypeError(`Set state with object`);
    }
    this.state = Object.assign({}, this.state, state);
    // console.log(`setState: `, this.state);
  }

  // Handlers

  startHandler() {
    this.nextLevel();
  }

  replayHandler() {
    this.resetGame();
    this.nextLevel();
  }

  answerGenreHandler(evt) {
    const answerMask = evt.detail.reduce((acc, it) => {
      const m = it.checked ? 1 : 0;
      return acc + m;
    }, ``);
    this.setAnswer(answerMask);
    this.setGame();
  }

  answerArtistHandler(evt) {
    const answer = +evt.detail.split(`-`)[1];
    this.setAnswer(answer);
    this.setGame();
  }
}

const app = new App();
app.init();
