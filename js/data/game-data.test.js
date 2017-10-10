import assert from "assert";
import {resultsCount, MAX_ERRORS_COUNT} from "./game.data";

const results = [
  {
    attempt: [1, 2, -2],
    rest: 3,
    ponts: -1
  },
  {
    attempt: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    rest: 4,
    ponts: 10
  },
  {
    attempt: [1, 1, 1, 1, 1, 1, -2, 1, 1, -2],
    rest: 2,
    ponts: 4
  },
  {
    attempt: [-2, -2, -2, -2],
    rest: 0,
    ponts: -1
  },
  {
    attempt: [],
    rest: 4,
    ponts: -1
  }
];

const statistics = [4, 5, 8, 10, 11];
const games = [
  {
    points: -1,
    rest: 0,
    timeLeft: 200
  },
  {
    points: -1,
    rest: 3,
    timeLeft: 0
  },
  {
    points: 10,
    rest: 4,
    timeLeft: 100
  }
];

const text = testData => `
  Игрок отвечал на ${testData.attempt.length} вопрос(ов|а).
  Сделал ${MAX_ERRORS_COUNT - testData.rest} ошиб(ки|ок|ку).
  ${testData.ponts === -1
    ? `и проиграл`
    : `и набрал ${testData.ponts} балл(ов|а)`}
`;

const phrases = {
  timeIsUp: () => `Время вышло! Вы не успели отгадать все мелодии`,
  noMoreAttempts: () =>
    `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
  win: ({place, playersCount, betterThan}) =>
    `Вы заняли ${place}-ое место из ${playersCount} игроков. Это лучше чем у ${betterThan} игроков`
};

describe(`Результаты игр`, () => {
  describe(`Функция подсчёта набранных баллов игрока`, () => {
    for (let result of results) {
      makeTest(result);
    }
    function makeTest(result) {
      it(text(result), () => {
        assert.equal(result.ponts, resultsCount(result));
      });
    }
  });

  describe(`Функция вывода результата игрока`, () => {
    for (let game of games) {
      makeTest(game);
    }
    function makeTest(game) {
      it(text(result), () => {
        assert.equal(result.ponts, resultsCount(result));
      });
    }
  });
});
