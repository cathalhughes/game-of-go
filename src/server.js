
var express = require('express');
var app = express();

var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Go listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

var io = require('socket.io').listen(server);
let connections = []

io.sockets.on('connection',
  function (socket) {
    connections.push(socket);
    console.log("Client connected");
    socket.on('mouse',
      function(data) {
        console.log("Received: 'mouse' " + data.x + " " + data.y);
        connections.forEach(socket => socket.emit('mouse', data));
      }
    );
    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);
