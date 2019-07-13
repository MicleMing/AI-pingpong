import $ from 'jquery';
import key from './key';

interface IBall {
  speed: number;
  x: number;
  y: number;
  width: number;
  directionX: 1 | -1;
  directionY: 1 | -1;
}

export default class PingPong {
  presskeys: Object = {};
  ball: IBall = {
    speed: 3,
    x: 150,
    y: 100,
    width: 20,
    directionX: 1,
    directionY: 1
  };
  timer: any = null;

  play() {
    $("#paddle").css("top", "100px");
    this.game();
  }


  game() {
    this.timer = setInterval(this.gameloop.bind(this), 10);
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
    const paddleTop = parseInt($("#playground").css("height")) - parseInt($(".paddle").css("height"));
    if (this.presskeys[key.up]) {
      const top = parseInt($("#paddle").css("top"));
      if (top > 0) {
        $("#paddle").css("top", top - 5);
      }
    }
    if (this.presskeys[key.down]) {
      const down = parseInt($("#paddle").css("top"));
      if (down < paddleTop) {
        $("#paddle").css("top", down + 5);
      }
    }
  }

  moveBall() {
    const playwidth = parseInt($("#playground").css("width"));
    const playheight = parseInt($("#playground").css("height"));
    const paddleLeft = parseInt($("#paddle").css("left"));
    const paddleTop = parseInt($("#paddle").css("top"))
    const paddleBottom = parseInt($("#paddle").css("top")) + parseInt($("#paddle").css("height"));
    const ballLeft = this.ball.x + this.ball.speed * this.ball.directionX;
    const ballTop = this.ball.y + this.ball.speed * this.ball.directionY;
    // Lost and restart
    if (ballLeft + this.ball.width >= playwidth) {
      this.ball.x = 300;
      this.ball.y = 150;
      $("#ball").css({ "top": this.ball.y, "left": this.ball.x });
      this.ball.directionX *= 1;
    }

    if (ballTop <= 0 || ballTop + this.ball.width >= playheight) {
      this.ball.directionY *= -1;
    }

    if (ballLeft + this.ball.width <= 0) {
      this.ball.directionX = 1;
    }
    if (ballLeft + this.ball.width >= paddleLeft) {
      if (ballTop >= paddleTop && ballTop <= paddleBottom) {
        this.ball.directionX = -1;
      }
    }
    this.ball.x = this.ball.x + this.ball.speed * this.ball.directionX;
    this.ball.y = this.ball.y + this.ball.speed * this.ball.directionY;
    $("#ball").css({ "left": this.ball.x, "top": this.ball.y });
  }
}
