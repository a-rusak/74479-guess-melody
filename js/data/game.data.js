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
// const penalty = (rest) => (MAX_ERRORS_COUNT - rest) * PRICE_OF_ERROR;

// const getScore = ({answers, rest}) => {
const getScore = ({answers}) => {
  let score = -1;

  if (answers.length === QUESTIONS_COUNT) {
    // result = sum(attempt) - penalty(rest);
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

const getStatistics = (games) => {
  return games
      .map((game) => getScore(game))
      .sort((a, b) => b - a);
};

const printResult = (games, game) => {
  const score = getScore(game);

  if (score < 0) {
    if (game.rest < 0) {
      return phrases.noMoreAttempts();
    } else {
      return phrases.timeIsUp();
    }
  }
  let statistics = getStatistics(games);
  const statisticsIndexed = statistics
      .map((scoreFromStaticstics, position) => ({
        position,
        score: scoreFromStaticstics
      }));

  statisticsIndexed.push({
    position: null,
    score
  });

  const position = statisticsIndexed
      .sort((a, b) => b.score - a.score)
      .reduce((acc, it, index) => {
        if (it.position === null) {
          acc = index;
        }
        return acc;
      }, -1);

  games.push(game);
  statistics = getStatistics(games);

  const stats = {
    place: position + 1,
    playersCount: statistics.length,
    betterThan: (statistics.length - position - 1) * 100 / statistics.length
  };
  return phrases.win(stats);
};

class Timer {
  constructor(count) {
    this.time = count;
    this.isFinished = false;
  }

  tick() {
    if (!this.isFinished) {
      this.time--;
      if (this.time === 0) {
        this.isFinished = true;
      }
    }
  }
}


export {
  QUESTIONS_COUNT,
  MAX_ERRORS_COUNT,
  getScore,
  printResult,
  Timer
};
