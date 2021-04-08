let direction = {
  prev: 1,
  curr: 1
}
let snake;
let move;
let score = document.getElementById('score');
let prevNav = true;

function moveSnake(){
  snake.move(direction.curr);
  move = setInterval(() => {
    snake.move(direction.curr);
  }, 300)
}

function stopSnake() {
  clearInterval(move);
}

function changeDirection(key){
  direction.prev = direction.curr;
  switch(key){
    case 'ArrowDown':
      if(direction.curr === -20) break;
      direction.curr = 20;
      break;
    case 'ArrowRight':
      if(direction.curr === -1) break;
      direction.curr = 1;
      break;
    case 'ArrowLeft': 
      if(direction.curr === 1) break;
      direction.curr = -1;
      break;
    case 'ArrowUp':
      if(direction.curr === 20) break;
      direction.curr = -20;
      break;
  }  
}

document.body.addEventListener('keydown', e => {
  if(prevNav) return;
  changeDirection(e.key);
})

function navigationViaButton(button){
  if(prevNav) return;
  changeDirection(button.name)
}

