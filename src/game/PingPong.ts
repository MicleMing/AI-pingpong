import $ from 'jquery';
import Ball from './Ball';
import Paddle from './Paddle';
import NNGenetic from '../nn-genetic';

const MAX_GENERATION = 20;
const COUNTS_GENERATION = 50;
const BG_WIDTH = 600;
const BG_HEIGHT = 400;

const createArray = (num: number) => (new Array(num)).fill(undefined)

export default class PingPong {
  presskeys: Object = {};
  ball: Ball;
  paddleGroup: Paddle[];
  timer: any = null;
  generation: number = 0;

  play() {
    $("#paddle").css("top", "100px");
    this.ball = new Ball();
    this.paddleGroup = this.createPaddles();
    this.game();
  }

  createPaddles() {
    return createArray(COUNTS_GENERATION)
      .map((value, index) => {
        const brain = new NNGenetic({
          inputNodes: 5, // paddle top, d_x, d_y, left, top
          hiddenNodes: 8,
          outputNodes: 1
        })
        return new Paddle(`paddle_${index}`, brain);
      });
  }

  start() {
    if (!this.timer) {
      this.timer = setInterval(this.gameloop.bind(this), 5);
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  game() {
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
    const { left, top, dx, dy } = this.ball.getPostion();
    const ball = this.ball.getBall();
    const nLeft = left / (BG_WIDTH - ball.width);
    const nTop = top / (BG_HEIGHT - ball.width);
    const ballInputs = [nLeft, nTop, dx, dy];
    this.paddleGroup.forEach((paddle) => paddle.move(ballInputs));
  }

  moveBall() {
    const playheight = parseInt($("#playground").css("height"));
    const { left, top } = this.ball.getPostion();

    // Lost and restart
    const alivePaddle = this.paddleGroup.filter(paddle => paddle.isAlive);

    if (!alivePaddle.length) {
      if (this.generation === MAX_GENERATION) {
        alert('Game finished!');
        clearInterval(this.timer);
        return;
      }
      this.nextGen();
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

  pickTops(): Paddle[] {
    const paddles = this.paddleGroup
      .sort((p1, p2) => p2.fitness - p1.fitness);
    return paddles.slice(0, 2);
  }

  nextGen(num: number = COUNTS_GENERATION) {
    this.generation += 1;
    $("#generation").text(`generation: ${this.generation}`);
    const tops = this.pickTops();
    const top1 = tops[0];
    const top2 = tops[1];

    const top1Widgets = top1.brain.getWeights();
    const top2Widgets = top2.brain.getWeights();

    this.paddleGroup = [];
    createArray(num)
      .map((value, index) => {
        const brain = new NNGenetic({
          inputNodes: 5, // paddle top, d_x, d_y, left, top
          hiddenNodes: 10,
          outputNodes: 1
        });
        if (top1.fitness) {
          const w1 = brain.crossover(top1Widgets.w1, top2Widgets.w1);
          const w2 = brain.crossover(top1Widgets.w2, top2Widgets.w2);
          const mw1 = brain.mutate(w1, 0.1);
          const mw2 = brain.mutate(w2, 0.1);
          brain.setWeights(mw1, mw2);
        }
        const paddle = new Paddle(`paddle_${index}`, brain);
        this.paddleGroup.push(paddle);
      });
  }
}
