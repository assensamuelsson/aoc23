import assert, { strictEqual, deepStrictEqual } from 'node:assert';
import { it, describe } from 'node:test';
import { readFileSync } from 'node:fs';

import { parseCard } from "./src.mjs"

const input = readFileSync(import.meta.dirname + "/example.txt", { encoding: "utf8" });
const inputRows = input.split("\n")

describe('day4', () => {
  it("Parses first card correctly", () => {
    deepStrictEqual(
      parseCard(inputRows[0]), {
        winning: new Set([41, 48, 83, 86, 17]),
        card: new Set([83, 86, 6, 31, 17, 9, 48, 53])
      }
    )
  });
});