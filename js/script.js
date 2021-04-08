const board = document.getElementById('board');
let cells = [];

function generateBoard(){
  board.innerHTML = '';
  cells.length = 0;
  for(let i = 0; i < 400; i++) {
    let cell = document.createElement('input');
    cell.classList.add('cell');
    cell.setAttribute('type', 'checkbox');
    cells.push(cell);
    board.appendChild(cell);
  }
}

function startGame(){
  direction = {
    prev: 1,
    curr: 1
  };
  score.innerHTML = 0;
  generateBoard();
  snake = null;
  snake = new Snake(105);
  for(let i = 0; i < 2; i++) snake.grow(false);
  foodGenerator();
  beginCountDown();
}

function beginCountDown(){
  let counts = document.createElement('div');
  counts.classList.add('counts');
  board.appendChild(counts);
  let count = 3;
  let c = setInterval(() => {
    if(count === 0) {
      clearInterval(c);
      counts.remove();
      prevNav = false;
      moveSnake();
    }
    counts.innerHTML = count;
    count--;
  }, 1000)
}


function endScreen(){
  prevNav = true;
  let end = document.createElement('section');
  end.classList.add('end-screen')
  end.innerHTML = `
  <h1>Game Over</h1>
  <br>
  <button onclick="startGame()">ReStart</button>
  `;
  board.appendChild(end);
}


