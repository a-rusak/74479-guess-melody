const QUESTIONS_COUNT = 10;
const FAST_ANSWER_PERIOD = 30;
const MAX_ERRORS_COUNT = 4;
// const TIME_FOR_GAME = 60 * 5; // 5 minutes
const phrases = {
  timeIsUp: () => `Время вышло! Вы не успели отгадать все мелодии`,
  noMoreAttempts: () =>
    `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
  win: ({place, playersCount, betterThan}) =>
    `Вы заняли ${place}-ое место из ${playersCount} игроков. Это лучше чем у ${betterThan}% игроков`
};

// const PRICE_OF_ERROR = 2;
// const sum = (it) => it.reduce((acc, item) => acc + item);
// const penalty = (remainingAttempts) => (MAX_ERRORS_COUNT - remainingAttempts) * PRICE_OF_ERROR;

// const getScore = ({answers, remainingAttempts}) => {
const getScore = ({answers}) => {
  let score = -1;

  if (answers.length === QUESTIONS_COUNT) {
    // result = sum(attempt) - penalty(remainingAttempts);
    // result = sum(answers);

    score = answers
        .map((it) => {
          let points = -2;
          if (it.isCorrect) {
            if (it.timeSpent < FAST_ANSWER_PERIOD) {
              points = 2;
            } else {
              points = 1;
            }
          }
          return points;
        })
        .reduce((acc, it) => acc + it);
  }
  return score;
};

const getPosition = (statistics, score) => {
  // создаём из таблицы результатов, массив объектов: { position, score }
  const statisticsIndexed = statistics
      .map((scoreFromStaticstics, position) => ({
        position,
        score: scoreFromStaticstics
      }));

  // кладём в таблицу результат новой игры
  statisticsIndexed.push({
    position: null,
    score
  });

  // получаем позицию новой игры в таблице результатов
  const position = statisticsIndexed
      .sort((a, b) => b.score - a.score)
      .reduce((acc, it, index) => {
        if (it.position === null) {
          acc = index;
        }
        return acc;
      }, -1);

  if (position === -1) {
    throw new Error(`Can't define position in Scoreboard`);
  }
  return position;
};

const printResult = (statistics, game) => {
  const score = getScore(game);

  // проигрыш
  if (score < 0) {
    if (game.remainingAttempts < 0) {
      return phrases.noMoreAttempts();
    } else {
      return phrases.timeIsUp();
    }
  }

  // выйгрыш
  const position = getPosition(statistics, score);
  statistics.push(score);
  statistics.sort((a, b) => b - a);

  const stats = {
    place: position + 1,
    playersCount: statistics.length,
    betterThan: (statistics.length - position - 1) * 100 / statistics.length
  };
  return phrases.win(stats);
};

class Timer {
  constructor(time) {
    this.time = time;
  }

  get isFinished() {
    return this.time < 1;
  }

  get time() {
    return this._time;
  }

  set time(value) {
    this._time = value;
  }

  tick() {
    this.time--;
  }
}

export {
  QUESTIONS_COUNT,
  MAX_ERRORS_COUNT,
  getScore,
  printResult,
  Timer
};
