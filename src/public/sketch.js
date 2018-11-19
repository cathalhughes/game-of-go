let socket;

function setup() {
  createCanvas(675, 675);
  background(238, 213, 183);
  Go = new Board();
  socket = io.connect('52.19.2.193:3000');
  socket.on('mouse',
    (info) => {
      Go.placeStone(info.x, info.y, true);
    }
  );
}

function draw() {
  Go.createGrid();
  Go.renderStones();
}

function mousePressed(e) {
  let {offsetX, offsetY} = e;
  Go.placeStone(offsetX,offsetY, false, () => {
    let data = {
     x: offsetX,
     y: offsetY
    };

    socket.emit('mouse', data);
  });
}
