import $ from 'jquery';
import Ball from './Ball';
import Paddle from './Paddle';
import key from './key';

export default class PingPong {
  presskeys: Object = {};
  ball: Ball;
  paddle: Paddle;
  timer: any = null;

  play() {
    $("#paddle").css("top", "100px");
    this.ball = new Ball();
    this.paddle = new Paddle();
    this.game();
  }

  game() {
    this.timer = setInterval(this.gameloop.bind(this), 8);
    const presskeys = this.presskeys;
    $(document).keydown(function (e) {
      presskeys[e.which] = true;
    });
    $(document).keyup(function (e) {
      presskeys[e.which] = false;
    });
  }

  gameloop() {
    this.movePaddles();
    this.moveBall();
  }

  movePaddles() {
    if (this.presskeys[key.up]) {
      this.paddle.moveUp();
    }
    if (this.presskeys[key.down]) {
      this.paddle.moveDown();
    }
  }

  moveBall() {
    const playwidth = parseInt($("#playground").css("width"));
    const playheight = parseInt($("#playground").css("height"));
    const paddlePos = this.paddle.getPostion();
    const { left, top } = this.ball.getPostion();
    // Lost and restart
    if (left + this.ball.getBall().width >= playwidth) {
      this.ball.setPostion(300, 150);
      this.ball.setDirectionX(1);
    }

    if (top <= 0 || top + this.ball.getBall().width >= playheight) {
      this.ball.reverseDirectionY();
    }

    if (left + this.ball.getBall().width <= 0) {
      this.ball.setDirectionX(1);
    }
    if (left + this.ball.getBall().width >= paddlePos.left) {
      if (top >= paddlePos.top && top <= paddlePos.bottom) {
        this.ball.setDirectionX(-1);
      }
    }
    this.ball.move();
  }
}
