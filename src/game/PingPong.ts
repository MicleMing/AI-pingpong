import $ from 'jquery';
import { matrix } from 'mathjs';
import Ball from './Ball';
import Paddle from './Paddle';
import key from './key';
import NNGenetic from '../nn-genetic';

let time = 0;

export default class PingPong {
  presskeys: Object = {};
  ball: Ball;
  paddleGroup: Paddle[];
  timer: any = null;

  play() {
    $("#paddle").css("top", "100px");
    this.ball = new Ball();
    this.paddleGroup = this.createPaddles();
    this.game();
  }

  createPaddles() {
    return (new Array(50))
      .fill(undefined)
      .map((value, index) => {
        const brain = new NNGenetic({
          inputNodes: 4, // d_x, d_y, left, top
          hiddenNodes: 8,
          outputNodes: 1
        })
        return new Paddle(`paddle_${index}`, brain);
      });
  }

  game() {
    this.timer = setInterval(this.gameloop.bind(this), 5);
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
    // if (this.presskeys[key.up]) {
    //   this.paddle.moveUp();
    // }
    // if (this.presskeys[key.down]) {
    //   this.paddle.moveDown();
    // }
    const { left, top, dx, dy } = this.ball.getPostion();
    const nLeft = left / (600 - 20);
    const nTop = top / (400 - 20);
    const inputs = matrix([nLeft, nTop, dx, dy]);
    this.paddleGroup.forEach((paddle) => paddle.move(inputs));
  }


  moveBall() {
    const playheight = parseInt($("#playground").css("height"));
    const { left, top } = this.ball.getPostion();

    // Lost and restart
    const alivePaddle = this.paddleGroup.filter(paddle => paddle.isAlive);

    if (!alivePaddle.length) {
      let num = 50
      if (time === 40) {
        num = 1
      }
      this.nextGen(num);
      this.ball.setPostion(300, 150);
    }

    alivePaddle.forEach((paddle) => {
      const paddlePos = paddle.getPostion();
      if (left + this.ball.getBall().width >= paddlePos.left) {
        if (top >= paddlePos.top && top <= paddlePos.bottom) {
          this.ball.setDirectionX(-1);
          paddle.fitness += 1
        } else {
          paddle.failed();
        }
      }
    })

    if (top <= 0 || top + this.ball.getBall().width >= playheight) {
      this.ball.reverseDirectionY();
    }

    if (left + this.ball.getBall().width <= 0) {
      this.ball.setDirectionX(1);
    }

    this.ball.move();
  }

  pickTops() {
    const paddles = this.paddleGroup
      .sort((p1, p2) => p2.fitness - p1.fitness);
    return paddles.slice(0, 2);
  }

  nextGen(num: number) {
    time = time + 1;
    $("#gen").text(`gen: ${time}`)
    const tops = this.pickTops();
    if (tops.length === 1) {
      alert('game over');
      return;
    }
    const top1Widgets = tops[0].brain.getWidgets();
    const top2Widgets = tops[1].brain.getWidgets();
    this.paddleGroup = [];
    (new Array(num))
      .fill(undefined)
      .map((value, index) => {
        const brain = new NNGenetic({
          inputNodes: 4, // d_x, d_y, left, top
          hiddenNodes: 8,
          outputNodes: 1
        })
        if (tops[0].fitness > 0) {
          const w1 = brain.crossover(top1Widgets.w1, top2Widgets.w1);
          const w2 = brain.crossover(top1Widgets.w2, top2Widgets.w2);
          const mw1 = brain.mutate(w1, 0.1);
          const mw2 = brain.mutate(w2, 0.1);
          brain.setWidgets(mw1, mw2);
        }
        const paddle = new Paddle(`paddle_${index}`, brain);
        this.paddleGroup.push(paddle);
      });
  }
}
