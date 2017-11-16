const _black = document.getElementById('black_btn');
const _white = document.getElementById('white_btn');

function choosePlayer(role) { socket.emit('ChoosePlayer', role); }

_black.addEventListener('click', function() { choosePlayer('black'); });
_white.addEventListener('click', function() { choosePlayer('white'); });
