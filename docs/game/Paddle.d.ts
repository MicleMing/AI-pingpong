/// <reference types="jquery" />
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
    isAlive: boolean;
    brain: NNGenetic;
    fitness: number;
    paddle: IPaddleObj;
    constructor(id: string, brain: NNGenetic);
    createPaddle(id: string): JQuery<HTMLDivElement>;
    getPostion(): {
        left: number;
        top: number;
        bottom: number;
    };
    moveUp(): void;
    moveDown(): void;
    move(inputs: number[]): void;
    failed(): void;
}
export {};
