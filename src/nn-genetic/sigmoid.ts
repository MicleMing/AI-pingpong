import { exp, dotMultiply, add, dotDivide } from 'mathjs';

const sigmoid = (x: math.Matrix): math.Matrix => {
  const z = dotMultiply(x, -1) as math.Matrix;
  return dotDivide(1, add(1, exp(z))) as math.Matrix;
};

export default sigmoid;
