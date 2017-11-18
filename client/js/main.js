// 引入socket全局变量
const socket = io();
let chessBoard = [];
let me, id, playerList, watcher = false;

// 同步棋盘
socket.on('ChessBoard', (syncState) => {
  console.log('收到了状态', syncState, me);
  if (!syncState.watcher) {
    playerList = syncState.playerList;
    chessBoard = syncState.chessBoard;
    if (syncState.me === 'black') {
      me = 'white';
    } else if (syncState.me === 'white') {
      me = 'black';
    }
  } else {
    watcher = true;
  }
  syncChessBoard(chessBoard);
  // wait.style.display = 'none';
});

// 监听选择角色
socket.on('ChoosePlayer', roleMsg => {
  if (roleMsg.role === 'black') {
    me = 'black';
    id = roleMsg.id;
    // console.log(id, me);
  }
  if (roleMsg.role === 'white') {
    me = 'white';
    id = roleMsg.id;
    // console.log(id, me);
  }
});

// 造棋盘
const chess = document.getElementById('chess');
const context = chess.getContext('2d');
context.strokeStyle = '#bfbfbf';

const syncChessBoard = function(chessBoard) {
  console.log('同步棋盘', chessBoard, '玩家', me, '列表', playerList);
  console.log('watcher', watcher);
  for (let i = 0;i < 15;i++) {
    for (let j = 0;j < 15;j++) {
      if (chessBoard[i][j] === 1) {
        oneStep(i, j, 'black');
      }
      if (chessBoard[i][j] === 2) {
        oneStep(i, j, 'white');
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
    if (!initState.watcher) {
      me = initState.me;
      playerList = initState.playerList;
    }
    chessBoard = initState.chessBoard;
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
  if (me === 'black') {
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(1, '#636766');
  } else if (me === 'white') {
    gradient.addColorStop(0, '#d1d1d1');
    gradient.addColorStop(1, '#f9f9f9');
  }
  context.fillStyle = gradient;
  context.fill();// 填充
};
// 下棋
const play = function (e) {
  console.log(`现在玩家${me},之前下的${playerList}`);
  if(me && id) {
    if (playerList !== me && me) {
      const x = e.offsetX;
      const y = e.offsetY;
      const i = Math.floor(x / 30);
      const j = Math.floor(y / 30);
      if (chessBoard[i][j] === 0) {
        oneStep(i, j, me);
        if (me === 'black') {
          chessBoard[i][j] = 1;
        } else if (me === 'white') {
          chessBoard[i][j] = 2;
        }
        const syncState = {
          chessBoard: chessBoard,
          me: me,
          playerList: playerList
        };
        me = null;
        socket.emit('ChessBoard', syncState);
      } else {
        alert('这里不能下...');
      }
    }
  }
};

chess.addEventListener('click', e => { play(e); });
