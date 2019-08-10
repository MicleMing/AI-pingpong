import Ball from './Ball';
import Paddle from './Paddle';
export default class PingPong {
    presskeys: Object;
    ball: Ball;
    paddleGroup: Paddle[];
    timer: any;
    generation: number;
    play(): void;
    createPaddles(): Paddle[];
    start(): void;
    stop(): void;
    game(): void;
    gameloop(): void;
    movePaddles(): void;
    moveBall(): void;
    pickTops(): Paddle[];
    nextGen(num?: number): void;
}
