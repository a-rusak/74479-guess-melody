import assert from 'assert';
import {
  QUESTIONS_COUNT,
  MAX_ERRORS_COUNT,
  getScore,
  printResult,
  Timer
} from './game.data';
import {
  games,
  gamesToPlaceInScoreboard,
  gamesToTestInScoreboard
} from './game-data.mock';

const text = (testData) => `
  Игрок отвечал на ${testData.answers.length} вопрос(ов|а) из ${QUESTIONS_COUNT} вопросов.
  Сделал ${MAX_ERRORS_COUNT - testData.rest} ошиб(ки|ок|ку).
  ${testData.points === -1
    ? `и проиграл`
    : `и набрал ${testData.points} балл(ов|а)`}
`;

describe(`Результаты игр`, () => {
  describe(`Функция подсчёта набранных баллов игрока`, () => {
    for (let game of games) {
      makeTest(game);
    }
    function makeTest(game) {
      it(text(game), () => {
        assert.equal(game.points, getScore(game));
      });
    }
  });

  describe(`Функция вывода результата игрока`, () => {
    for (let game of gamesToTestInScoreboard) {
      makeTest(game);
    }
    function makeTest(game) {
      it(game.result, () => {
        assert.equal(game.result,
            printResult(gamesToPlaceInScoreboard, game));
      });
    }
  });

  const TIME = 4;
  const timer = new Timer(TIME);

  describe(`Таймер в 5 щелчков`, () => {
    for (let t of [4, 3, 2, 1, 0]) {
      makeTest(t);
    }
    function makeTest(t) {
      it(`Щелчок №${t + 1}: `, () => {
        assert.equal(t, timer.time);
        if (t > 0) {
          assert(!timer.isFinished);
        }
        if (t === 0) {
          assert(timer.isFinished);
        }
        timer.tick();
      });
    }
  });
});
