export const part1 = (input) => {
  const matrix = input.split("\n");
  const result = findEnergized(matrix, { p: [0, 0], v: [1, 0] })

  console.log(result);
}

export const part2 = (input) => {
  const matrix = input.split("\n");
  const rows = matrix.length;
  const cols = matrix[0].length;
  const upperRow = Array.from({ length: cols }, (_, x) => ({ p: [x, 0], v: [0, 1]}));
  const lowerRow = Array.from({ length: cols }, (_, x) => ({ p: [x, rows - 1], v: [0, -1]}));
  const leftRow = Array.from({ length: rows }, (_, y) => ({ p: [0, y], v: [1, 0]}));
  const rightRow = Array.from({ length: rows }, (_, y) => ({ p: [cols - 1, y], v: [-1, 0]}));
  const allStartingBeams = upperRow.concat(lowerRow).concat(leftRow).concat(rightRow);

  const result = allStartingBeams
    .map((beam) => findEnergized(matrix, beam))
    .reduce((acc, curr) => curr > acc ? curr : acc, 0);

  console.log(result);
}

const findEnergized = (matrix, startBeam) => {
  const energized = new Set();
  const loopDetector = new Set();
  let beams = [ startBeam ];

  while(beams.length) {
    beams.forEach(({ p, v }) => {
      energized.add(pKey(p))
      loopDetector.add(pvKey(p, v))
    });
    beams = step(matrix, beams, loopDetector);
  }

  return energized.size;
}

const pKey = (a) => `${a[0]},${a[1]}`;
const pvKey = (a, b) => `${a[0]},${a[1]},${b[0]},${b[1]}`;

const step = (matrix, beams, loopDetector) => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];
  for (const {p: [px, py], v: [vx, vy]} of beams) {
    const char = matrix[py].at(px);
    if (char === "/" && vx > 0) {
      result.push({ p: [px, py - 1], v: [0, -1]});
    } else if (char === "/" && vx < 0) {
      result.push({ p: [px, py + 1], v: [0, 1]});
    } else if (char === "/" && vy > 0) {
      result.push({ p: [px - 1, py], v: [-1, 0]});
    } else if (char === "/" && vy < 0) {
      result.push({ p: [px + 1, py], v: [1, 0]});
    } else if (char === "\\" && vx > 0) {
      result.push({ p: [px, py + 1], v: [0, 1]});
    } else if (char === "\\" && vx < 0) {
      result.push({ p: [px, py - 1], v: [0, -1]});
    } else if (char === "\\" && vy > 0) {
      result.push({ p: [px + 1, py], v: [1, 0]});
    } else if (char === "\\" && vy < 0) {
      result.push({ p: [px - 1, py], v: [-1, 0]});
    } else if (char === "-" && vx === 0) {
      result.push({ p: [px + 1, py], v: [1, 0]});
      result.push({ p: [px - 1, py], v: [-1, 0]});
    } else if (char === "|" && vy === 0) {
      result.push({ p: [px, py + 1], v: [0, 1]});
      result.push({ p: [px, py - 1], v: [0, -1]});
    } else {
      result.push({ p: [px + vx, py + vy], v: [vx, vy]});
    }
  }
  return result.filter(({ p: [px, py], v}) => px >= 0 && px < cols && py >= 0 && py < rows && !loopDetector.has(pvKey([px, py], v)));
}