import patterns from "../utils/patterns/index.mjs";

export const part1 = (input) => {
  const grid = parse(input);

  while(step(grid));
  const result = load(grid);

  console.log(result);
}

export const part2 = (input) => {
  const grid = parse(input);

  const loads = new Set();
  const loadCycles = {};

  const fn = () => {
    spinCycle(grid);
    return load(grid);
  }
  // const pattern = patterns.findPattern(fn, 1);
  // const result = patterns.evalPattern(pattern, 1000000000);
  for (let cycle = 1; cycle <= 1000000000; cycle++) {
    spinCycle(grid);
    const l = load(grid);
    loadCycles[cycle] = l;
    if (loads.has(l)) {
      console.log(`load ${l} found in cycle ${cycle}`);
    }
    loads.add(l);
  }

  // 104663 too low
  // 104650 too low
  104671
  console.log(0);
}

const occupiedKeyGen = ({ x, y }) => `${x},${y}`;

export const parse = (input) => {
  const lines = input.split("\n");
  const rows = lines[0].length;
  const cols = lines.length;

  const allTiles = lines
    .map((line, r) => line
      .split("")
      .map((v, c) => ({ x: c, y: r, v}))
      .filter(({ v }) => v === "O" || v === "#")
    )
    .flat()

  const rounded = allTiles
    .filter(({ v }) => v === "O")
    .map(({ x, y }) => ({ x, y }));

  const cubes = allTiles
    .filter(({ v }) => v === "#")
    .map(({ x, y }) => ({ x, y }));

  const occupied = new Set(allTiles.map(occupiedKeyGen));

  return {
    rows,
    cols,
    rounded,
    cubes,
    occupied,
  };
}

const step = (grid, direction = ({ x, y }) => ({ x, y: y - 1}), valid = ({ x, y }) => y >= 0) => {
  let moved = false;
  for (let i = 0; i < grid.rounded.length; i++) {
    const round = grid.rounded[i];
    const newPos = direction(round);
    const newKey = occupiedKeyGen(newPos);
    if (valid(newPos) && !grid.occupied.has(newKey)) {
      grid.rounded[i] = newPos;
      grid.occupied.add(newKey);
      grid.occupied.delete(occupiedKeyGen(round))
      moved = true;
    }
  }

  return moved;
}

const load = (grid) => grid.rounded
  .reduce((acc, { y }) => acc + grid.rows - y, 0)

const spinCycle = (grid) => {
  const directions = [
    { direction: ({ x, y }) => ({ x, y: y - 1}), valid: ({ x, y }) => y >= 0}, // North
    { direction: ({ x, y }) => ({ x: x - 1, y}), valid: ({ x, y }) => x >= 0}, // West
    { direction: ({ x, y }) => ({ x, y: y + 1}), valid: ({ x, y }) => y < grid.rows}, // South
    { direction: ({ x, y }) => ({ x: x + 1, y}), valid: ({ x, y }) => x < grid.cols}, // East
  ];

  for (const { direction, valid} of directions) {
    while(step(grid, direction, valid));
  }
}