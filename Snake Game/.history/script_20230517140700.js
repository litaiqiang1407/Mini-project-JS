const playBoard = document.querySelector(".play-board");

let foodX;
let foodY;

let snakeX = 15;
let snakeY = 15;

let velocityX = 0;
let velocityY = 0;

let bodySnake = [];

let setIntervalId;
let gameOver = false;

const controlDirectionSnake = (e) => {
  if (e.key === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (e.key === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowUp" && velocityY !== -1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY !== 1) {
    velocityX = 0;
    velocityY = 1;
  }
};

const changePositionFood = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  clearInterval(setIntervalId);
};

function initGame() {
  if (!gameOver) {
    handleGameOver();
  }

  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    changePositionFood();
    bodySnake.push([foodX, foodY]);
  }

  for (let i = bodySnake.length - 1; i > 0; i--) {
    bodySnake[i] = bodySnake[i - 1];
  }

  bodySnake[0] = [snakeX, snakeY];
  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX > 30 || snakeX < 1 || snakeY < 1 || snakeY > 30) {
    gameOver = false;
  }

  for (let i = 0; i < bodySnake.length; i++) {
    htmlMarkup += `<div class="snake" style="grid-area: ${bodySnake[i][1]} / ${bodySnake[i][0]}"></div>`;
  }
  playBoard.innerHTML = htmlMarkup;
}

changePositionFood();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", controlDirectionSnake);