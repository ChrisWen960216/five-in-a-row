import React, { Component } from 'react';

import '../style/Board.scss';

export default class Board extends Component {
  componentDidMount() {
    this.drawChessBoard();
  }

  drawChessBoard() {
    const canvas = this._canvas;
    const context = canvas.getContext('2d');
    context.strokeStyle = '#bfbfbf';
    for (let i = 0; i < 15; i++) {
      context.moveTo(15 + i * 30, 15);
      context.lineTo(15 + i * 30, 435);
      context.stroke();
      context.moveTo(15, 15 + i * 30);
      context.lineTo(435, 15 + i * 30);
      context.stroke();
    }
  }

  oneStep(i, j, me) {
    const canvas = this._canvas;
    const context = canvas.getContext('2d');
    const gradient = context.createRadiaGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    context.beginPath();
    context.arc(155 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    context.closePath();
  }

  render() {
    return (
      <canvas id='chessboard' width='450' height='450' ref={canvas => { this._canvas = canvas; }}></canvas>
    );
  }
}
