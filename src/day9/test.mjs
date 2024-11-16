import assert from 'node:assert';
import { it, describe } from 'node:test';
import { readFileSync } from 'node:fs';

import { parse, diff, allDiffs, extrapolateLast, extrapolateFirst } from "./src.mjs";

const input = readFileSync(import.meta.dirname + "/example.txt", { encoding: "utf8" });

describe('day9', () => { 
  it("parses example correctly", () => {
    assert.deepStrictEqual(parse(input), [
      [0, 3, 6, 9, 12, 15 ],
      [1, 3, 6, 10, 15, 21 ],
      [10, 13, 16, 21, 30, 45 ],
    ]);
  });

  it("Calculates diff of the values correctly", () => {
    const parsed = parse(input);

    const v00 = diff(parsed[0]);
    assert.deepStrictEqual(v00, [3, 3, 3, 3, 3]);
    const v01 = diff(v00);
    assert.deepStrictEqual(v01, [0, 0, 0, 0]);
  });

  it("Calculates all diffs of the values correctly", () => {
    const parsed = parse(input);

    assert.deepStrictEqual(allDiffs(parsed[0]), [
      parsed[0],
      [3, 3, 3, 3, 3],
      [0, 0, 0, 0],
    ]);
    assert.deepStrictEqual(allDiffs(parsed[1]), [
      parsed[1],
      [2, 3, 4, 5, 6],
      [1, 1, 1, 1],
      [0, 0, 0]
    ]);
    assert.deepStrictEqual(allDiffs(parsed[2]), [
      parsed[2],
      [3, 3, 5, 9, 15],
      [0, 2, 4, 6],
      [2, 2, 2],
      [0, 0]
    ]);
  });

  it("Extrapolates last correctly", () => {
    const parsed = parse(input);

    assert.strictEqual(extrapolateLast(allDiffs(parsed[0])), 18);
    assert.strictEqual(extrapolateLast(allDiffs(parsed[1])), 28);
    assert.strictEqual(extrapolateLast(allDiffs(parsed[2])), 68);
  })

  it("Extrapolates first correctly", () => {
    const parsed = parse(input);

    assert.strictEqual(extrapolateFirst(allDiffs(parsed[0])), -3);
    assert.strictEqual(extrapolateFirst(allDiffs(parsed[1])), 0);
    assert.strictEqual(extrapolateFirst(allDiffs(parsed[2])), 5);
  })
});
