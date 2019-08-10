/// <reference types="mathjs" />
interface NNStructure {
    inputNodes: number;
    hiddenNodes: number;
    outputNodes: number;
}
export default class NNGenetic {
    private inputNodes;
    private hiddenNodes;
    private outputNodes;
    private weights_in;
    private weights_out;
    private inputs;
    private outputs;
    constructor(props: NNStructure);
    feedforward(inputs: math.Matrix): math.Matrix;
    active(inputs: math.Matrix): import("mathjs").Matrix;
    crossover(w1: math.Matrix, w2: math.Matrix): math.Matrix;
    mutate(weights: math.Matrix, rate: number): import("mathjs").Matrix;
    serialize(): {
        w1: string;
        w2: string;
    };
    getWeights(): {
        w1: import("mathjs").Matrix;
        w2: import("mathjs").Matrix;
    };
    setWeights(w1: math.Matrix, w2: math.Matrix): void;
}
export {};
