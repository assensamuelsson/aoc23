import assert from 'node:assert';
import { it, describe } from 'node:test';

import patterns from "./index.mjs";

describe('Patterns utils', () => {
  describe('findPattern', () => {
    const builder = () => {
      let i = 0;
      return () => {
        i++;
        if (i < 10) return Math.round(Math.random() * 100);
        return (i * 2 + 27) % 5;
      }
    }

    it("finds pattern correctly", () => {
      const fn = builder();

      assert.deepStrictEqual(patterns.findPattern(fn), {
        startsAt: 9,
        pattern: [2, 4, 1, 3, 0],
      });
    });
  });

  describe('evalPattern', () => {
    it("evals pattern correctly", () => {
      const pattern = { startsAt: 9, pattern: [2, 4, 1, 3, 0]}
      assert.strictEqual(patterns.evalPattern(pattern, 9), 2);
      assert.strictEqual(patterns.evalPattern(pattern, 100), 4);
    });
  });
});
