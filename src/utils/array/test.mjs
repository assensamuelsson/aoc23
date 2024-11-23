import assert from 'node:assert';
import { it, describe } from 'node:test';

import array from "./index.mjs";

describe('Array utils', () => {
  describe('uniquePairs', () => { 
    [
      { input: [1, 2, 3, 4], expected: [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]] },
    ].forEach(({ input, expected }) => {
      it(`unique pairs of ${input} should be ${expected}`, () => {
        let i = 0;
        for (const pair of array.uniquePairs(input)) {
          assert.deepStrictEqual(pair, expected[i]);
          i++;
        }
      });
    })
  });
});
