import { concat, ones } from 'mathjs';

const addBias = (matrix: math.Matrix): math.Matrix => {
  const size = matrix.size();
  let row = size[0];
  if (size.length > 1) {
    return concat(ones(row, 1), matrix) as math.Matrix;
  }
  return concat(ones(1), matrix) as math.Matrix;
}

export default addBias;
