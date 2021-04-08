function Body(position) {
  this.position = position;
  this.cell = cells[position];
  this.next = null;
}

function Snake(position) {
  this.head = new Body(position);
  this.head.cell.checked = true;
  this.size = 1;

  let isDead = (pos, mag, cell) => {
    let ll = parseInt(pos / 20) * 20 + 19;
    if(!cell) return true;
    switch(mag){
      case 1: 
        if(pos + mag > ll) return true;
      case -1:
        if(pos + mag < ll - 19) return true;
    }
    return false;
  }

  this.move = mag => {
    let cur = this.head;
    let toMovePositions = [];
    let clone = {...this.head};
    let growSnake = false;

    while(clone.next){
      toMovePositions.push(clone.position);
      clone = clone.next;
    }
    clone = null;

    cur.position += mag;

    // check if snake ate itself
    if(toMovePositions.includes(cur.position)) return dead();
    cur.cell = cells[cur.position];
    if(isDead(cur.position - mag, mag, cur.cell)) return dead();

    if(cur.cell.checked === true) growSnake = true;
    cur.cell.checked = true;
    cur = cur.next;

    for(let pos of toMovePositions){
      if(cur.next === null) cur.cell.checked = false;
      cur.position = pos;
      cur.cell = cells[pos];
      cur = cur.next;
    }
    if(growSnake) {
      this.grow();
      foodGenerator();
    }
  }

  this.grow = (incScore = true) => {
    let pos = this.head;
    while(pos.next) pos = pos.next;
    pos.next = new Body(pos.position + (direction.prev * -1));
    pos.next.cell.checked = true;
    if(incScore) score.innerHTML = +score.innerHTML + 1;
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function foodGenerator() {
  let randomCellIndex = random(0, cells.length - 1);
  while(cells[randomCellIndex].checked) randomCellIndex = random(0, cells.length - 1);
  cells[randomCellIndex].checked = true;
}

function dead(){
  endScreen()
  clearInterval(move);
}
