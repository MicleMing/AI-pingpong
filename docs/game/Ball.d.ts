declare type Direction = 1 | -1;
interface IBall {
    speed: number;
    x: number;
    y: number;
    width: number;
    directionX: Direction;
    directionY: Direction;
}
export default class Ball {
    private ball;
    constructor();
    getBall(): IBall;
    setDirectionX(dx: Direction): void;
    setDirectionY(dy: Direction): void;
    reverseDirectionY(): void;
    setPostion(x: number, y: number): void;
    createBall(): void;
    move(): void;
    getPostion(): {
        left: number;
        top: number;
        dx: Direction;
        dy: Direction;
    };
}
export {};
