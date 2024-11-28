import assert from 'node:assert';
import { it, describe } from 'node:test';
import { readFileSync } from 'node:fs';

import { transpose, parse, isMirrorRow, matrixScore, stringDifference, isMirrorRowWithSmudge } from "./src.mjs";

const input = readFileSync(import.meta.dirname + "/example.txt", { encoding: "utf8" });
const parsed = parse(input);

describe('day13', () => {
  it("transposes a string matrix correctly", () => {
    const matrix = [
      "foo",
      "bar",
      "baz",
      "bax",
    ];
    const expected = [
      "fbbb",
      "oaaa",
      "orzx",
    ]
    assert.deepStrictEqual(transpose(matrix), expected);
  });

  it("parses correctly", () => {
    assert.strictEqual(parsed[0].original[0], "#.##..##.");
    assert.strictEqual(parsed[0].transposed[0], "#.##..#");
  });

  it("should determine if mirror row correctly", () => {
    assert(!isMirrorRow(parsed[0].transposed, 1));
    assert(!isMirrorRow(parsed[0].transposed, 2));
    assert(!isMirrorRow(parsed[0].transposed, 3));
    assert(!isMirrorRow(parsed[0].transposed, 4));
    assert(isMirrorRow(parsed[0].transposed, 5));
    assert(!isMirrorRow(parsed[0].transposed, 6));
    assert(!isMirrorRow(parsed[0].transposed, 7));
    assert(!isMirrorRow(parsed[0].transposed, 8));

    assert(!isMirrorRow(parsed[1].original, 1));
    assert(!isMirrorRow(parsed[1].original, 2));
    assert(!isMirrorRow(parsed[1].original, 3));
    assert(isMirrorRow(parsed[1].original, 4));
    assert(!isMirrorRow(parsed[1].original, 5));
    assert(!isMirrorRow(parsed[1].original, 6));
  });

  it("calcualtes matrix score correctly", () => {
    assert.strictEqual(matrixScore(isMirrorRow)(parsed[0]), 5);
    assert.strictEqual(matrixScore(isMirrorRow)(parsed[1]), 400);
  })

  it("calculates string differences correctly", () => {
    assert.strictEqual(stringDifference("foo", "foo"), 0);
    assert.strictEqual(stringDifference("for", "foo"), 1);
    assert.strictEqual(stringDifference("far", "foo"), 2);
    assert.strictEqual(stringDifference("bar", "foo"), 3);
  });

  it("should determine mirror witch smudge correctly", () => {
    assert(!isMirrorRowWithSmudge(parsed[0].original, 1));
    assert(!isMirrorRowWithSmudge(parsed[0].original, 2));
    assert(isMirrorRowWithSmudge(parsed[0].original, 3));
    assert(!isMirrorRowWithSmudge(parsed[0].original, 4));
    assert(!isMirrorRowWithSmudge(parsed[0].original, 5));
    assert(!isMirrorRowWithSmudge(parsed[0].original, 6));
    
    assert(isMirrorRowWithSmudge(parsed[1].original, 1));
    assert(!isMirrorRowWithSmudge(parsed[1].original, 2));
    assert(!isMirrorRowWithSmudge(parsed[1].original, 3));
    assert(!isMirrorRowWithSmudge(parsed[1].original, 4));
    assert(!isMirrorRowWithSmudge(parsed[1].original, 5));
    assert(!isMirrorRowWithSmudge(parsed[1].original, 6)); 
  });
});
