// 引入socket全局变量
const socket = io();
const wait = document.getElementById('wait');
let chessBoard = [];
let me;

socket.on('ChessBoard', (syncState) => {
  chessBoard = syncState.chessBoard;
  syncChessBoard(chessBoard);
});

socket.on('ChoosePlayer', role => {
  if (role === 'black') {
    me = true;
  }
  if (role === 'white') {
    me = false;
  }
});
// 造棋盘
const chess = document.getElementById('chess');
const context = chess.getContext('2d');
context.strokeStyle = '#bfbfbf';

const syncChessBoard = function(chessBoard) {
  for (let i = 0;i < 15;i++) {
    for (let j = 0;j < 15;j++) {
      if (chessBoard[i][j] === 1) {
        oneStep(i, j, true);
      }
      if (chessBoard[i][j] === 2) {
        oneStep(i, j, false);
      }
    }
  }
};

// 画棋盘
const drawChessBoard = function() {
  for (let i = 0; i < 15; i++) {
    context.moveTo(15 + i * 30, 15);
    context.lineTo(15 + i * 30, 435);
    context.stroke();
    context.moveTo(15, 15 + i * 30);
    context.lineTo(435, 15 + i * 30);
    context.stroke();
  }
  socket.emit('InitState');
  socket.on('InitState', initState => {
    chessBoard = initState.chessBoard;
    me = initState.me;
    syncChessBoard(chessBoard);
  });
};
drawChessBoard();

// 画棋子
const oneStep = function (i, j, me) {
  context.beginPath();
  context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
  context.closePath();
  const gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
  if (me) {
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(1, '#636766');
  } else if (!me) {
    gradient.addColorStop(0, '#d1d1d1');
    gradient.addColorStop(1, '#f9f9f9');
  }
  context.fillStyle = gradient;
  context.fill();// 填充
};
// 下棋
const play = function (e) {
  const x = e.offsetX;
  const y = e.offsetY;
  const i = Math.floor(x / 30);
  const j = Math.floor(y / 30);
  if (chessBoard[i][j] === 0) {
    oneStep(i, j, me);
    chessBoard[i][j] = me ? 1 : 2;
    const syncState = {
      chessBoard: chessBoard
    };
    socket.emit('ChessBoard', syncState);
    wait.style.display = 'block';
  } else {
    alert('这里不能下...');
  }
};

chess.addEventListener('click', e => { play(e); });
