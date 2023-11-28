export const part1 = (input) => {
  const result = parse(input);
  console.log(`Part 1: ${result}`);
}

export const parse = (input) => input
  .split('\n')
  .map((x) => parseInt(x, 10))
  .reduce((a, b) => a + b, 0);
