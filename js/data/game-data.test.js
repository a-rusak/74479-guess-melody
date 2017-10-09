import assert from "assert";
import {QUESTIONS_COUNT, resultsCount} from "./game.data";

const results = [
  {
    attempt: [1, 2, -2],
    rest: 1
  },
  {
    attempt: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    rest: 3
  }
];

describe(`Результаты игр`, () => {
  it(`игрок не ответил на ${QUESTIONS_COUNT} вопросов`, () => {
    assert.equal(-1, resultsCount(results[0]));
  });
  it(`Игрок ответил правильно и не быстро на ${QUESTIONS_COUNT} вопросов и ни разу не ошибся`, () => {
    assert.equal(10, resultsCount(results[1]));
  });
});
