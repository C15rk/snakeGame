let cols = 15;
let rows = 15;
let gridSize = 20;
let winWidth = cols * gridSize;
let winHeight = rows * gridSize;
let food = { x: 0, y: 0 };
let snake = {
  x: 0,
  y: 0,
  xSpeed: 0,
  ySpeed: 0,
  body: [],
};
let score = 0;
let gamePaused = false;
let gameOver = false;
let gameStarted = false;
let fps = 5;

function setup() {
    let canvas = createCanvas(winWidth, winHeight);
    canvas.parent('game-container');
    
    select('#start').mouseClicked(startGame);
    select('#pause').mouseClicked(pauseGame);
    
    // 其他按钮事件
    select('#up').mouseClicked(goUp);
    select('#down').mouseClicked(goDown);
    select('#left').mouseClicked(goLeft);
    select('#right').mouseClicked(goRight);

    frameRate(fps);
    moveFood();
    resetSnake();
}

function draw() {
    background("pink");
    

    if (gameStarted) {
        if (!gamePaused) {
            drawGrid();
            moveSnake();
            checkEdges();
            checkSelf();
            checkFood();
            updateBody();
        }
        drawFood();
        drawSnake();
        
        if (gameOver) {
            displayEndMessage();
            noLoop();
        }
    } else {
        displayStartMessage();
    }
    
}

function drawGrid() {
    stroke(200); // 设置网格线的颜色
    for (let i = 0; i < cols; i++) {
        line(i * gridSize, 0, i * gridSize, winHeight); // 垂直线
    }
    for (let j = 0; j < rows; j++) {
        line(0, j * gridSize, winWidth, j * gridSize); // 水平线
    }
}

function drawFood() {
    let x = food.x * gridSize;
    let y = food.y * gridSize;
    fill("red");
    square(x, y, gridSize);
}

function moveFood() {
    food.x = floor(random(cols));
    food.y = floor(random(rows));
}

function resetSnake() {
    snake.x = floor(cols / 5);
    snake.y = floor(rows / 5);

    snake.xSpeed = 1;
    snake.ySpeed = 0;

    snake.body = [];

    let head = {
        x: snake.x,
        y: snake.y,
    }

    snake.body.push(head);
}

function checkEdges() {
    if (snake.x === cols) {
        gameOver = true;
        return
    }

    if (snake.x === -1) {
        gameOver = true;
        return
    }

    if (snake.y === -1) {
        gameOver = true;
        return
    }

    if (snake.y === rows) {
        gameOver = true;
        return
    }
}

function moveSnake() {
    snake.x += snake.xSpeed;
    snake.y += snake.ySpeed;
}

function updateBody() {
    for (let i = snake.body.length - 1; i > 0; i-=1) {
        snake.body[i].x = snake.body[i - 1].x;
        snake.body[i].y = snake.body[i-1].y
    }

    snake.body[0].x = snake.x;
    snake.body[0].y = snake.y;

}

function drawSnake() {
    fill(random(0, 255), random(0, 255), random(0, 255),);
    for (let segment of snake.body) {
        let x = segment.x * gridSize;
        let y = segment.y * gridSize;
        square(x, y, gridSize);
    }
}

// function changeDir(xSpeed, ySpeed) {
//     snake.xSpeed = xSpeed;
//     snake.ySpeed = ySpeed;
// }

function checkFood() {
    if (snake.x === food.x && snake.y === food.y){
        let segement = {x:-1, y:-1};
        snake.body.push(segement);

        score += 10;
        document.getElementById('score').textContent = score;
        moveFood();
    }
}

function checkSelf() {
    for (let i=1; i < snake.body.length; i += 1) {
        let segment = snake.body[i];
        if (snake.x === segment.x && snake.y === segment.y) {
            gameOver = true;
            return;
        }
    }
}

function goUp() {
    if (snake.ySpeed !== 1) {  // 防止向下时向上移动
        snake.xSpeed = 0;
        snake.ySpeed = -1;
    }
    // snake.xSpeed = 0;
    // snake.ySpeed = -1;
}

function goDown() {
    if (snake.ySpeed !== -1) {  // 防止向上时向下移动
        snake.xSpeed = 0;
        snake.ySpeed = 1;
    }
    // snake.xSpeed = 0;
    // snake.ySpeed = 1;
}

function goLeft() {
    if (snake.xSpeed !== 1) {  // 防止向右时向左移动
        snake.xSpeed = -1;
        snake.ySpeed = 0;
    }
    // snake.xSpeed = -1;
    // snake.ySpeed = 0;
}

function goRight() {
    if (snake.xSpeed !== -1) {  // 防止向左时向右移动
        snake.xSpeed = 1;
        snake.ySpeed = 0;
    }
    // snake.xSpeed = 1;
    // snake.ySpeed = 0;
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        goUp();
    }
    if (keyCode === DOWN_ARROW) {
        goDown();
    }
    if (keyCode === LEFT_ARROW) {
        goLeft();
    }
    if (keyCode === RIGHT_ARROW) {
        goRight();
    }
}

function startGame() {
    score = 0;
    document.getElementById('score').textContent = score;
    gameStarted = true;
    gamePaused = false;
    if (gameOver === true) {
        resetSnake();
        gameOver = false;
    }
    loop();
    
}

function pauseGame() {
    gamePaused = true;
}

//upButton.mouseClicked(goUp);

// Start message.
function displayStartMessage() {
      textSize(20);
      textAlign(CENTER);
      fill(255, 0, 0);
    textFont('Tiny5');
      text('Press   ▶   to   Start', width / 2, height / 2);
}
    
    // End message.
function displayEndMessage() {
      background("pink");
      textSize(30);
      textAlign(CENTER);
      fill(255, 0, 0);
    textFont('Tiny5');
      text('Game Over', width / 2, height / 2);
      textSize(20);
    textFont('Tiny5');
      text('Press   ▶   to   Start', width / 2, height / 2 + 50);
}

// game/script.js


