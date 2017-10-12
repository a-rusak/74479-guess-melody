import assert from "assert";
import {
  QUESTIONS_COUNT,
  MAX_ERRORS_COUNT,
  getScore,
  printResult
} from "./game.data";

const games = [
  {
    answers: [
      {isCorrect: true, timeSpent: 40},
      {isCorrect: true, timeSpent: 20},
      {isCorrect: false, timeSpent: 10},
    ],
    rest: 3,
    points: -1
  },
  {
    answers: [
      {isCorrect: true, timeSpent: 40},
      {isCorrect: true, timeSpent: 40},
      {isCorrect: true, timeSpent: 40},
      {isCorrect: true, timeSpent: 40},
      {isCorrect: true, timeSpent: 40},
      {isCorrect: true, timeSpent: 40},
      {isCorrect: true, timeSpent: 40},
      {isCorrect: true, timeSpent: 40},
      {isCorrect: true, timeSpent: 40},
      {isCorrect: true, timeSpent: 40}
    ],
    rest: 4,
    points: 10
  },
  {
    answers: [
      {isCorrect: true, timeSpent: 60},
      {isCorrect: true, timeSpent: 60},
      {isCorrect: true, timeSpent: 60},
      {isCorrect: true, timeSpent: 60},
      {isCorrect: true, timeSpent: 60},
      {isCorrect: true, timeSpent: 40},
      {isCorrect: false, timeSpent: 50},
      {isCorrect: true, timeSpent: 40},
      {isCorrect: true, timeSpent: 40},
      {isCorrect: false, timeSpent: 40}
    ],
    rest: 2,
    points: 4
  },
  {
    answers: [
      {isCorrect: false, timeSpent: 10},
      {isCorrect: false, timeSpent: 10},
      {isCorrect: false, timeSpent: 10},
      {isCorrect: false, timeSpent: 10}
    ],
    rest: 0,
    points: -1
  },
  {
    answers: [],
    rest: 4,
    points: -1
  }
];

const gamesToPlaceInScoreboard = [
  {
    answers: [
      {isCorrect: true, timeSpent: 40},
      {isCorrect: false, timeSpent: 20},
      {isCorrect: false, timeSpent: 10},
    ],
    rest: 3,
    result: `Время вышло! Вы не успели отгадать все мелодии`
  },
  {
    answers: [
      {isCorrect: true, timeSpent: 100},
      {isCorrect: false, timeSpent: 10},
      {isCorrect: false, timeSpent: 10},
      {isCorrect: false, timeSpent: 10},
      {isCorrect: false, timeSpent: 10}
    ],
    rest: 0,
    result: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`
  },
];

const text = (testData) => `
  Игрок отвечал на ${testData.answers.length} вопрос(ов|а) из ${QUESTIONS_COUNT} вопросов.
  Сделал ${MAX_ERRORS_COUNT - testData.rest} ошиб(ки|ок|ку).
  ${testData.points === -1
    ? `и проиграл`
    : `и набрал ${testData.points} балл(ов|а)`}
`;

describe(`Результаты игр`, () => {
  /* describe(`Функция подсчёта набранных баллов игрока`, () => {
    for (let game of games) {
      makeTest(game);
    }
    function makeTest(game) {
      it(text(game), () => {
        assert.equal(game.points, getScore(game));
      });
    }
  }); */

  describe(`Функция вывода результата игрока`, () => {
    for (let game of gamesToPlaceInScoreboard) {
      makeTest(game);
    }
    function makeTest(game) {
      it(game.result, () => {
        assert.equal(game.result,
            printResult(gamesToPlaceInScoreboard, game));
      });
    }
  });
});
