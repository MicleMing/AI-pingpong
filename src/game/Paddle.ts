import $ from 'jquery';

interface IPaddle {
  x: number;
  y: number;
  width: number;
  height: number;
  ele: any
}

export default class Paddle {
  private paddle: IPaddle = {
    x: 550,
    y: 150,
    width: 12,
    height: 40,
    ele: null,
  };
  constructor() {
    const ele = this.createPaddle();
    this.paddle.ele = ele;
    ele.css({
      left: this.paddle.x,
      top: this.paddle.y,
      width: this.paddle.width,
      height: this.paddle.height,
    })
  }
  createPaddle() {
    const paddle = document.createElement('div');
    paddle.setAttribute('class', 'paddle');
    $('#playground').append(paddle);
    return $(paddle);
  }

  getPostion() {
    const left = parseInt(this.paddle.ele.css("left"));
    const top = parseInt(this.paddle.ele.css("top"));
    const bottom = parseInt(this.paddle.ele.css("top")) + this.paddle.height;
    return {
      left,
      top,
      bottom,
    };
  }

  moveUp() {
    const top = parseInt(this.paddle.ele.css("top"));
    if (top > 0) {
      this.paddle.ele.css("top", top - 3);
    }
  }

  moveDown() {
    const paddleTop = parseInt($("#playground").css("height")) - this.paddle.height;
    const top = parseInt(this.paddle.ele.css("top"));
    if (top < paddleTop) {
      this.paddle.ele.css("top", top + 3);
    }
  }
}
