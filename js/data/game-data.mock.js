export const games = [
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

export const gamesToPlaceInScoreboard = [
  {
    answers: [
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: false, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: false, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: false, timeSpent: 100}
    ],
    rest: 0,
    result: `Вы заняли 00-ое место из 00 игроков. Это лучше чем у 00 игроков`
  },
  {
    answers: [
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: false, timeSpent: 100}
    ],
    rest: 2,
    result: `Вы заняли 00-ое место из 00 игроков. Это лучше чем у 00 игроков`
  },
  {
    answers: [
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10}
    ],
    rest: 3,
    result: `Вы заняли 00-ое место из 00 игроков. Это лучше чем у 00 игроков`
  },
];

export const gamesToTestInScoreboard = [
  {
    answers: [
      {isCorrect: true, timeSpent: 40},
      {isCorrect: false, timeSpent: 20},
      {isCorrect: false, timeSpent: 10},
    ],
    rest: 1,
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
    rest: -1,
    result: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`
  },
  {
    answers: [
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100}
    ],
    rest: 4,
    result: `Вы заняли 2-ое место из 4 игроков. Это лучше чем у 50% игроков`
  },
  {
    answers: [
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 10},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100}
    ],
    rest: 4,
    result: `Вы заняли 2-ое место из 5 игроков. Это лучше чем у 60% игроков`
  },
  {
    answers: [
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: true, timeSpent: 100},
      {isCorrect: false, timeSpent: 100},
      {isCorrect: false, timeSpent: 100},
      {isCorrect: false, timeSpent: 100}
    ],
    rest: 0,
    result: `Вы заняли 6-ое место из 6 игроков. Это лучше чем у 0% игроков`
  },
];
