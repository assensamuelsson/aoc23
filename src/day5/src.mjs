export const part1 = (input) => {
  const result = applyMapsScalarSeeds(parse(input))
    .reduce((acc, curr) => curr < acc ? curr : acc, Number.MAX_SAFE_INTEGER);

  console.log(result);
}

export const part2 = (input) => {
  const result = applyMapsRangeSeeds(parse(input, true))
    .reduce((acc, curr) => curr.begin < acc ? curr.begin : acc, Number.MAX_SAFE_INTEGER);

  console.log(result);
}

export class IntRangeSet {
  constructor(begin, end) {
    this.begin = begin;
    this.end = end;
  }

  equals(other) {
    return this.begin === other.begin && this.end === other.end;
  }

  isEmpty() {
    return this.begin === undefined && this.end === undefined;
  }

  has(value) {
    return value >= this.begin && value < this.end;
  }

  intersection(other) {
    if (this.end < other.begin || this.begin > other.end) {
      return new IntRangeSet(undefined, undefined);
    } else {
      return new IntRangeSet(Math.max(this.begin, other.begin), Math.min(this.end, other.end));
    }
  }

  difference(other) {
    if ((this.begin < other.begin && this.end < other.end) || (this.begin < other.begin && this.end <= other.end)) {
      return [new IntRangeSet(this.begin, other.begin)];
    } else if (this.begin < other.begin && this.end > other.end) {
      return [
        new IntRangeSet(this.begin, other.begin),
        new IntRangeSet(other.end, this.end),
      ]
    } else if (other.begin <= this.begin && other.end >= this.end) {
      return [new IntRangeSet(undefined, undefined)];
    } else {
      return [new IntRangeSet(other.end, this.end)];
    }
  }
}

export const parse = (input, seedsAsRange = false) => {
  const parseSeedsAsRange = (row) => {
    const seeds = [];
    const numbers = row.split("seeds: ")[1].split(" ").map(Number);
    for (let i = 0; i < numbers.length; i += 2) {
      seeds.push(new IntRangeSet(numbers[i], numbers[i] + numbers[i + 1]));
    }
    return seeds;
  }

  const rows = input.split("\n");
  const seeds = seedsAsRange
    ? parseSeedsAsRange(rows[0])
    : rows[0].split("seeds: ")[1].split(" ").map(Number);

  const maps = [];
  const regex = /(?<name>.+-to-.+) map:(?<map>(?:\n\d+ \d+ \d+)+)/g;
  for (const match of rows.slice(2).join("\n").matchAll(regex)) {
    const map = match.groups.map
      .trim()
      .split("\n")
      .map((row) => {
        const parts = row.split(" ");
        return {
          destinationRangeStart: Number(parts[0]),
          sourceRange: new IntRangeSet(Number(parts[1]), Number(parts[1]) + Number(parts[2])),
        }
      })
    
    maps.push({
      name: match.groups.name,
      map,
    });
  }

  return { seeds, maps };
}

export const applyMapScalarSeeds = (data, map) => data
  .map((value) => {
    for (const { destinationRangeStart, sourceRange } of map) {
      if (sourceRange.has(value)) {
        const diff = value - sourceRange.begin;
        return destinationRangeStart + diff;
      }
    }
    return value;
  })

export const applyMapsScalarSeeds = ({ seeds, maps }) => {
  let data = structuredClone(seeds);
  for (const { map } of maps) {
    data = applyMapScalarSeeds(data, map);
  }
  return data;
}

export const applyMapRangeSeeds = (data, map) => data
  .map((range) => {
    const mapped = [];
    for (const { destinationRangeStart, sourceRange } of map) {
      if (range.isEmpty()) break;
      if (!range.intersection(sourceRange).isEmpty()) {
        const diff = destinationRangeStart - sourceRange.begin;
        const outside = range.difference(sourceRange)[0];
        if (!outside.isEmpty()) {
          const inside = range.difference(outside)[0];
          mapped.push(new IntRangeSet(inside.begin + diff, inside.end + diff));
          range = outside;
        } else {
          mapped.push(new IntRangeSet(range.begin + diff, range.end + diff))
          range = new IntRangeSet(undefined, undefined);
        }
      }
    }

    if (!range.isEmpty()) {
      mapped.push(range);
    }

    return mapped;
  })
  .flat()
  .toSorted((a, b) => a.begin - b.begin);

  export const applyMapsRangeSeeds = ({ seeds, maps }) => {
    let data = seeds;
    for (const { map } of maps) {
      data = applyMapRangeSeeds(data, map);
    }
    return data;
  }
