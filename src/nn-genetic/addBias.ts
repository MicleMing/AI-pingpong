import { concat, ones, random, matrix } from 'mathjs';

const addBias = (mat: math.Matrix): math.Matrix => {
  const size = mat.size();
  let row = size[0];
  if (size.length > 1) {
    const m = matrix([row, 1]);
    const bias = random(m, 1, -1)
    return concat(bias, mat) as math.Matrix;
  }
  return concat([random(-1, 1)], mat) as math.Matrix;

}

export default addBias;
