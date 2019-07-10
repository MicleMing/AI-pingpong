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

  score = {
    scoreA: 0,
    scoreB: 0
  }

  play() {
    $("#paddleA").css("top", "70px");
    $("#paddleB").css("top", "100px");
    this.game();
  }

  game() {
    this.timer = setInterval(this.gameloop.bind(this), 30);
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
      const top = parseInt($("#paddleA").css("top"));
      if (top > 0) {
        $("#paddleA").css("top", top - 5);
      }
    }
    if (this.presskeys[key.down]) {
      const down = parseInt($("#paddleA").css("top"));
      if (down < paddleTop) {
        $("#paddleA").css("top", down + 5);
      }
    }
    if (this.presskeys[key.w]) {
      const top = parseInt($("#paddleB").css("top"));
      if (top > 0) {
        $("#paddleB").css("top", top - 5);
      }
    }
    if (this.presskeys[key.s]) {
      const down = parseInt($("#paddleB").css("top"));
      if (down < paddleTop) {
        $("#paddleB").css("top", down + 5);
      }
    }
  }

  moveBall() {
    const playwidth = parseInt($("#playground").css("width"));
    const playheight = parseInt($("#playground").css("height"));
    const paddleAleft = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
    const paddleBleft = parseInt($("#paddleB").css("left"));
    const paddleAtop = parseInt($("#paddleA").css("top"));
    const paddleBtop = parseInt($("#paddleB").css("top"))
    const paddleAbottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
    const paddleBbottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
    const ballLeft = this.ball.x + this.ball.speed * this.ball.directionX;
    const ballTop = this.ball.y + this.ball.speed * this.ball.directionY;
    //A win
    if (ballLeft + this.ball.width >= playwidth) {
      this.ball.x = 300;
      this.ball.y = 150;
      $("#ball").css({ "top": this.ball.y, "left": this.ball.x });
      this.ball.directionX *= 1;
      this.score.scoreA++;
      $("#A").html("A:" + this.score.scoreA);
    }
    //B win
    if (ballLeft <= 0) {
      this.ball.x = 300;
      this.ball.y = 150;
      $("#ball").css({ "top": this.ball.y, "left": this.ball.x });
      this.ball.directionX *= -1;
      this.score.scoreB++;
      $("#B").html("B:" + this.score.scoreB);
    }

    if (ballTop <= 0 || ballTop + this.ball.width >= playheight) {
      this.ball.directionY *= -1;
    }
    if (ballLeft <= paddleAleft) {
      if (ballTop >= paddleAtop && ballTop <= paddleAbottom) {
        this.ball.directionX = 1;
      }
    }
    if (ballLeft + this.ball.width >= paddleBleft) {
      if (ballTop >= paddleBtop && ballTop <= paddleBbottom) {
        this.ball.directionX = -1;
      }
    }
    this.ball.x = this.ball.x + this.ball.speed * this.ball.directionX;
    this.ball.y = this.ball.y + this.ball.speed * this.ball.directionY;
    $("#ball").css({ "left": this.ball.x, "top": this.ball.y });
  }
}
