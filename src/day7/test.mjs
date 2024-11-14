import assert from 'node:assert';
import { it, describe } from 'node:test';
import { readFileSync } from 'node:fs';

import { parse, cardFrequencies, handTypes, calculateType, sortFunction } from "./src.mjs";

const input = readFileSync(import.meta.dirname + "/example.txt", { encoding: "utf8" });

describe('day7', () => { 
  it("parses correctly", () => {
    const hands = parse(input);

    assert.deepStrictEqual(hands, [
      { cards: "32T3K", bid: 765 },
      { cards: "T55J5", bid: 684 },
      { cards: "KK677", bid: 28 },
      { cards: "KTJJT", bid: 220 },
      { cards: "QQQJA", bid: 483 },
    ])
  })

  it("Calculates card frequencies correctly", () => {
    const hands = parse(input);

    assert.deepStrictEqual(cardFrequencies(hands[0].cards), {
      "3": 2,
      "2": 1,
      "T": 1,
      "K": 1,
    });
  })

  it("Calculates hand type correctly", () => {
    const hands = parse(input);

    assert.equal(calculateType(hands[0].cards), handTypes.ONE_PAIR);
    assert.equal(calculateType(hands[1].cards), handTypes.THREE_OF_A_KIND);
    assert.equal(calculateType(hands[2].cards), handTypes.TWO_PAIRS);
    assert.equal(calculateType(hands[3].cards), handTypes.TWO_PAIRS);
    assert.equal(calculateType(hands[4].cards), handTypes.THREE_OF_A_KIND);
  })

  it("Sorts hands correctly", () => {
    const hands = parse(input);

    assert.deepStrictEqual(hands.toSorted(sortFunction()), [
      hands[0],
      hands[3],
      hands[2],
      hands[1],
      hands[4],
    ]);
  })

  it("Calculates hand type correctly", () => {
    const hands = parse(input);

    assert.equal(calculateType(hands[0].cards, true), handTypes.ONE_PAIR);
    assert.equal(calculateType(hands[1].cards, true), handTypes.FOUR_OF_A_KIND);
    assert.equal(calculateType(hands[2].cards, true), handTypes.TWO_PAIRS);
    assert.equal(calculateType(hands[3].cards, true), handTypes.FOUR_OF_A_KIND);
    assert.equal(calculateType(hands[4].cards, true), handTypes.FOUR_OF_A_KIND);
    assert.equal(calculateType("JJJJ8", true), handTypes.FIVE_OF_A_KIND)
    assert.equal(calculateType("Q4J94", true), handTypes.THREE_OF_A_KIND)
    assert.equal(calculateType("77587", true), handTypes.THREE_OF_A_KIND)
    assert.equal(calculateType("7333J", true), handTypes.FOUR_OF_A_KIND)
    assert.equal(calculateType("46J82", true), handTypes.ONE_PAIR)
    assert.equal(calculateType("Q9TQJ", true), handTypes.THREE_OF_A_KIND)
    assert.equal(calculateType("ATJTJ", true), handTypes.FOUR_OF_A_KIND)
    assert.equal(calculateType("5QJ55", true), handTypes.FOUR_OF_A_KIND)
  })

  it("Sorts hands with jokers correctly", () => {
    const hands = parse(input);

    assert.deepStrictEqual(hands.toSorted(sortFunction({ jokers: true })), [
      hands[0],
      hands[2],
      hands[1],
      hands[4],
      hands[3],
    ]);
  })
});
