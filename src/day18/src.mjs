export const part1 = (input) => {
  const digplan = parse(input);
  const poly = toPolygon(digplan);
  const matrix = printPoly(poly);
  const filled = floodFill(matrix, [Math.floor(matrix[0].length / 2), Math.floor(matrix.length / 2)]);
  const result = filled
    .flat()
    .filter((v) => v === "#")
    .length;

  console.log(filled.map((r) => r.join("")).join("\n"));
  console.log(result);
}

export const part2 = (input) => {
  const result = 0;

  console.log(result);
}

export const parse = (input) => input
  .split("\n")
  .map((row) => {
    const [dir, len, color] = row.split(" ");
    return { dir, len: Number(len), color: color.slice(1, -1)};
  })

export const toPolygon = (digplan) => {
  const poly = [
    [0, 0]
  ];

  digplan.forEach(({ dir, len}) => {
    const [px, py] = poly.at(-1);
    if (dir === "R") {
      poly.push([px + len, py]);
    } else if (dir === "L") {
      poly.push([px - len, py]);
    } else if (dir === "U") {
      poly.push([px, py - len]);
    } else if (dir === "D") {
      poly.push([px, py + len]);
    }
  });

  return poly;
}

export const printPoly = (poly) => {
  const minx = poly.reduce((min, curr) => curr[0] < min ? curr[0] : min, Infinity);
  const maxx = poly.reduce((min, curr) => curr[0] > min ? curr[0] : min, -Infinity);
  const miny = poly.reduce((min, curr) => curr[1] < min ? curr[1] : min, Infinity);
  const maxy = poly.reduce((min, curr) => curr[1] > min ? curr[1] : min, -Infinity);

  const normalized = poly.map(([x, y]) => [ x - minx, y - miny ]);

  const matrix = Array.from({ length: maxy - miny + 1}, () => Array.from({ length: maxx - minx + 1}, () => "."));
  
  for (let i = 1; i < normalized.length; i++) {
    const p1 = normalized[i - 1];
    const p2 = normalized[i];
    let dir = [p2[0] - p1[0], p2[1] - p1[1]];
    const len = Math.max(Math.abs(dir[0]), Math.abs(dir[1]));
    dir = [dir[0] / len, dir[1] / len];

    let p = [p1[0], p1[1]];
    while (!(p[0] === p2[0] && p[1] === p2[1])) {
      matrix[p[1]][p[0]] = "#";
      p = [p[0] + dir[0], p[1] + dir[1]];
    }
  }

  return matrix;
}

export const floodFill = (matrix, startingNode) => {
  const queue = [startingNode];

  while (queue.length) {
    const [ x, y ] = queue.pop();
    try {
      if (matrix[y][x] === ".") {
        matrix[y][x] = "#";
        queue.push([x - 1, y]);
        queue.push([x + 1, y]);
        queue.push([x, y - 1]);
        queue.push([x, y + 1]);
      }
    } catch (error) {

    }
  }

  return matrix;
}
