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

  private widgets_in: math.Matrix;
  private widgets_out: math.Matrix;

  private inputs: math.Matrix;
  private outputs: math.Matrix;

  constructor(props: NNStructure) {
    const { inputNodes, hiddenNodes, outputNodes } = props;
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    this.widgets_in = matrix(random([hiddenNodes, inputNodes], -1, 1));
    this.widgets_out = matrix(random([outputNodes, hiddenNodes], -1, 1));
  }

  feedforward(inputs: math.Matrix): math.Matrix {
    const a1 = addBias(inputs);
    const z2 = matrix(multiply(addBias(this.widgets_in), transpose(a1)));
    const a2 = addBias(this.active(z2));
    const z3 = matrix(multiply(addBias(this.widgets_out), transpose(a2)));
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

  mutate(widgets: math.Matrix, rate: number) {
    return widgets.map((item) => {
      if (rate > Math.random()) {
        return Math.random();
      }
      return item;
    })
  }

  serialize() {
    const w1 = this.widgets_in.toJSON();
    const w2 = this.widgets_out.toJSON();
    console.log('w1:', w1);
    console.log('w2', w2);
  }

  getWidgets() {
    return {
      w1: this.widgets_in,
      w2: this.widgets_out,
    };
  }
  setWidgets(w1: math.Matrix, w2: math.Matrix) {
    this.widgets_in = w1;
    this.widgets_out = w2;
  }
}
