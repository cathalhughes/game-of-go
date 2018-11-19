let params = {};
window.location.search.slice(1).split(/\&/gi).map(item => item.split(/\=/gi)).forEach(item => params[item[0]] = item[1]);

class Board {
  constructor() {
    this.state = {
      myColor: params.color.slice(0,1),
      positions: [],
      rows: 19,
      scale: 35,
      turn: 'w',
    };

    this.state.positions = new Array(this.state.rows).fill(null).map(item => (new Array(this.state.rows)).fill(null).map(item => null));
    this.placeStone = this.placeStone.bind(this);
    this.renderStones = this.renderStones.bind(this);
  }

  createGrid() {
    let {rows, scale} = this.state;
    background(238, 213, 183);
    stroke(255);
    noFill();
    beginShape();
    for(var y = 0; y < rows; y++){
      for(var x = 0; x < rows; x++){
        let index = (x + y * width);
        stroke(0);
        push();
        translate(x * scale, y * scale);
        pop();
        rect(x * scale, y * scale, scale, scale);
      }
    }
    endShape();
  }

  getNearestCorner(x, y) {
    let {rows, scale} = this.state;

    let actualX = 0;
    let actualY = 0;

    let minTop = 0;
    let minLeft = 0;

    for(let i = 0; i < y; i += scale) {
      minTop = i;
    }

    for(let i = 0; i < x; i += scale) {
      minLeft = i;
    }

    let maxTop = minTop + scale;
    let maxLeft = minLeft + scale;

    actualY = y - minTop < maxTop - y ? minTop : maxTop;
    actualX = x - minLeft < maxLeft - x ? minLeft : maxLeft;

    return {actualX, actualY};
  }

  renderStones() {
    let {positions} = this.state;

    positions.forEach((rows, y) => {
      rows.forEach((cols, x) => {
        if(positions[y][x] === null) {
          return;
        }
        let {color, aX, aY} = positions[y][x];
        
        let colour = (color === 'w') ? 255 : 0;
        fill(colour);
        ellipse(aX, aY, 20, 20);
      })
    });
  }

  placeStone(x, y, socket = false, cb) {
    let {turn, myColor, positions} = this.state;
    if(!socket && turn !== myColor) {
      return;
    }
    let {actualX, actualY} = this.getNearestCorner(x, y);

    let aX = actualX;
    let aY = actualY;
    let posX = actualX / 35;
    let posY = actualY / 35;

    if(positions[posY][posX] === null) {
      this.state.positions[posY][posX] = {aX, aY, color: turn};
      this.state.turn = this.state.turn === 'w' ? 'b' : 'w';
      if(!socket && typeof cb === 'function') {
        cb();
      }
    }
  }

  getTurn() {
    return this.state.turn;
  }

  getColor() {
    return this.state.myColor
  }
}
