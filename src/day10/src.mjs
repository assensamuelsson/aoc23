export const part1 = (input) => {
  const map = parse(input);
  const result = stepsToFurthestPoint(map);

  console.log(result);
}

export const part2 = (input) => {
  const map = parse(input);

  const groundBorder = putGroundBorder(map);
  const { tiles, polyPoints } = markPath(groundBorder);
  const flooded = recursiveFloodFill(tiles);
  printMap({ tiles: flooded })
  const result = flooded.reduce((acc, row, y) => {
    if (row.includes(".")) {
      let insides = 0;
      for (let x = 0; x < row.length; x++) {
        if (tileAt({x, y}, tiles) === ".") {
          insides += isPointInPath(x, y, polyPoints) ? 1 : 0;
        }
      }
      return acc + insides;
    } else {
      return acc;
    }
  }, 0);

  console.log(result);

  // 713 too high
}

const printMap = (map) => {
  map.tiles.forEach((row) => console.log(row));
}

const isPointInPath = (x, y, polyPoints) => {
  let result = false;
  for (let i = 1; i < polyPoints.length; i++) {
    const {x: ax, y: ay} = polyPoints[i];
    const {x: bx, y: by} = polyPoints[i - 1];
    if ((x === ax) && (y === ay)) return true;
    if ((ay > y) !== (by > y)) {
      const slope = (x - ax) * (by - ay) - (bx - ax) * (y - ay);
      if (slope === 0) return true;
      if ((slope < 0) !== (by < ay)) result = !result;
    }
  }
  return result;
}

const putMarker = (tiles, { x, y }, marker) => {
  return tiles[y].substring(x, 0) + marker + tiles[y].substring(x + 1);
}

const markPath = ({ startingPoint, tiles }) => {
  const marker = "@";
  let previousPoint = startingPoint;
  let point = findPointsFromStartingPoint({ startingPoint, tiles })[0];
  const polyPoints = [startingPoint, point];

  const pathPoints = [
    startingPoint,
    point,
  ];

  while (!pointsEqual([startingPoint, point])) {
    let nxtPoint;
    nxtPoint = nextPoint(point, previousPoint, tiles);
    previousPoint = point;
    point = nxtPoint;
    pathPoints.push(point);
  }

  const cornerTiles = new Set(["F", "J", "L", "7"]);
  pathPoints.forEach(({x, y}) => {
    if (cornerTiles.has(tileAt({x, y}, tiles))) polyPoints.push({x, y});
    tiles[y] = putMarker(tiles, { x, y}, marker);
  });

  return { startingPoint, polyPoints, tiles: tiles.map((row) => row.replace(/[^@]/g, ".")) };
}

const recursiveFloodFill = (tiles) => {
  const fn = (x, y) => {
    if (x < 0 || y < 0 || x >= tiles[0].length || y >= tiles.length) return;
    const tile = tileAt({x, y}, tiles);
    if (tile === "@" || tile === "*") return;

    tiles[y] = putMarker(tiles, {x, y}, "*");

    fn(x - 1, y);
    fn(x + 1, y);
    fn(x, y - 1);
    fn(x, y + 1);
  }

  fn(0, 0);

  return tiles;
}

export const directions = {
  NORTH: 0b0001,
  EAST:  0b0010,
  SOUTH: 0b0100,
  WEST:  0b1000,
};

const tileDirections = {
  "|": directions.NORTH | directions.SOUTH,
  "-": directions.EAST  | directions.WEST,
  "L": directions.NORTH | directions.EAST,
  "J": directions.NORTH | directions.WEST,
  "7": directions.SOUTH | directions.WEST,
  "F": directions.EAST  | directions.SOUTH,
}

const invalidPoint = { x: -1, y: -1 };

export const parse = (input) => {
  const tiles = input.split("\n");
  const startingPoint = tiles
    .reduce((point, row, i) => {
      return row.includes("S")
        ? { x: row.indexOf("S"), y: i }
        : point;
    }, invalidPoint);

  return { tiles, startingPoint };
}

const tileAt = ({ x, y }, tiles) => tiles[y]?.at(x); 

const isDirectionValid = (tile, direction) => {
  return (tileDirections[tile ?? ""] & direction) === direction;
}

const directionsFrom = ({ x, y })=> [
  { point: { x: x, y: y - 1 }, direction: directions.SOUTH },
  { point: { x: x + 1, y: y }, direction: directions.WEST },
  { point: { x: x, y: y + 1 }, direction: directions.NORTH },
  { point: { x: x - 1, y: y }, direction: directions.EAST },
]

export const findPointsFromStartingPoint = (map) => {
  const { startingPoint, tiles } = map;

  return directionsFrom(startingPoint)
    .reduce(({ foundIndex, result }, { point, direction }) => {
      if (foundIndex < 2 && isDirectionValid(tileAt(point, tiles), direction)) {
        result[foundIndex] = point;
        foundIndex++;
      }
      return { foundIndex, result}
    }, {
      foundIndex: 0,
      result: [ invalidPoint, invalidPoint ]
    }).result;
}

export const calcDirection = (from, to) => {
  if (from.x === to.x) {
    return from.y > to.y ? directions.NORTH : directions.SOUTH;
  } else {
    return from.x > to.x ? directions.WEST : directions.EAST;
  }
}

export const step = (point, direction) => {
  switch (direction) {
    case directions.NORTH: return { x: point.x, y: point.y - 1 };
    case directions.EAST:  return { x: point.x + 1, y: point.y };
    case directions.SOUTH: return { x: point.x, y: point.y + 1 };
    case directions.WEST:  return { x: point.x - 1, y: point.y };
    default: return point;
  }
}

export const nextPoint = (current, cameFrom, tiles) => {
  const cameFromDirection = calcDirection(current, cameFrom);
  const tile = tileAt(current, tiles);
  const directionTo = tileDirections[tile ?? ""] ^ cameFromDirection;
  return step(current, directionTo);
}

export const pointsEqual = (p) => p[0].x === p[1].x && p[0].y === p[1].y;

export const stepsToFurthestPoint = (map) => {
  const previousPoints = [map.startingPoint, map.startingPoint];
  const points = findPointsFromStartingPoint(map);

  let steps = 1;
  while (!pointsEqual(points)) {
    const nextPoints = [null, null];
    for (let i = 0; i < 2; i++) {
      nextPoints[i] = nextPoint(points[i], previousPoints[i], map.tiles);
      previousPoints[i] = points[i];
      points[i] = nextPoints[i];
    }
    steps++;
  }
  return steps;
}

const putGroundBorder = (map) => {
  const startingPoint = { x: map.startingPoint.x + 1, y: map.startingPoint.y + 1 };
  map.tiles.unshift(".".repeat(map.tiles[0].length));
  map.tiles.push(".".repeat(map.tiles[0].length));
  const tiles = map.tiles.map((row) => "." + row + ".");

  return {
    startingPoint,
    tiles,
  };
}
