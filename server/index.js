const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '../public/server-index.html'));
});

io.on('connection', function(socket) {
  console.log('a user connected');
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
