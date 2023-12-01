export const part1 = (input) => {
  const result = input.split('\n')
    .map(getCalibrationValues)
    .map((value) => parseInt(value))
    .reduce((acc, value) => acc + value, 0);

  console.log('Part1:', result);
}

export const part2 = (input) => {
  const result = input.split('\n')
    .map(getCalibrationValues2)
    .map((value) => parseInt(value))
    .reduce((acc, value) => acc + value, 0);

  console.log('Part2:', result);
}

export const getCalibrationValues = (input) => {
  let first, last;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const parsed = parseInt(char, 10);
    if (parsed >= 0 && parsed <= 9) {
      if (first === undefined) {
        first = char;
      }
      last = char;
    }
  }
  return first + last;
}

export const getNumberTokens = (input) => {
  const numberTokens = [];
  const patterns = [
    { pattern: '1', meaning: '1'},
    { pattern: '2', meaning: '2'},
    { pattern: '3', meaning: '3'},
    { pattern: '4', meaning: '4'},
    { pattern: '5', meaning: '5'},
    { pattern: '6', meaning: '6'},
    { pattern: '7', meaning: '7'},
    { pattern: '8', meaning: '8'},
    { pattern: '9', meaning: '9'},
    { pattern: 'one', meaning: '1'},
    { pattern: 'two', meaning: '2'},
    { pattern: 'three', meaning: '3'},
    { pattern: 'four', meaning: '4'},
    { pattern: 'five', meaning: '5'},
    { pattern: 'six', meaning: '6'},
    { pattern: 'seven', meaning: '7'},
    { pattern: 'eight', meaning: '8'},
    { pattern: 'nine', meaning: '9'},
  ];

  for (const { pattern, meaning } of patterns) {
    const first = input.indexOf(pattern)
    if (first !== -1) {
      numberTokens.push([first, meaning])
    }
    const last = input.lastIndexOf(pattern)
    if (last !== -1 && last !== first) {
      numberTokens.push([last, meaning])
    }
  }

  return numberTokens;
}

export const getCalibrationValues2 = (input) => {
  const tokens = getNumberTokens(input);
  tokens.sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
  return tokens[0][1] + tokens[tokens.length - 1][1]; 
}
