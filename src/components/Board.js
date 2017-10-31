import React, { Component } from 'react';

import '../style/Board.scss';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: true,
      over: false,
      chessBoard: []
    };
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    const chessBoard = [];

    for (let i = 0; i < 15;i++) {
      chessBoard[i] = [];
      for (let j = 0; j < 15; j++) {
        chessBoard[i][j] = 0;
      }
    }
    this.setState({
      chessBoard: chessBoard
    });
  }

  componentDidMount() {
    console.log(this.state);
    this.drawChessBoard();
  }

  componentDidUpdate() {
    console.log(this.state.chessBoard);
    this.win();
    // console.log(this.state);
    // const { chessBoard } = this.state;
    // const whiteWinArray = [];
    // const blackWinArray = [];
    // for (let i = 0; i < 15; i++) {
    //   for (let j = 0; j < 15; j++) {
    //     if (chessBoard[i][j] === 1 && chessBoard[i][j + 1] === 1) {
    //       blackWinArray.push(1);
    //     } else if (chessBoard[i][j] === 2 && chessBoard[i][j + 1] === 2) {
    //       whiteWinArray.push(2);
    //     }
    //     // } else if (whiteWinArray.length === 5 || blackWinArray.length === 5) {
    //     //   alert('游戏结束');
    //     // }
    //     // console.log(whiteWinArray, blackWinArray);
    //     // else if (chessBoard[i][j] === 2) {
    //     //   blackWinArray.push(2);
    //     // } else if (whiteWinArray.length === 5 || blackWinArray.length === 5) {
    //     //   // this.setState({
    //     //   //   over:
    //     //   // }, () => { console.log('游戏结束'); });
    //     // }
    //   }
    // }
    // console.log(whiteWinArray, blackWinArray);
  }

  // 画个棋盘
  drawChessBoard() {
    const canvas = this._canvas;
    const context = canvas.getContext('2d');
    context.strokeStyle = '#bfbfbf';
    for (let i = 0; i < 15; i++) {
      context.moveTo(15, 15 + i * 30);
      context.lineTo(435, 15 + i * 30);
      context.stroke();
      context.moveTo(15 + i * 30, 15);
      context.lineTo(15 + i * 30, 435);
      context.stroke();
    }
  }

  // 绘制每一步的棋子
  oneStep(i, j) {
    const { me } = this.state;
    const canvas = this._canvas;
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    context.closePath();
    if (me) {
      gradient.addColorStop(0, '#0A0A0A');
      gradient.addColorStop(1, '#636766');
    } else {
      gradient.addColorStop(0, '#D1D1D1');
      gradient.addColorStop(1, '#F9F9F9');
    }
    context.fillStyle = gradient;
    context.fill();
  }

  // 用户下棋
  onClick(e) {
    e.persist();
    // const e = ev || window.event;
    const { over, me, chessBoard } = this.state;
    const { nativeEvent } = e;
    if (over === true) {
      return;
    }
    // if (me === false) {
    //   return;
    // }
    const x = nativeEvent.offsetX;
    const y = nativeEvent.offsetY;
    const i = Math.floor(x / 30);
    const j = Math.floor(y / 30);
    if (chessBoard[j][i] === 0) {
      this.oneStep(i, j);
      me ? chessBoard[j][i] = 1 : chessBoard[j][i] = 2;
      this.setState({
        me: !this.state.me
      });
    } else {
      alert('这里不能下喔');
    }
  }

  win() {
    const { chessBoard } = this.state;
    for (let i = 0;i < 14;i++) {
      for (let j = 0;j < 14;j++) {
        if (chessBoard[i][j] === 1 && chessBoard[i + 1][j] === 1 && chessBoard[i + 2][j] === 1 && chessBoard[i + 3][j] === 1 && chessBoard[i + 4][j] === 1) {
          alert('胜利！');
        } else if (chessBoard[i][j] === 1 && chessBoard[i][j + 1] === 1 && chessBoard[i][j + 2] === 1 && chessBoard[i][j + 3] === 1 && chessBoard[i][j + 4] === 1) {
          alert('胜利！');
        } else if (chessBoard[i][j] === 1 && chessBoard[i + 1][j + 1] === 1 && chessBoard[i + 2][j + 2] === 1 && chessBoard[i + 3][j + 3] === 1 && chessBoard[i + 4][j + 4] === 1) {
          alert('胜利！');
        }
      }
    }
  }
  render() {
    return (
      <canvas id='chessboard' width='450' height='450' ref={canvas => { this._canvas = canvas; }} onClick={this.onClick}></canvas>
    );
  }
}
