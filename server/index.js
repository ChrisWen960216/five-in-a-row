const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const initStateFunction = require('./config');
let initState = initStateFunction();

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

io.on('connection', function(socket) {
  socket.on('ChessBoard', function(syncState) {
    initState = syncState;
    io.emit('ChessBoard', initState);
  });
  socket.on('InitState', function() {
    io.emit('InitState', initState);
  });
  socket.on('ChoosePlayer', function(role) {
    socket.emit('ChoosePlayer', role);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
