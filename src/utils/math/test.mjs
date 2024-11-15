import assert from 'node:assert';
import { it, describe } from 'node:test';

import math from "./index.mjs";

describe('Math utils', () => {
  describe('greatestCommonDivisor', () => { 
    [
      { input: [10, 20], expected: 10},
      { input: [2, 3], expected: 1},
      { input: [16271, 24253, 13201, 14429, 18113, 22411], expected: 307},
    ].forEach(({ input, expected }) => {
      it(`greatest common divisor of ${input.join(" ")} should be ${expected}`, () => {
        assert.strictEqual(math.greatestCommonDivisor(input), expected);
      });
    })
  });

  describe('leastCommonMultiple', () => {
    [
      { input: [2, 3], expected: 6 },
      { input: [16271, 24253, 13201, 14429, 18113, 22411], expected: 11188774513823 },
    ].forEach(({ input, expected }) => {
      it(`least common multiple of ${input.join(" ")} should be ${expected}`, () => {
        assert.strictEqual(math.leastCommonMultiple(input), expected);
      });
    })
  })
});
