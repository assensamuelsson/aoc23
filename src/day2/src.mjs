export const part1 = (input) => {
  const maxCubes = { red: 12, green: 13, blue: 14};
  const result = input.split('\n')
    .map(extractGameInfo)
    .filter(isGamePossible(maxCubes))
    .reduce((acc, { id }) => acc + id, 0);

  console.log('Part 1:', result);
}

export const part2 = (input) => {
  const result = input.split('\n')
    .map(extractGameInfo)
    .map(fewestPossibleCubes)
    .map(calcSetPower)
    .reduce((acc, curr) => acc + curr, 0);

  console.log('Part2:', result);
}

export const extractGameInfo = (gameInput) => {
  const [idPart, setsPart] = gameInput.split(':').slice(0, 2);
  const id = parseInt(idPart.split(' ')[1]);

  const sets = [];
  for (const rawSet of setsPart.split(';')) {
    const set = { blue: 0, red: 0, green: 0};
    for (const draw of rawSet.trim().split(',')) {
      const [numberPart, colorPart] = draw.trim().split(' ');
      const number = parseInt(numberPart);
      set[colorPart] += number;
    }
    sets.push(set);
  }
 
  return {
    id,
    sets,
  };
}

export const isGamePossible = (maxCubes) => ({ sets }) => (
  sets.every(({red, blue, green}) => red <= maxCubes.red && green <= maxCubes.green && blue <= maxCubes.blue)
)

export const fewestPossibleCubes = ({ sets }) => {
  return sets.reduce((acc, current) => {
    acc.blue = current.blue > acc.blue ? current.blue : acc.blue;
    acc.red = current.red > acc.red ? current.red : acc.red;
    acc.green = current.green > acc.green ? current.green : acc.green;
    return acc;
  }, { red: 0, blue: 0, green: 0});
}

export const calcSetPower = ({ blue, red, green }) => blue * red * green;
