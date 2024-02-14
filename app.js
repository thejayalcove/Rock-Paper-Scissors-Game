const weapons = ['Rock', 'Paper', 'Scissors'];
const userChoice = document.querySelector('.user-choice');
const computerChoice = document.querySelector('.computer-choice');
const gameResults = document.querySelector('.results');

function userWeapon(e) {
  let weaponChoice = e.target.textContent;
  userChoice.textContent = weaponChoice;
  localStorage.setItem('userChoice', weaponChoice);
  computerWeapon();
  gameLogic();
}

function computerWeapon() {
  computerChoice.textContent =
    weapons[Math.floor(Math.random() * weapons.length)];
  localStorage.setItem('computerChoice', computerChoice.textContent);
}

function gameLogic() {
  let user = userChoice.textContent;
  let computer = computerChoice.textContent;
  if (user === computer) {
    displayResult('It is a tie!', 'black');
  } else if (
    (user === 'Rock' && computer === 'Scissors') ||
    (user === 'Paper' && computer === 'Rock') ||
    (user === 'Scissors' && computer === 'Paper')
  ) {
    displayResult('You Win!', 'green');
  } else {
    displayResult('You lose! Computer Wins.', 'red');
  }
  localStorage.setItem('results', gameResults.innerHTML);
}

function displayResult(message, color) {
  gameResults.innerHTML = message;
  gameResults.style.color = color;
}

function loadGameResults() {
  if (localStorage.getItem('userChoice')) {
    userChoice.textContent = localStorage.getItem('userChoice');
  }
  if (localStorage.getItem('computerChoice')) {
    computerChoice.textContent = localStorage.getItem('computerChoice');
  }
  if (localStorage.getItem('results')) {
    gameResults.innerHTML = localStorage.getItem('results');
    gameResults.style.color = getResultColor(localStorage.getItem('results'));
  }
}

function getResultColor(result) {
  if (result === 'You Win!') {
    return 'green';
  } else if (result === 'You lose! Computer Wins.') {
    return 'red';
  } else if (result === 'It is a tie!') {
    return 'black';
  }
}

// Loops through all buttons and adds event listener to each
const buttons = document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', userWeapon);
});

// Loads previous game results on page load
window.addEventListener('DOMContentLoaded', loadGameResults);
