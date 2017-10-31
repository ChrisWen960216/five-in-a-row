import React, { Component } from 'react';

import '../style/Board.scss';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: true,
      over: false
    };
    this.onClick = this.onClick.bind(this);
  }

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

  onClick(e) {
    e.persist();
    // const e = ev || window.event;
    console.log(e);
    const { over, me } = this.state;
    if (over === true) {
      return;
    }
    // if (me === false) {
    //   return;
    // }

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const i = Math.floor(x / 30);
    const j = Math.floor(y / 30);
    this.oneStep(i, j);
    this.setState({
      me: !this.state.me
    });
  }

  render() {
    return (
      <canvas id='chessboard' width='450' height='450' ref={canvas => { this._canvas = canvas; }} onClick={this.onClick}></canvas>
    );
  }
}
