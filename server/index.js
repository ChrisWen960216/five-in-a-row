const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

io.on('connection', function(socket) {
  socket.on('ChessBoard', function(syncState) {
    io.emit('ChessBoard', syncState);
    console.log('alreadySendState', syncState.me);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
