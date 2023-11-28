import assert from 'node:assert';
import { it, describe } from 'node:test';

import { parse } from './src.mjs';

describe('day1', () => {
  it('should pass', () => {
    const input = '1\n2\n3\n4\n5\n6\n7\n8\n9';
    assert.strictEqual(parse(input), 45);
  });
})
