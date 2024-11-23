import utils from "../utils/index.mjs"

export const part1 = (input) => {
  const galaxies = parse(input);
  const result = utils.array.uniquePairs(galaxies)
    .reduce((sum, [ga, gb]) => sum + manhattanDistance(ga, gb), 0);

  console.log(result);
}

export const part2 = (input) => {
  const galaxies = parse(input, 1000000);
  const result = utils.array.uniquePairs(galaxies)
    .reduce((sum, [ga, gb]) => sum + manhattanDistance(ga, gb), 0);

  console.log(result);
}

export const findEmptyRows = (rows) => rows
  .reduce((empty, row, i) => {
    if (new Set(row.split("")).size === 1) {
      empty.push(i);
    }
    return empty;
  }, []);

export const findEmptyCols = (rows) => {
  const empty = [];
  for (let col = 0; col < rows[0].length; col++) {
    const chars = rows.reduce((s, row) => s.add(row.at(col)), new Set());
    if (chars.size === 1) empty.push(col);
  }
  return empty;
} 

export const parse = (input, multiplier = 2) => {
  const rows = input.split("\n");
  const emptyRows = findEmptyRows(rows);
  const emptyCols = findEmptyCols(rows);

  const galaxies = [];
  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < rows[0].length; col++) {
      if (rows[row].at(col) === ".") continue;
      const emptyRowsAbove = emptyRows.filter((r) => r < row).length;
      const emptyColsToLeft = emptyCols.filter((c) => c < col).length;
      galaxies.push({ x: col + emptyColsToLeft * (multiplier - 1), y: row + emptyRowsAbove * (multiplier - 1) });
    }
  }
  return galaxies;
}

export const manhattanDistance = (pa, pb) => Math.abs(pb.x - pa.x) + Math.abs(pb.y - pa.y);