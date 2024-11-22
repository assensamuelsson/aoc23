import assert from 'node:assert';
import { it, describe } from 'node:test';
import { readFileSync } from 'node:fs';

import { parse, findPointsFromStartingPoint, calcDirection, step, nextPoint, directions, stepsToFurthestPoint } from "./src.mjs";

const input1 = readFileSync(import.meta.dirname + "/example1.txt", { encoding: "utf8" });
const input2 = readFileSync(import.meta.dirname + "/example2.txt", { encoding: "utf8" });

describe('day10', () => {
  it("parses example1 correctly", () => {
    assert.deepStrictEqual(parse(input1), {
      tiles: [
        "-L|F7",
        "7S-7|",
        "L|7||",
        "-L-J|",
        "L|-JF",
      ],
      startingPoint: { x: 1, y: 1 },
    });
  });

  it("parses example2 correctly", () => {
    assert.deepStrictEqual(parse(input2), {
      tiles: [
        "7-F7-",
        ".FJ|7",
        "SJLL7",
        "|F--J",
        "LJ.LJ",
      ],
      startingPoint: { x: 0, y: 2 },
    });
  });

  it("finds points next to starting point correctly", () => {
    assert.deepStrictEqual(findPointsFromStartingPoint(parse(input1)), [ { x: 2, y: 1 }, { x: 1, y: 2 } ]);
    assert.deepStrictEqual(findPointsFromStartingPoint(parse(input2)), [ { x: 1, y: 2 }, { x: 0, y: 3 } ]);
  });

  it("calculates direction correctly", () => {
    assert.strictEqual(calcDirection({ x: 1, y: 1 }, { x: 2, y: 1 }), directions.EAST);
    assert.strictEqual(calcDirection({ x: 2, y: 1 }, { x: 1, y: 1 }), directions.WEST);
    assert.strictEqual(calcDirection({ x: 1, y: 1 }, { x: 1, y: 2 }), directions.SOUTH);
    assert.strictEqual(calcDirection({ x: 1, y: 2 }, { x: 1, y: 1 }), directions.NORTH);
  })

  it("steps to correct point", () => {
    assert.deepStrictEqual(step({ x: 1, y: 1 }, directions.EAST), { x: 2, y: 1 });
    assert.deepStrictEqual(step({ x: 2, y: 1 }, directions.WEST), { x: 1, y: 1 });
    assert.deepStrictEqual(step({ x: 1, y: 1 }, directions.SOUTH), { x: 1, y: 2 });
    assert.deepStrictEqual(step({ x: 1, y: 2 }, directions.NORTH), { x: 1, y: 1 });
  })

  it("finds next point correctly", () => {
    const { tiles } = parse(input1);
    assert.deepStrictEqual(nextPoint({ x: 2, y: 1 }, { x: 1, y: 1 }, tiles), { x: 3, y: 1 });
    assert.deepStrictEqual(nextPoint({ x: 3, y: 1 }, { x: 2, y: 1 }, tiles), { x: 3, y: 2 });
    assert.deepStrictEqual(nextPoint({ x: 3, y: 2 }, { x: 3, y: 1 }, tiles), { x: 3, y: 3 });
    assert.deepStrictEqual(nextPoint({ x: 3, y: 3 }, { x: 3, y: 2 }, tiles), { x: 2, y: 3 });
    assert.deepStrictEqual(nextPoint({ x: 2, y: 3 }, { x: 3, y: 3 }, tiles), { x: 1, y: 3 });
    assert.deepStrictEqual(nextPoint({ x: 1, y: 3 }, { x: 2, y: 3 }, tiles), { x: 1, y: 2 });
    assert.deepStrictEqual(nextPoint({ x: 1, y: 2 }, { x: 1, y: 3 }, tiles), { x: 1, y: 1 });
  });

  it("finds steps to furhtest point correctly", () => {
    assert.strictEqual(stepsToFurthestPoint(parse(input1)), 4);
    assert.strictEqual(stepsToFurthestPoint(parse(input2)), 8);
  });
});
