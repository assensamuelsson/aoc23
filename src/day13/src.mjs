export const part1 = (input) => {
  const result = parse(input)
    .map(matrixScore(isMirrorRow))
    .reduce((acc, curr) => acc + curr);

  console.log(result);
}

export const part2 = (input) => {
  const result = parse(input)
    .map(matrixScore(isMirrorRowWithSmudge))
    .reduce((acc, curr) => acc + curr);

  console.log(result);
}

export const transpose = (matrix) => Array.from(
  { length: matrix[0].length },
  (_, c) => Array.from(
    { length: matrix.length },
    (_, r) => matrix[r].at(c)
  ).join(""))


export const parse = (input) => input
  .split("\n\n")
  .map((matrix) => ({
    original: matrix.split("\n"),
    transposed: transpose(matrix.split("\n")),
  }));

export const isMirrorRow = (matrix, row) => {
  for (let t = 1; row - t >= 0 && row + t - 1 < matrix.length; t++) {
    const upperRow = matrix[row - t];
    const lowerRow = matrix[row + t - 1];
    if (upperRow !== lowerRow) return false;
  }
  return true;
}

export const matrixScore = (isMirrorRowChecker) => ({ original, transposed }) => {
  for (let r = 1; r < original.length; r++) {
    if (isMirrorRowChecker(original, r)) return 100 * r;
  }
  for (let r = 1; r < transposed.length; r++) {
    if (isMirrorRowChecker(transposed, r)) return r;
  }
  return 0;
}

export const stringDifference = (s1, s2) => s1
  .split("")
  .map((v, i) => v === s2.at(i) ? 0 : 1)
  .reduce((acc, curr) => acc + curr);

export const isMirrorRowWithSmudge = (matrix, row) => {
  let differences = 0;
  for (let t = 1; row - t >= 0 && row + t - 1 < matrix.length; t++) {
    const upperRow = matrix[row - t];
    const lowerRow = matrix[row + t - 1];
    differences += stringDifference(upperRow, lowerRow);
    if (differences > 1) return false;
  }
  return differences === 1;
}

