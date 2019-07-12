import { exp, dotMultiply, add, dotDivide } from 'mathjs';

const sigmoid = (x: math.Matrix) => {
  const z = dotMultiply(x, -1) as math.Matrix;
  return dotDivide(1, add(1, exp(z)));
};

export default sigmoid;
