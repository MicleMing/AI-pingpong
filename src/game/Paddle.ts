import $ from 'jquery';
import { matrix } from 'mathjs';
import NNGenetic from '../nn-genetic';

interface IPaddleObj {
  x: number;
  y: number;
  width: number;
  height: number;
  ele: JQuery<HTMLDivElement>;
}

interface IPaddle {
  id: string;
  isAlive: boolean;
  fitness: number;
  brain: NNGenetic;
  paddle: IPaddleObj;
}

export default class Paddle implements IPaddle {
  id: string;
  isAlive: boolean = true;
  brain: NNGenetic;
  fitness: number = 0;
  paddle: IPaddleObj = {
    x: 550,
    y: 150,
    width: 12,
    height: 80,
    ele: $('div'),
  };
  constructor(id: string, brain: NNGenetic) {
    const ele = this.createPaddle(id);
    this.paddle.ele = ele;
    this.id = id;
    this.brain = brain;
    ele.css({
      left: this.paddle.x,
      top: this.paddle.y,
      width: this.paddle.width,
      height: this.paddle.height,
    })
  }
  createPaddle(id: string): JQuery<HTMLDivElement> {
    const paddle = document.createElement('div');
    paddle.setAttribute('id', id);
    paddle.setAttribute('class', 'paddle');
    $('#playground').append(paddle);
    $('#alivePaddles .content').append(`<p class=${id}>${id}</p>`);
    $('#diedPaddles .content').empty();
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

  move(inputs: number[]) {
    const { top } = this.getPostion();
    const inputMatrix = matrix(inputs.concat([top / 400]));
    const output = this.brain.feedforward(inputMatrix).toArray();
    if (output[0] > 0.5) {
      this.moveUp();
    } else {
      this.moveDown();
    }
  }

  failed() {
    this.paddle.ele.remove();
    this.isAlive = false;
    $('#alivePaddles .content').find(`.${this.id}`).remove();
    $('#diedPaddles .content').append(`<p class=${this.id}>${this.id}</p>`)
  }
}
