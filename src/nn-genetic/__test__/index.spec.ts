import * as M from 'mathjs';
import NNGenetic from '../index'
import sigmod from '../sigmoid';
import addBias, { addOnes } from '../addBias';

describe("Test for Network Genetic Algorithm", () => {
  it('Add Bias for Matrix', () => {
    const m = addBias(M.matrix([[1, 2], [2, 3], [4, 5]]));
    const size = m.size();
    expect(size).toEqual([3, 3]);

    for (let i = 0; i < 3; i++) {
      const b = m.get([i, 0]);
      expect(b).toBeGreaterThan(-1);
      expect(b).toBeLessThan(1);
    }
  });

  it("Add Bias for Vector", () => {
    const n = addBias(M.matrix([5, 2, 3]));
    const size = n.size();
    expect(size).toEqual([4]);

    const b = n.get([0]);
    expect(b).toBeGreaterThan(-1);
    expect(b).toBeLessThan(1);
  });

  it("Add One for Matrix", () => {
    const m = addOnes(M.matrix([[5, 2], [3, 4], [5, 6]]));
    expect(m.toArray()).toEqual([[1, 5, 2], [1, 3, 4], [1, 5, 6]]);

  })

  it("Sigmod Range", () => {
    const s = sigmod(M.matrix([-10000, 0, 10000]));
    expect(s.toArray()).toEqual([0, 0.5, 1]);
  });

  it("Crossover and mutate", () => {
    const nn1 = new NNGenetic({
      inputNodes: 2,
      hiddenNodes: 4,
      outputNodes: 2
    });

    const w = nn1.crossover(M.matrix([[1, 2], [2, 3], [4, 5]]), M.matrix([[9, 9], [9, 9], [9, 9]]));
    expect(w.size()).toEqual([3, 2]);
    expect(w.toArray()).toEqual([[1, 2], [2, 3], [9, 9]]);

    const mutate1 = nn1.mutate(M.matrix([[1, 2], [2, 3], [4, 5]]), 0.1)
    expect(mutate1.toArray()).toEqual([[1, 2], [2, 3], [4, 5]]);
    const mutate2 = nn1.mutate(M.matrix([[1, 2], [2, 3], [4, 5]]), 0.6);
    expect(mutate2.toArray()).toEqual([[0.5, 0.5], [0.5, 0.5], [0.5, 0.5]]);
  })
});
