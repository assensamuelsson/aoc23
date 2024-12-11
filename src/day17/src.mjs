export const part1 = (input) => {
  // const matrix = parse(input);
  // console.log(matrix);

  const matrix = [
    [1, 5, 1],
    [6, 7, 2],
    [6, 7, 1],
  ];
  
  const result = minHeatLoss(matrix, [0, 0]);

  console.log(result);
}

export const part2 = (input) => {
  const result = 0;

  console.log(result);
}

export const parse = (input) => input
  .split("\n")
  .map((row) => row.split("").map(Number))

const minHeatLoss = (matrix, p, acc = 0, path = [], memo = {}) => {
  const key = `${p[0]},${p[1]}`;
  if (key in memo && memo[key] < acc) return Infinity;

  const rows = matrix.length;
  const cols = matrix[0].length;

  if (p[0] === cols - 1 && p[1] === rows - 1) return acc;
  if (path.find((v) => v[0] === p[0] && v[1] === p[1])) return Infinity;

  const cameFrom = path.at(-1);

  const nexts = [
    [p[0] + 1, p[1]],
    [p[0] - 1, p[1]],
    [p[0], p[1] + 1],
    [p[0], p[1] - 1],
  ]
    .filter((p) => p[0] >= 0 && p[0] < cols && p[1] >= 0 && p[1] < rows)
    .filter((p) => !cameFrom || !(cameFrom[0] === p[0] && cameFrom[1] === p[1]) );

  memo[key] = Math.min(
    ...nexts.map((next) => minHeatLoss(matrix, next, acc + matrix[next[1]][next[0]], [...path, p]))
  );
  return memo[key];
}