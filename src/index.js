import './style.css';
import submitData from './modules/submit.js';

const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Oawl0gMZlyz9hcMNVFIE/scores';

function display(obj) {
  const allList = obj.result;
  const container = document.querySelector('.score-container');
  container.innerHTML = '';
  allList.forEach((list) => {
    const li = document.createElement('li');
    li.innerHTML = `<p>${list.user}: ${list.score}</p>`;
    container.appendChild(li);
  });
}

async function getData() {
  const response = await fetch(apiUrl, {
    method: 'GET',
  });
  const data = await response.json();
  display(data);
}

async function createGame() {
  await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({ name: 'My new game' }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

window.onload = getData();

document.addEventListener('click', (button) => {
  if (button.target.id === 'submit') {
    const name = document.getElementById('name').value;
    const score = document.getElementById('score').value;
    if (name !== '' && score !== '') {
      submitData(apiUrl, name, score);
      document.getElementById('name').value = '';
      document.getElementById('score').value = '';
    }
  }
  if (button.target.id === 'refresh') {
    getData();
  }
});