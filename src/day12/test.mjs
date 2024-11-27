import assert from 'node:assert';
import { it, describe } from 'node:test';
import { readFileSync } from 'node:fs';

import { parse, possibleArrangements } from "./src.mjs";

const input = readFileSync(import.meta.dirname + "/example.txt", { encoding: "utf8" });
const parsed = parse(input);
const realInput = readFileSync(import.meta.dirname + "/input.txt", { encoding: "utf8" });
const realParsed = parse(realInput);

describe('day12', () => {
  it("parses correctly", () => {
    assert.deepStrictEqual(parse(input), [
      { conditionRecord: "???.###", groupSizes: [1, 1, 3] },
      { conditionRecord: ".??..??...?##.", groupSizes: [1, 1, 3] },
      { conditionRecord: "?#?#?#?#?#?#?#?", groupSizes: [1, 3, 1, 6] },
      { conditionRecord: "????.#...#...", groupSizes: [4, 1, 1] },
      { conditionRecord: "????.######..#####.", groupSizes: [1, 6, 5] },
      { conditionRecord: "?###????????", groupSizes: [3, 2, 1] },
    ])
  });

  [
    { input: parsed[0], expected: 1 },
    { input: parsed[1], expected: 4 },
    { input: parsed[2], expected: 1 },
    { input: parsed[3], expected: 1 },
    { input: parsed[4], expected: 4 },
    { input: parsed[5], expected: 10 },
    { input: realParsed[0], expected: 5 },
    { input: realParsed[5], expected: 6 },
  ].forEach(({ input, expected }) => {
    it(`possibleArrangments for ${JSON.stringify(input)} should be ${expected}`, () => {
      assert.strictEqual(possibleArrangements(input), expected);
    })
  })
});
