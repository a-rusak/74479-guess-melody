import {$on} from '../util';
import {MAX_ERRORS_COUNT, initialGame, levels} from '../data/game.data';
import Application from '../application';
import GameModel from './game-model';
import ResultModel from '../result/result-model.js';
import GameView from './game-view';
import AnswerTimer from '../data/timer';

class GameScreen {
  constructor(data = levels) {
    this.model = new GameModel(data);
    this.view = new GameView(this.model);
    $on(`answer:genre`, (evt) => this.answerGenreHandler(evt));
    $on(`answer:artist`, (evt) => this.answerArtistHandler(evt));
  }

  init(state = initialGame) {
    this.AnswerTimer = AnswerTimer;
    this.AnswerTimer.stop();
    this.AnswerTimer.reset();
    this.model.resetAnswers(state);
    this.model.update(state);
    this.model.nextLevel();
    this.changeLevel(this.model.getLevelType());
    this.tick();
  }

  updateState(answer) {
    const answerObj = {
      isCorrect: answer === levels[this.model.state.level].answer,
      timeSpent: this.AnswerTimer.time
    };
    // console.log(answerObj);
    const answers = this.model.state.answers;
    answers.push(answerObj);
    let remainingAttempts = this.model.state.remainingAttempts;
    if (!answerObj.isCorrect) {
      remainingAttempts--;
    }

    this.model.update({
      answers,
      remainingAttempts,
    });
  }

  onAnswer() {
    this.AnswerTimer.stop();
    this.AnswerTimer.reset();

    if (this.model.isLastLevel() && this.model.getMistakes() < MAX_ERRORS_COUNT) {
      // сделан ответ на последнем уровне и есть запас по ошибкам
      this.stopTimer();
      ResultModel.type = `WIN`;
      ResultModel.updateWinData(this.model.state);
      Application.showResult(ResultModel.getStatistics());

    } else if (this.model.getMistakes() >= MAX_ERRORS_COUNT) {
      // превышен лимит ошибок
      this.stopTimer();
      ResultModel.failOnMistakes(this.model.state);
      ResultModel.type = `TRY`;
      Application.showResult();

    } else {
      this.model.nextLevel();
      this.changeLevel(this.model.getLevelType());
    }
  }

  changeLevel(type) {
    this.view.updateLevel(type);
    this.AnswerTimer.start();
  }

  tick() {
    this.model.tick();
    this.view.updateHeader();

    if (this.model.state.time <= 0) {
      this.stopTimer();
      ResultModel.type = `TIME`;
      Application.showResult();
    } else {
      this.timer = setTimeout(() => this.tick(), 1000);
    }
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

  answerGenreHandler(evt) {
    const answers = evt.detail;
    let answerMask = ``;
    for (let answer of answers) {
      answerMask += answer.checked ? 1 : 0;
    }
    this.updateState(answerMask);
    this.onAnswer();
  }

  answerArtistHandler(evt) {
    const answer = +evt.detail.split(`-`)[1];
    this.updateState(answer);
    this.onAnswer();
  }

}

export default new GameScreen();

