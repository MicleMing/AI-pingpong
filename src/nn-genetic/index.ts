import { random, transpose, multiply } from 'mathjs';
import sigmoid from './sigmoid';

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
  private hiddenLayer: math.Matrix;
  private outputs: math.Matrix;

  constructor(props: NNStructure) {
    const { inputNodes, hiddenNodes, outputNodes } = props;
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    this.widgets_in = random([hiddenNodes, inputNodes]) as math.Matrix;
    this.widgets_out = random([outputNodes, hiddenNodes]) as math.Matrix;
  }

  feedforward(inputs: math.Matrix): math.Matrix {
    this.hiddenLayer = multiply(this.widgets_in, transpose(inputs)) as math.Matrix;
    return this.hiddenLayer;
  }

  active(inputs: math.Matrix) {
    return sigmoid(inputs);
  }

  crossover() {

  }

  mutate() {

  }
}
