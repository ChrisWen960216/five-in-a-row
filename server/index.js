const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const initStateFunction = require('./config');
const player = {
  white: null,
  black: null
};
let initState = initStateFunction();

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

io.on('connection', function(socket) {
  socket.on('ChessBoard', function(syncState) {
    initState = syncState;
    socket.broadcast.emit('ChessBoard', initState);
  });
  socket.on('InitState', function() {
    io.emit('InitState', initState);
  });
  socket.on('ChoosePlayer', function(role) {
    if (player[role] === null) {
      player[role] = socket.id;
      socket.emit('ChoosePlayer', role);
    }
  });
  socket.on('disconnect', function() {
    for (let v in player) {
      if (player[v] === socket.id) {
        player[v] = null;
        const message = {
          side: player[v],
          player: socket.id
        };
        socket.emit('PlayerQuit', message);
      }
    }
  });
});

http.listen(8080, function() {
  console.log('listening on *:8080');
});
