export const part1 = (input) => {
  const result = parse(input)
    .map(allDiffs)
    .map(extrapolateLast)
    .reduce((acc, curr) => acc + curr)

  console.log(result);
}

export const part2 = (input) => {
  const result = parse(input)
    .map(allDiffs)
    .map(extrapolateFirst)
    .reduce((acc, curr) => acc + curr)

  console.log(result);
}

export const parse = (input) => input
  .split("\n")
  .map((row) => row
    .split(" ")
    .map(Number)
  )

export const diff = (value) => value
  .map((v, i, a) => i < a.length ? a[i + 1] - a[i] : null)
  .slice(0, -1);

export const allDiffs = (value) => {
  const diffs = [value];
  while(!diffs.at(-1).every((v) => v === 0)) {
    diffs.push(diff(diffs.at(-1)));
  }
  return diffs;
}

export const extrapolateLast = (diffs) => diffs
  .reduceRight((sum, diffRow) => diffRow.at(-1) + sum, 0);

export const extrapolateFirst = (diffs) => diffs
  .reduceRight((sum, diffRow) => diffRow.at(0) - sum, 0);