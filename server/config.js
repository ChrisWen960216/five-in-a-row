/* Creaetd By ChrisWen
 * 17/11/16
 * 五子棋数据储存
 */

// 棋盘
function initState() {
  const chessBoard = [];
  for (let i = 0;i < 15;i++) {
    chessBoard[i] = [];
    for (let j = 0;j < 15;j++) {
      chessBoard[i][j] = 0;
    }
  }
  const initState = {
    chessBoard: chessBoard,
    me: true
  };
  return initState;
}

module.exports = initState;
