let inputDir = { x: 0, y: 0 };
let board = document.querySelector("#board");
const foodSound = new Audio("../assets/food.mp3");
const bgSound = new Audio("../assets/bgsound.mp3");
const turnSound = new Audio("../assets/turn.mp3");
const gameOverSound = new Audio("../assets/gameover.mp3");
let speed = 5;
let snakeArr = [{ x: 12, y: 14 }];
let score = 0;
let lastPaintTime = 0;
let food = { x: 10, y: 11 };

// Main function

function main(ctime) {
  window.requestAnimationFrame(main);
  //   console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameFun();
}

//  Main Game function

function gameFun() {
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    bgSound.pause();
    let inputDir = { x: 0, y: 0 };
    alert(" Game Over!!!... Press Any Key to Play Again");
    score = 0;
    document.querySelector("#score").innerHTML = "Score " + ": " + score;
    snakeArr = [{ x: 12, y: 14 }];
    bgSound.play();
    score = 0;
  }

  //if eaten food ..increase the Snake n update the food
  if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
    foodSound.play();
    score += 1;
    document.querySelector("#score").innerHTML = "Score " + ": " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 15;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //   Move the Snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // show
  board.innerHTML = "";
  //   For Snake

  snakeArr.forEach((e, index) => {
    snakeElem = document.createElement(`div`);
    snakeElem.style.gridColumnStart = e.x;
    snakeElem.style.gridRowStart = e.y;

    if (index == 0) {
      snakeElem.classList.add("snake-head");
    } else {
      snakeElem.classList.add("snake");
    }
    board.appendChild(snakeElem);
  });

  //   For food
  foodElem = document.createElement(`div`);
  foodElem.style.gridColumnStart = food.x;
  foodElem.style.gridRowStart = food.y;
  foodElem.classList.add("food");
  board.appendChild(foodElem);
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  turnSound.play();
  switch (e.key) {
    case "ArrowUp": {
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    }
    case "ArrowDown": {
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    }
    case "ArrowLeft": {
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    }
    case "ArrowRight": {
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    }
    default:
      break;
  }
});

function isCollide(snake) {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      return true;
    }
  }
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  return false;
}
