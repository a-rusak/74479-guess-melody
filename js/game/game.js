import {$on} from '../util';
import {MAX_ERRORS_COUNT, initialGame, levels} from '../data/game.data';
import Application from '../application';
import GameModel from './game-model';
import GameView from './game-view';

class GameScreen {
  constructor(data = levels) {
    this.model = new GameModel(data);
    this.view = new GameView(this.model);
    $on(`answerGenre`, (evt) => this.answerGenreHandler(evt));
    $on(`answerArtist`, (evt) => this.answerArtistHandler(evt));
  }

  init(state = initialGame) {
    this.model.resetAnswers(state);
    this.model.update(state);
    this.model.nextLevel();
    this.changeLevel(this.model.getLevelType());
  }

  setAnswer(answer) {
    const answerObj = {
      isCorrect: answer === levels[this.model.state.level].answer,
      timeSpent: 20
    };
    const answers = this.model.state.answers;
    const time = this.model.state.time + answerObj.timeSpent;
    answers.push(answerObj);
    let remainingAttempts = this.model.state.remainingAttempts;
    if (!answerObj.isCorrect) {
      remainingAttempts--;
    }

    this.model.update({
      answers,
      remainingAttempts,
      time
    });
  }

  setGame() {
    if (this.model.isLastLevel() && this.model.getMistakes() < MAX_ERRORS_COUNT) {
      // сделан ответ на последнем уровне и есть запас по ошибкам
      this.model.win();
      Application.win();
    } else if (this.model.getMistakes() >= MAX_ERRORS_COUNT) {
      // превышен лимит ошибок
      this.model.fail();
      Application.fail();
    } else {
      this.model.nextLevel();
      this.changeLevel(this.model.getLevelType());
    }
  }

  changeLevel(type) {
    this.view.updateLevel(type);
  }

  answerGenreHandler(evt) {
    const answers = evt.detail;
    let answerMask = ``;
    for (let answer of answers) {
      answerMask += answer.checked ? 1 : 0;
    }
    this.setAnswer(answerMask);
    this.setGame();
  }

  answerArtistHandler(evt) {
    const answer = +evt.detail.split(`-`)[1];
    this.setAnswer(answer);
    this.setGame();
  }

}

export default GameScreen;