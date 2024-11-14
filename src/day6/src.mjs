export const part1 = (input) => {
  const result = parse(input)
    .map(possibleWins)
    .reduce((acc, curr) => acc * curr);

  console.log(result);
}

export const part2 = (input) => {
  const result = parsePart2(input)
    .map(possibleWins)
    [0]

  console.log(result);
}

export const parse = (input) => {
  const regex = /\d+/g;
  const rows = input.split("\n");

  const times = [];
  for (const match of rows[0].matchAll(regex)) {
    times.push(Number(match[0]));
  }
  const distances = [];
  for (const match of rows[1].matchAll(regex)) {
    distances.push(Number(match[0]));
  }

  return times.map((t, i) => ({
    time: t,
    distance: distances[i]
  }));
}

export const calculateDistance = ({ held, time }) => {
  if (held === 0 || held === time) return 0;
  return (time - held) * held;
}

export const possibleWins = ({ time, distance }) => {
  return Array.from({ length: time - 1 }, (v, i) => i + 1)
    .map((held) => calculateDistance({ held, time }))
    .filter((d) => d > distance)
    .length;
}

export const parsePart2 = (input) => {
  const regex = /\d+/g;
  const rows = input.split("\n");

  let time = "";
  for (const match of rows[0].matchAll(regex)) {
    time += match[0];
  }
  let distance = "";
  for (const match of rows[1].matchAll(regex)) {
    distance += match[0];
  }

  return [{
    time: Number(time),
    distance: Number(distance)
  }];
}