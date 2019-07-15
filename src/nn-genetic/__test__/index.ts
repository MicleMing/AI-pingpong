import { matrix, random } from 'mathjs';
import NNGenetic from '../index'
import sigmod from '../sigmoid';
import addBias from '../addBias';


const m = addBias(matrix([[1, 2], [2, 3], [4, 5]]));
const n = addBias(matrix([5, 2, 3]));
console.log(m)
console.log(n)
const s = sigmod(matrix([-10000, 0, 10000]))

const nn1 = new NNGenetic({
  inputNodes: 2,
  hiddenNodes: 4,
  outputNodes: 2
});

const inputs = matrix([1, 2]);

const l = nn1.feedforward(inputs);

const w = nn1.crossover(matrix([[1, 2], [2, 3], [4, 5]]), matrix([[9, 9], [9, 9], [9, 9]]))
const mutate = nn1.mutate(matrix([[1, 2], [2, 3], [4, 5]]), 0.1)

nn1.serialize();
