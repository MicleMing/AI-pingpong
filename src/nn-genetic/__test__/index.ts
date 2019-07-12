import { matrix } from 'mathjs';
import NNGenetic from '../index'
import sigmod from '../sigmoid';


const s = sigmod(matrix([-10000, 0, 10000]))

const nn = new NNGenetic({
  inputNodes: 2,
  hiddenNodes: 4,
  outputNodes: 2
});

const inputs = matrix([1, 2]);

const l = nn.feedforward(inputs);

const a = nn.active(l);

console.log(a);
