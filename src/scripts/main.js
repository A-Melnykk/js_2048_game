/* global Game */
'use strict';

const game = new Game();

function renderBoard() {
  const boardContainer = document.querySelector('.grid-container');

  if (!boardContainer) {
    return;
  }

  boardContainer.innerHTML = '';

  const board = game.board || [];

  board.forEach((row) => {
    row.forEach((cellValue) => {
      const cell = document.createElement('div');

      cell.className = 'grid-cell';

      if (cellValue > 0) {
        cell.textContent = cellValue;
        cell.classList.add(`tile-${cellValue}`);
      }

      boardContainer.appendChild(cell);
    });
  });
}

function renderScore() {
  const scoreElement = document.querySelector('.game-score');

  if (scoreElement && typeof game.getScore === 'function') {
    scoreElement.textContent = game.getScore();
  }
}

function renderStatus() {
  const loseMessage = document.querySelector('.message.message-lose');
  const winMessage = document.querySelector('.message.message-win');

  if (!loseMessage || !winMessage) {
    return;
  }

  if (game.getStatus() === 'lose') {
    loseMessage.classList.remove('hidden');
  } else {
    loseMessage.classList.add('hidden');
  }

  if (game.getStatus() === 'win') {
    winMessage.classList.remove('hidden');
  } else {
    winMessage.classList.add('hidden');
  }
}

document.addEventListener('keydown', (e) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  switch (e.key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
    default:
      return;
  }

  renderBoard();
  renderScore();
  renderStatus();
});

const startButton = document.querySelector('.button.start');
const restartButton = document.querySelector('.button.restart');

if (startButton) {
  startButton.addEventListener('click', () => {
    game.restart();
    game.start();
    renderBoard();
    renderScore();
    renderStatus();
  });
}

if (restartButton) {
  restartButton.addEventListener('click', () => {
    game.restart();
    renderBoard();
    renderScore();
    renderStatus();
  });
}

renderBoard();
renderScore();
renderStatus();
