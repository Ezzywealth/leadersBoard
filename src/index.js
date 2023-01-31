import './style.css';

const refreshBtn = document.querySelector('.refresh_btn');
const userName = document.getElementById('name');
const form = document.getElementById('score_form');
const userScore = document.getElementById('score');
const scoresContainer = document.querySelector('.score_board');
const gameId = 'PA4nCuhNny5ySUjkcZyG';

// url for fetching and creating my scores
const SCORES_URL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`;

// functionality for displaying the scores on the DOM
const createLists = (scores) => {
  scoresContainer.innerHTML = '';
  scores.forEach((score) => {
    const scoreContainer = document.createElement('h4');
    scoreContainer.className = 'score';
    scoreContainer.innerText = `${score.user}: ${score.score}`;
    scoresContainer.appendChild(scoreContainer);
  });
};

const fetchScores = async () => {
  const response = await fetch(`${SCORES_URL}`);
  const { result } = await response.json();
  createLists(result);
  return result;
};

const submitScore = async (details) => {
  const response = await fetch(`${SCORES_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  });

  const { result } = await response.json();
  return result;
};

refreshBtn.addEventListener('click', () => {
  fetchScores(SCORES_URL);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const object = {
    user: userName.value,
    score: +userScore.value,
  };
  submitScore(object);
  form.reset();
});
