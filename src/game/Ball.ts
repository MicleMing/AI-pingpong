
import $ from 'jquery';

type Direction = 1 | -1;
interface IBall {
  speed: number;
  x: number;
  y: number;
  width: number;
  directionX: Direction;
  directionY: Direction;
}

export default class Ball {
  private ball: IBall = {
    speed: 2,
    x: 150,
    y: 200,
    width: 20,
    directionX: 1,
    directionY: 1
  }

  constructor() {
    this.createBall();
  }

  getBall() {
    return this.ball;
  }

  setDirectionX(dx: Direction) {
    this.ball.directionX = dx;
  }

  setDirectionY(dy: Direction) {
    this.ball.directionY = dy;
  }

  reverseDirectionY() {
    this.ball.directionY *= -1;
  }

  setPostion(x: number, y: number) {
    this.ball.x = x;
    this.ball.y = y;
    $("#ball").css({ "left": this.ball.x, "top": this.ball.y });
  }

  createBall() {
    const ball = document.createElement('div');
    ball.setAttribute('id', 'ball');
    $('#playground').append(ball);
  }

  move() {
    const x = this.ball.x + this.ball.speed * this.ball.directionX;
    const y = this.ball.y + this.ball.speed * this.ball.directionY;
    this.setPostion(x, y);
  }

  getPostion() {
    const left = this.ball.x + this.ball.speed * this.ball.directionX;
    const top = this.ball.y + this.ball.speed * this.ball.directionY;
    return {
      left,
      top,
      dx: this.ball.directionX,
      dy: this.ball.directionY,
    };
  }
}
