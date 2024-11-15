import assert from 'node:assert';
import { it, describe } from 'node:test';
import { readFileSync } from 'node:fs';

import { parse, step, countSteps, findStartingNodes, stepsToFirstZNode, countArraySteps } from "./src.mjs";

const input1 = readFileSync(import.meta.dirname + "/example1.txt", { encoding: "utf8" });
const input2 = readFileSync(import.meta.dirname + "/example2.txt", { encoding: "utf8" });
const input3 = readFileSync(import.meta.dirname + "/example3.txt", { encoding: "utf8" });

describe('day7', () => { 
  it("parses example1 correctly", () => {
    const { instructions, network } = parse(input1);

    assert.strictEqual(instructions, "RL")
    assert.deepStrictEqual(network, {
      "AAA": ["BBB", "CCC"],
      "BBB": ["DDD", "EEE"],
      "CCC": ["ZZZ", "GGG"],
      "DDD": ["DDD", "DDD"],
      "EEE": ["EEE", "EEE"],
      "GGG": ["GGG", "GGG"],
      "ZZZ": ["ZZZ", "ZZZ"],
    });
  });

  it("parses example2 correctly", () => {
    const { instructions, network } = parse(input2);

    assert.strictEqual(instructions, "LLR")
    assert.deepStrictEqual(network, {
      "AAA": ["BBB", "BBB"],
      "BBB": ["AAA", "ZZZ"],
      "ZZZ": ["ZZZ", "ZZZ"]
    });
  });

  it("steps through example1 correctly", () => {
    const map = parse(input1);

    let node = "AAA";
    node = step(map, node, 0);
    assert.strictEqual(node, "CCC");
    node = step(map, node, 1);
    assert.strictEqual(node, "ZZZ");
  });

  it("steps through example2 correctly", () => {
    const map = parse(input2);

    let node = "AAA";
    node = step(map, node, 0);
    assert.strictEqual(node, "BBB");
    node = step(map, node, 1);
    assert.strictEqual(node, "AAA");
    node = step(map, node, 2);
    assert.strictEqual(node, "BBB");
    node = step(map, node, 3);
    assert.strictEqual(node, "AAA");
    node = step(map, node, 4);
    assert.strictEqual(node, "BBB");
    node = step(map, node, 5);
    assert.strictEqual(node, "ZZZ");
  });

  it("calculates steps through example1 correctly", () => {
    const map = parse(input1);

    const steps = countSteps(map);

    assert.strictEqual(steps, 2);
  });

  it("calculates steps through example2 correctly", () => {
    const map = parse(input2);

    const steps = countSteps(map);

    assert.strictEqual(steps, 6);
  });

  it("parses example3 correctly", () => {
    const { instructions, network } = parse(input3);

    assert.strictEqual(instructions, "LR")
    assert.deepStrictEqual(network, {
      "11A": ["11B", "XXX"],
      "11B": ["XXX", "11Z"],
      "11Z": ["11B", "XXX"],
      "22A": ["22B", "XXX"],
      "22B": ["22C", "22C"],
      "22C": ["22Z", "22Z"],
      "22Z": ["22B", "22B"],
      "XXX": ["XXX", "XXX"],
    });
  });

  it("finds starting nodes of example 3 correctly", () => {
    const { network } = parse(input3);

    const startingNodes = findStartingNodes(network);

    assert.deepStrictEqual(startingNodes, ["11A", "22A"]);
  });

  it("finds steps to first Z node correctly", () => {
    const map = parse(input3);
    let nodes = findStartingNodes(map.network);

    const steps = stepsToFirstZNode(nodes, map);

    assert.deepStrictEqual(steps, [2, 3]);
  })

  it("counts steps to example3 correctly", () => {
    const map = parse(input3);

    const steps = countArraySteps(map)

    assert.strictEqual(steps, 6);
  })
});
