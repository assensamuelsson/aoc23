import assert, { strictEqual, deepStrictEqual } from 'node:assert';
import { it, describe } from 'node:test';

import {
  extractGameInfo,
  isGamePossible,
  fewestPossibleCubes,
  calcSetPower,
 } from './src.mjs';

describe('day2', () => {
  it('Extracts correct game info', () => {
    deepStrictEqual(
      extractGameInfo('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'), {
        id: 1,
        sets: [
          { blue: 3, red: 4, green: 0},
          { blue: 6, red: 1, green: 2},
          { blue: 0, red: 0, green: 2},
        ]
      });
    deepStrictEqual(
      extractGameInfo('Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'), {
        id: 2,
        sets: [
          { blue: 1, red: 0, green: 2},
          { blue: 4, red: 1, green: 3},
          { blue: 1, red: 0, green: 1},
        ]
      });
  });

  it('Determines if games is possible', () => {
    const maxCubes = { red: 12, green: 13, blue: 14}; 
    assert(isGamePossible(maxCubes)({
      id: 1,
      sets: [
        { blue: 3, red: 4, green: 0 },
        { blue: 6, red: 1, green: 2 },
        { blue: 0, red: 0, green: 2 },
      ]
    }))
    assert(!isGamePossible(maxCubes)({
      id: 3,
      sets: [
        { blue: 6, red: 20, green: 8 },
        { blue: 4, red: 5, green: 13 },
        { blue: 0, red: 1, green: 5 },
      ]
    }))
  });

  it('Calculates fewest possible cubes', () => {
    deepStrictEqual(fewestPossibleCubes({
      id: 1,
      sets: [
        { blue: 3, red: 4, green: 0 },
        { blue: 6, red: 1, green: 2 },
        { blue: 0, red: 0, green: 2 },
      ]
    }), { blue: 6, red: 4, green: 2});
    deepStrictEqual(fewestPossibleCubes({
      id: 3,
      sets: [
        { blue: 6, red: 20, green: 8 },
        { blue: 4, red: 5, green: 13 },
        { blue: 0, red: 1, green: 5 },
      ]
    }), { blue: 6, red: 20, green: 13});
  });

  it('Calculates set power correctly', () => {
    strictEqual(calcSetPower({ green: 1, blue: 1, red: 1}), 1);
    strictEqual(calcSetPower({ green: 10, blue: 5, red: 2}), 100);
  });
})
