import assert from 'node:assert';
import { it, describe } from 'node:test';
import { readFileSync } from 'node:fs';

import { findEmptyRows, findEmptyCols, parse, manhattanDistance } from "./src.mjs";

const input = readFileSync(import.meta.dirname + "/example.txt", { encoding: "utf8" });
const rows = input.split("\n");

describe('day11', () => {
  it("finds empty rows and columns correctly", () => {
    assert.deepStrictEqual(findEmptyRows(rows), [3, 7]);
    assert.deepStrictEqual(findEmptyCols(rows), [2, 5, 8]);
  });

  it("parses example correctly", () => {
    assert.deepStrictEqual(parse(input), [
      { x: 4, y: 0},
      { x: 9, y: 1 },
      { x: 0, y: 2 },
      { x: 8, y: 5 },
      { x: 1, y: 6 },
      { x: 12, y: 7 },
      { x: 9, y: 10 },
      { x: 0, y: 11 },
      { x: 5, y: 11 },
    ]);
  });

  it("calculates manhattan distance correctly", () => {
    const galaxies = parse(input);
    assert.strictEqual(manhattanDistance({ x: 1, y: 1 }, { x: 2, y: 2 }), 2);
    assert.strictEqual(manhattanDistance(galaxies[0], galaxies[6]), 15);
    assert.strictEqual(manhattanDistance(galaxies[2], galaxies[5]), 17);
    assert.strictEqual(manhattanDistance(galaxies[7], galaxies[8]), 5);
  })
});
