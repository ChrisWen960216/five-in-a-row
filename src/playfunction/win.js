function win(chessBoard, clickType, clickX, clickY) {
  // clickLocation = chessBoard[i][j]
  // 直线赢法
  /* chessBoard[i+1][j] = 1 ? => chessBoard[i+2][j] = 1 ? chessBoard[i+3][j] = 1 ? chessBoard[i+4][j] = 1 ? => win
   *        ↓
   * chessBoard[i-1][j] = 1 ? => chessBoard[i-2][j] = 1 ? chessBoard[i-3][j] = 1 ? chessBoard[i-4][j] = 1 ? => win
   *        ↓
   * 直线不可能赢 换到别的赢法判断
   */
  const role = clickType;
  // 直线
  for (let i = 0; i < 4; i++) {
    if (chessBoard[clickX + i][clickY] === 2) {
      break;
    }
  }
  // for (let i = 0;i < 14;i++) {
  //   for (let j = 0;j < 14;j++) {
  //     if (chessBoard[i][j] === 1 && chessBoard[i + 1][j] === 1 && chessBoard[i + 2][j] === 1 && chessBoard[i + 3][j] === 1 && chessBoard[i + 4][j] === 1) {
  //       alert('胜利！');
  //     } else if (chessBoard[i][j] === 1 && chessBoard[i][j + 1] === 1 && chessBoard[i][j + 2] === 1 && chessBoard[i][j + 3] === 1 && chessBoard[i][j + 4] === 1) {
  //       alert('胜利！');
  //     } else if (chessBoard[i][j] === 1 && chessBoard[i + 1][j + 1] === 1 && chessBoard[i + 2][j + 2] === 1 && chessBoard[i + 3][j + 3] === 1 && chessBoard[i + 4][j + 4] === 1) {
  //       alert('胜利！');
  //     }
  //   }
  // }
}

module.exports = win();
