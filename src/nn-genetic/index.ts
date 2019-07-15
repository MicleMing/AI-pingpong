import { random, transpose, multiply, matrix, zeros } from 'mathjs';
import sigmoid from './sigmoid';
import addBias from './addBias';

interface NNStructure {
  inputNodes: number;
  hiddenNodes: number;
  outputNodes: number;
}

export default class NNGenetic {
  private inputNodes: number;
  private hiddenNodes: number;
  private outputNodes: number;

  private weights_in: math.Matrix;
  private weights_out: math.Matrix;

  private inputs: math.Matrix;
  private outputs: math.Matrix;

  constructor(props: NNStructure) {
    const { inputNodes, hiddenNodes, outputNodes } = props;
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    this.weights_in = matrix(random([hiddenNodes, inputNodes], -1, 1));
    this.weights_out = matrix(random([outputNodes, hiddenNodes], -1, 1));
  }

  feedforward(inputs: math.Matrix): math.Matrix {
    const a1 = addBias(inputs);
    const z2 = matrix(multiply(addBias(this.weights_in), transpose(a1)));
    const a2 = addBias(this.active(z2));
    const z3 = matrix(multiply(addBias(this.weights_out), transpose(a2)));
    const a3 = this.active(z3);
    return a3;
  }

  active(inputs: math.Matrix) {
    return sigmoid(inputs);
  }

  crossover(w1: math.Matrix, w2: math.Matrix): math.Matrix {
    const size = w1.size();
    const childW = matrix(zeros(size));
    const x = childW.size()[0] * Math.random();
    return childW.map((item, index) => {
      if (index[0] < x) {
        return w1.get([index[0], index[1]]);
      }
      return w2.get([index[0], index[1]]);
    })
  }

  mutate(weights: math.Matrix, rate: number) {
    return weights.map((item) => {
      if (rate > Math.random()) {
        return Math.random();
      }
      return item;
    })
  }

  serialize() {
    const w1 = this.weights_in.toJSON();
    const w2 = this.weights_out.toJSON();
    console.log('w1:', w1);
    console.log('w2', w2);
  }

  getWeights() {
    return {
      w1: this.weights_in,
      w2: this.weights_out,
    };
  }
  setWeights(w1: math.Matrix, w2: math.Matrix) {
    this.weights_in = w1;
    this.weights_out = w2;
  }
}
