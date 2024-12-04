import assert from 'node:assert';
import { it, describe } from 'node:test';
import { readFileSync } from 'node:fs';

import { parse } from "./src.mjs";

const input = readFileSync(import.meta.dirname + "/example.txt", { encoding: "utf8" });

describe('day14', () => {
  it("parses correctly", () => {
    const { rows, cols, rounded } = parse(input);

    assert.strictEqual(rows, 10);
    assert.strictEqual(cols, 10);
    assert.strictEqual(rounded.length, 18);
  })
});
