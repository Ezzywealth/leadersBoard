import './style.css';

const refreshBtn = document.querySelector('.refresh_btn');
const userName = document.getElementById('name');
const form = document.getElementById('score_form');
const userScore = document.getElementById('score');
const gameId = 'PA4nCuhNny5ySUjkcZyG';

// url for fetching and creating my scores
const SCORES_URL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`;

const fetchScores = async () => {
  const response = await fetch(`${SCORES_URL}`);
  const { result } = await response.json();
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
