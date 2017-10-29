const levels = [
  {
    type: `Artist`,
    title: `Кто исполняет эту песню?`,
    questions: [
      `Пелагея`,
      `Краснознаменная дивизия имени моей бабушки`,
      `Lorde`

    ],
    answer: 2
  },
  {
    type: `Artist`,
    title: `Кто исполняет эту песню?`,
    questions: [
      `Аа`,
      `Бб`,
      `Дд`

    ],
    answer: 0
  },
  {
    type: `Artist`,
    title: `Кто исполняет эту песню?`,
    questions: [
      `11`,
      `22`,
      `33`

    ],
    answer: 0
  },
  {
    type: `Genre`,
    title: `Выберите инди-рок треки`,
    questions: [
      {
        url: `url1`
      },
      {
        url: `url2`
      }
    ],
    answer: `01`
  }
];

// const LEVELS_COUNT = levels.length;
const LEVELS_COUNT = 10;
const FAST_ANSWER_PERIOD = 30;
const MAX_ERRORS_COUNT = 4;
const TIME_FOR_GAME = 60 * 5; // 5 minutes
const GAME_NAME = `Угадай мелодию`;
const phrases = {
  timeIsUp: () => `Время вышло! Вы не успели отгадать все мелодии`,
  noMoreAttempts: () =>
    `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
  win: ({place, playersCount, betterThan}) =>
    `Вы заняли ${place}-ое место из ${playersCount} игроков. Это&nbsp;лучше чем у&nbsp;${betterThan}%&nbsp;игроков`
};

const welcome = {
  name: GAME_NAME,
  title: `Правила игры`,
  content: {
    rules: [
      `Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.`,
      `Ошибиться можно 3 раза.`,
      `Удачи!`
    ]
  },
  button: `Начать игру`
};
const resultTry = {
  name: GAME_NAME,
  title: `Какая жалость!`,
  button: `Попробовать ещё раз`,
  isWin: false
};
const resultWin = {
  name: GAME_NAME,
  title: `Вы настоящий меломан!`,
  button: `Сыграть ещё раз`,
  isWin: true
};

const scoreBoard = [];

// const PRICE_OF_ERROR = 2;
// const sum = (it) => it.reduce((acc, item) => acc + item);
// const penalty = (remainingAttempts) => (MAX_ERRORS_COUNT - remainingAttempts) * PRICE_OF_ERROR;

// const getScore = ({answers, remainingAttempts}) => {
const getScore = (answers) => {
  let score = -1;

  if (answers.length === LEVELS_COUNT) {
    // result = sum(attempt) - penalty(remainingAttempts);
    // result = sum(answers);
    score = answers.reduce((acc, it) => {
      let point = -2;
      if (it.isCorrect) {
        point = (it.timeSpent < FAST_ANSWER_PERIOD) ? 2 : 1;
      }
      return acc + point;
    }, 0);
  }
  return score;
};

const getTimeSpent = (answers) => {
  let time = answers.reduce((acc, it) => {
    return acc + it.timeSpent;
  }, 0);
  return time;
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
  let endGameMessage = ``;
  const score = getScore(game.answers);
  const time = getTimeSpent(game.answers);

  if (game.remainingAttempts > 0 && time < TIME_FOR_GAME) {
    // выйгрыш
    const position = getPosition(statistics, score);
    statistics.push(score);
    statistics.sort((a, b) => b - a);

    const stats = {
      place: position + 1,
      playersCount: statistics.length,
      betterThan: Math.round((statistics.length - position - 1) * 100 / statistics.length)
    };
    endGameMessage = phrases.win(stats);

  } else {
    // проигрыш
    endGameMessage = (time > TIME_FOR_GAME) ? phrases.timeIsUp() : phrases.noMoreAttempts();
  }
  console.log(score, endGameMessage);

  return endGameMessage;
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

const currentGame = {
  level: 4,
  remainingAttempts: 2,
  time: 200000,
  gameType: `Genre`,
  score: 6,
  isGameFinished: false,
  answers: [
    {isCorrect: true, timeSpent: 40},
    {isCorrect: true, timeSpent: 20},
    {isCorrect: false, timeSpent: 10},
  ],
  statistics: [20, 8, 4]
};

const samples = [
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    artist: `Gunnar Olsen`,
    name: `Home Stretch`,
    image: `https://f4.bcbits.com/img/0004181452_10.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Electronic`
  }
];

export {
  LEVELS_COUNT,
  MAX_ERRORS_COUNT,
  TIME_FOR_GAME,
  getScore,
  printResult,
  Timer,
  welcome,
  resultTry,
  resultWin,
  levels,
  scoreBoard
};
