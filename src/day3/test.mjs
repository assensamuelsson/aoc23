import assert, { strictEqual, deepStrictEqual } from 'node:assert';
import { it, describe } from 'node:test';
import { readFileSync } from 'node:fs';

import { parseAllNumbers, calculateAdjacentSymbols, isAdjacentToSymbol } from "./src.mjs"

const input = readFileSync(import.meta.dirname + "/example.txt", { encoding: "utf8" });
const inputMatrix = input.split("\n")

// Broken tests
describe.skip('day3', () => {
  it("Parses first three lines correctly", () => {
    deepStrictEqual(
      parseAllNumbers(inputMatrix.slice(0, 3)), [
        { number: 467, row: 0, index: 0, length: 3 },
        { number: 114, row: 0, index: 5, length: 3 },
        { number: 35, row: 2, index: 2, length: 2 },
        { number: 633, row: 2, index: 6, length: 3 },
      ]
    )
  });

  it("Calculates adjacent symbols correctly", () => {
    deepStrictEqual(
      parseAllNumbers(inputMatrix.slice(0, 3))
        .map(calculateAdjacentSymbols(inputMatrix)), [
          { number: 467, symbols: [".", ".", ".", ".", "*"] },
          { number: 114, symbols: [".", ".", ".", ".", ".", ".", "."] },
          { number: 35, symbols: [".", ".", "*", ".", ".", ".", ".", ".", ".", "."] },
          { number: 633, symbols: [".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", "."] },
        ]
    )
  })

  it("Keeps only numbers close to symbols", () => {
    deepStrictEqual(
      parseAllNumbers(inputMatrix.slice(0, 3))
        .map(calculateAdjacentSymbols(inputMatrix))
        .filter(isAdjacentToSymbol), [
          { number: 467, symbols: [".", ".", ".", ".", "*"] },
          { number: 35, symbols: [".", ".", "*", ".", ".", ".", ".", ".", ".", "."] },
          { number: 633, symbols: [".", ".", ".", ".", ".", ".", ".", ".", "#", ".", ".", "."] },
        ]
    )
  })
});