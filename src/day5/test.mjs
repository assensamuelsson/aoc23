import assert from 'node:assert';
import { it, describe } from 'node:test';
import { readFileSync } from 'node:fs';

import { IntRangeSet, parse, applyMapScalarSeeds, applyMapsScalarSeeds, applyMapRangeSeeds, applyMapsRangeSeeds } from "./src.mjs"

const input = readFileSync(import.meta.dirname + "/example.txt", { encoding: "utf8" });

describe('day5', () => {
  it("Instantiates IntRangeSet correctly", () => {
    const irs = new IntRangeSet(1, 5);
    assert.equal(irs.begin, 1);
    assert.equal(irs.end, 5);
  })

  it("Determines equals correctly", () => {
    const irs1 = new IntRangeSet(1, 5);
    const irs2 = new IntRangeSet(1, 6);
    const irs3 = new IntRangeSet(1, 5);

    assert(!irs1.equals(irs2));
    assert(irs1.equals(irs3));
    assert(!irs2.equals(irs3));
  })

  it("Determines empty correctly", () => {
    assert(new IntRangeSet(undefined, undefined).isEmpty());
  })

  it("Determines has correctly", () => {
    const irs = new IntRangeSet(3, 6);
    assert(irs.has(3));
    assert(irs.has(4));
    assert(irs.has(5));
    assert(!irs.has(2));
    assert(!irs.has(6));
  })

  it("Calculates intersection correctly", () => {
    const irs1 = new IntRangeSet(1, 5);
    const irs2 = new IntRangeSet(2, 6);
    const irs3 = new IntRangeSet(3, 7);
    
    assert(irs1.intersection(irs2).equals(new IntRangeSet(2, 5)));
    assert(irs2.intersection(irs1).equals(new IntRangeSet(2, 5)));
    assert(irs1.intersection(irs3).equals(new IntRangeSet(3, 5)));
    assert(irs3.intersection(irs1).equals(new IntRangeSet(3, 5)));
    assert(irs2.intersection(irs3).equals(new IntRangeSet(3, 6)));
    assert(irs3.intersection(irs2).equals(new IntRangeSet(3, 6)));

    assert(new IntRangeSet(79, 93).intersection(new IntRangeSet(98, 100)).isEmpty());
  })

  it("Calculates difference correctly", () => {
    const irs1 = new IntRangeSet(1, 5);
    const irs2 = new IntRangeSet(2, 6);
    const irs3 = new IntRangeSet(3, 7);
    
    assert(irs1.difference(irs2)[0].equals(new IntRangeSet(1, 2)));
    assert.equal(irs1.difference(irs2).length, 1);
    
    assert(irs2.difference(irs1)[0].equals(new IntRangeSet(5, 6)));
    assert.equal(irs2.difference(irs1).length, 1);
  
    assert(irs1.difference(irs3)[0].equals(new IntRangeSet(1, 3)));
    assert.equal(irs1.difference(irs3).length, 1);

    assert(irs3.difference(irs1)[0].equals(new IntRangeSet(5, 7)));
    assert.equal(irs3.difference(irs1).length, 1);

    assert(irs2.difference(irs3)[0].equals(new IntRangeSet(2, 3)));
    assert.equal(irs2.difference(irs3).length, 1);

    assert(irs3.difference(irs2)[0].equals(new IntRangeSet(6, 7)));
    assert.equal(irs3.difference(irs2).length, 1);

    const irs4 = new IntRangeSet(3, 4);
    assert(irs1.difference(irs4)[0].equals(new IntRangeSet(1, 3)));
    assert(irs1.difference(irs4)[1].equals(new IntRangeSet(4, 5)));
    assert.equal(irs1.difference(irs4).length, 2);
  
    assert(irs4.difference(irs1)[0].isEmpty());
    assert.equal(irs4.difference(irs1).length, 1);

    const irs5 = new IntRangeSet(1, 3);
    const irs6 = new IntRangeSet(3, 5);
    assert(irs1.difference(irs5)[0].equals(new IntRangeSet(3, 5)));
    assert.equal(irs1.difference(irs5).length, 1);

    assert(irs5.difference(irs1)[0].isEmpty());
    assert.equal(irs5.difference(irs1).length, 1);

    assert(irs1.difference(irs6)[0].equals(new IntRangeSet(1, 3)));
    assert.equal(irs1.difference(irs6).length, 1);

    assert(irs6.difference(irs1)[0].isEmpty());
    assert.equal(irs6.difference(irs1).length, 1);
  });

  it("Parses correctly", () => {
    const parsed = parse(input);
    assert.deepStrictEqual(parsed.seeds, [79, 14, 55, 13]);

    assert.strictEqual(parsed.maps[0].name, "seed-to-soil");
    assert.strictEqual(parsed.maps[0].map[0].destinationRangeStart, 50);
    assert(parsed.maps[0].map[0].sourceRange.equals(new IntRangeSet(98, 100)));
    assert.strictEqual(parsed.maps[0].map[1].destinationRangeStart, 52);
    assert(parsed.maps[0].map[1].sourceRange.equals(new IntRangeSet(50, 98)));

    assert.strictEqual(parsed.maps[1].name, "soil-to-fertilizer");
    assert.strictEqual(parsed.maps[1].map[0].destinationRangeStart, 0);
    assert(parsed.maps[1].map[0].sourceRange.equals(new IntRangeSet(15, 52)));
    assert.strictEqual(parsed.maps[1].map[1].destinationRangeStart, 37);
    assert(parsed.maps[1].map[1].sourceRange.equals(new IntRangeSet(52, 54)));
    assert.strictEqual(parsed.maps[1].map[2].destinationRangeStart, 39);
    assert(parsed.maps[1].map[2].sourceRange.equals(new IntRangeSet(0, 15)));
  });

  it("Applies maps correctly", () => {
    const parsed = parse(input);

    const soils = applyMapScalarSeeds(parsed.seeds, parsed.maps[0].map);
    assert.deepStrictEqual(soils, [81, 14, 57, 13]);

    const fertilizer = applyMapScalarSeeds(soils, parsed.maps[1].map);
    assert.deepStrictEqual(fertilizer, [81, 53, 57, 52]);
  });

  it("Applies all maps correctly", () => {
    const parsed = parse(input);

    const locations = applyMapsScalarSeeds(parsed);
    assert.deepStrictEqual(locations, [82, 43, 86, 35]);
  });

  it("Parses seeds as ranges correctly", () => {
    const parsed = parse(input, true);

    assert(parsed.seeds[0].equals(new IntRangeSet(79, 93)));
    assert(parsed.seeds[1].equals(new IntRangeSet(55, 68)));
    assert.equal(parsed.seeds.length, 2);
  });

  it("Applies maps correctly for seed ranges", () => {
    const parsed = parse(input, true);

    const soils = applyMapRangeSeeds(parsed.seeds, parsed.maps[0].map);
    assert(soils[0].equals(new IntRangeSet(57, 70)));
    assert(soils[1].equals(new IntRangeSet(81, 95)));
    assert.equal(soils.length, 2);

    const fertilizer = applyMapRangeSeeds(soils, parsed.maps[1].map);
    assert(fertilizer[0].equals(new IntRangeSet(57, 70)));
    assert(fertilizer[1].equals(new IntRangeSet(81, 95)));
    assert.equal(fertilizer.length, 2);

    const water = applyMapRangeSeeds(fertilizer, parsed.maps[2].map);
    assert(water[0].equals(new IntRangeSet(53, 57)));
    assert(water[1].equals(new IntRangeSet(61, 70)));
    assert(water[2].equals(new IntRangeSet(81, 95)));
    assert.equal(water.length, 3);

    const light = applyMapRangeSeeds(water, parsed.maps[3].map);
    assert(light[0].equals(new IntRangeSet(46, 50)));
    assert(light[1].equals(new IntRangeSet(54, 63)));
    assert(light[2].equals(new IntRangeSet(74, 88)));
    assert.equal(light.length, 3);

    const temperature = applyMapRangeSeeds(light, parsed.maps[4].map);
    assert(temperature[0].equals(new IntRangeSet(45, 56)));
    assert(temperature[1].equals(new IntRangeSet(78, 81)));
    assert(temperature[2].equals(new IntRangeSet(82, 86)));
    assert(temperature[3].equals(new IntRangeSet(90, 99)));
    assert.equal(temperature.length, 4);

    const humidity = applyMapRangeSeeds(temperature, parsed.maps[5].map);
    assert(humidity[0].equals(new IntRangeSet(46, 57)));
    assert(humidity[1].equals(new IntRangeSet(78, 81)));
    assert(humidity[2].equals(new IntRangeSet(82, 86)));
    assert(humidity[3].equals(new IntRangeSet(90, 99)));
    assert.equal(humidity.length, 4);

    const location = applyMapRangeSeeds(humidity, parsed.maps[6].map);
    assert(location[0].equals(new IntRangeSet(46, 56)));
    assert(location[1].equals(new IntRangeSet(56, 60)));
    assert(location[2].equals(new IntRangeSet(60, 61)));
    assert(location[3].equals(new IntRangeSet(82, 85)));
    assert(location[4].equals(new IntRangeSet(86, 90)));
    assert(location[5].equals(new IntRangeSet(94, 97)));
    assert(location[6].equals(new IntRangeSet(97, 99)));
    assert.equal(location.length, 7);
  });

  it("Applies all maps correctly for seed ranges", () => {
    const parsed = parse(input, true);

    const location = applyMapsRangeSeeds(parsed);

    assert(location[0].equals(new IntRangeSet(46, 56)));
    assert(location[1].equals(new IntRangeSet(56, 60)));
    assert(location[2].equals(new IntRangeSet(60, 61)));
    assert(location[3].equals(new IntRangeSet(82, 85)));
    assert(location[4].equals(new IntRangeSet(86, 90)));
    assert(location[5].equals(new IntRangeSet(94, 97)));
    assert(location[6].equals(new IntRangeSet(97, 99)));
    assert.equal(location.length, 7);
  })
});