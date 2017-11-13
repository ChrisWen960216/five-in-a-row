
window.onload = function () {
  const chess = document.getElementById('chess');
  const context = chess.getContext('2d');
  context.strokeStyle = '#bfbfbf';
  // 画棋盘
  const drawChessBoard = function () {
    for (var i = 0; i < 15; i++) {
      context.moveTo(15 + i * 30, 15);
      context.lineTo(15 + i * 30, 435);
      context.stroke();
      context.moveTo(15, 15 + i * 30);
      context.lineTo(435, 15 + i * 30);
      context.stroke();
    }
  };
  drawChessBoard();

  // 画棋子
  const oneStep = function (i, j, me) {
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    if (me) {
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(1, '#636766');
    } else {
      gradient.addColorStop(0, '#d1d1d1');
      gradient.addColorStop(1, '#f9f9f9');
    }
    context.fillStyle = gradient;
    context.fill();// 填充
  };
};
