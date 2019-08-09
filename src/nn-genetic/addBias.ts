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

export const addOnes = (mat: math.Matrix): math.Matrix => {
  const size = mat.size();
  const one = ones([size[0], 1]);
  return <math.Matrix>concat(one, mat);

}

export default addBias;
