import assert from 'node:assert';
import { it, describe } from 'node:test';
import { readFileSync } from 'node:fs';

import { parse, calculateDistance, possibleWins, parsePart2 } from "./src.mjs";

const input = readFileSync(import.meta.dirname + "/example.txt", { encoding: "utf8" });

describe('day6', () => { 
  it("parses correctly", () => {
    const parsed = parse(input);

    assert.deepStrictEqual(parsed, [
      { time: 7, distance: 9 },
      { time: 15, distance: 40 },
      { time: 30, distance: 200 },
    ])
  })

  it("Calculates distance correctly", () => {
    assert.equal(calculateDistance({held: 0, time: 7}), 0);
    assert.equal(calculateDistance({held: 1, time: 7}), 6);
    assert.equal(calculateDistance({held: 2, time: 7}), 10);
    assert.equal(calculateDistance({held: 3, time: 7}), 12);
    assert.equal(calculateDistance({held: 4, time: 7}), 12);
    assert.equal(calculateDistance({held: 5, time: 7}), 10);
    assert.equal(calculateDistance({held: 6, time: 7}), 6);
    assert.equal(calculateDistance({held: 7, time: 7}), 0);
  })

  it("Calculates how many possible wins correctly", () => {
    const races = parse(input);
    assert.equal(possibleWins(races[0]), 4);
    assert.equal(possibleWins(races[1]), 8);
    assert.equal(possibleWins(races[2]), 9);
  })

  it("parses part2 correctly", () => {
    assert.deepStrictEqual(parsePart2(input), [
      { time: 71530, distance: 940200 }
    ])
  })
});
