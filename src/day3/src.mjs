export const part1 = (input) => {
  const inputMatrix = input.split("\n");
  const result = parseAllNumbers(inputMatrix)
    .map(calculateAdjacentSymbols(inputMatrix))
    .filter(isAdjacentToSymbol)
    .reduce((acc, { value }) => acc + value, 0);

    console.log('Part1:', result);
}

export const part2 = (input) => {
  const inputMatrix = input.split("\n");
  const result = parseAllStars(inputMatrix)
    .map(calculateAdjacentNumbers(inputMatrix))
    .filter((ratios) => ratios.length === 2)
    .map((ratios) => ratios[0] * ratios[1])
    .reduce((acc, curr) => acc + curr, 0);

  console.log("Part2:", result);
}

const parse = (regex, parseFn) => (inputMatrix) => {
  return inputMatrix
    .map((line, row) => {
      const matches = line.matchAll(regex);
      const results = [];
      for (const match of matches) {
        results.push({ value: parseFn(match[0]), row, index: match.index, length: match[0].length })
      }
      return results;
    })
    .flat();
}

export const parseAllNumbers = parse(/\d+/g, parseInt);
export const parseAllStars = parse(/\*/g, (g) => g);

export const calculateAdjacentSymbols = (inputMatrix) => ({ value, row, index, length }) => {
  const nRows = inputMatrix.length;
  const nCols = inputMatrix[0].length;

  const upperIndices = Array.from({ length: length + 2}, (_, i) => [row - 1, index - 1 + i]);
  const middleIndices = [[row, index - 1], [row, index + length]];
  const lowerIndices = Array.from({ length: length + 2}, (_, i) => [row + 1, index - 1 + i]);
  const allIndicies = upperIndices.concat(middleIndices).concat(lowerIndices);

  const allValidIndices = allIndicies
    .filter(([row, col]) => row >= 0 && row < nRows && col >= 0 && col < nCols)

  return {
    value,
    symbols: allValidIndices.map(([row, col]) => inputMatrix[row].at(col))
  }
}

const invalidSymbols = new Set([".", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
export const isAdjacentToSymbol = ({ symbols }) => {
  const symbolsSet = new Set(symbols);
  return symbolsSet.difference(invalidSymbols).size > 0;
}

export const calculateAdjacentNumbers = (inputMatrix) => ({ row, index }) => {
  const numbers = [];
  const regex = /\d+/g;

  const upperMatches = row > 0 ? inputMatrix[row - 1].matchAll(regex) : [];
  const middleMatches = inputMatrix[row].matchAll(regex);
  const lowerMatches = row < inputMatrix.length - 1 ? inputMatrix[row + 1].matchAll(regex) : [];
  const allMatches = [];
  for (const match of upperMatches) { allMatches.push({ match: match[0], index: match.index })};
  for (const match of middleMatches) { allMatches.push({ match: match[0], index: match.index })};
  for (const match of lowerMatches) { allMatches.push({ match: match[0], index: match.index })};

  const gearRows = new Set([index - 1, index, index + 1]);
  for (const { match, index } of allMatches) {
    const ratioRows = new Set(Array.from({ length: match.length }, (_, i) => index + i));
    if (gearRows.intersection(ratioRows).size > 0) {
      numbers.push(parseInt(match))
    }
  }

  return numbers;
}