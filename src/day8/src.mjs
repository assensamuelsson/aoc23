import utils from "../utils/index.mjs";

export const part1 = (input) => {
  const map = parse(input);
  const steps = countSteps(map);

  console.log(steps);
}

export const part2 = (input) => {
  const map = parse(input);
  const steps = countArraySteps(map);

  console.log(steps);
}

export const parse = (input) => {
  const rows = input.split("\n");
  const instructions = rows[0];

  const network = rows
    .slice(2)
    .reduce((network, row) => {
      const node = row.slice(0, 3);
      const left = row.slice(7, 10);
      const right = row.slice(12, 15);
      network[node] = [left, right];
      return network;
    }, {});

  return { instructions, network };
}

export const step = ({ instructions, network }, currentNode, step) => {
  const arrayIndex = instructions[step % instructions.length] === "L" ? 0 : 1;
  return network[currentNode][arrayIndex];
}

export const countSteps = (map) => {
  let node = "AAA";
  let steps = 0;

  while (node !== "ZZZ") {
    node = step(map, node, steps);
    steps++;
  }

  return steps;
}

export const findStartingNodes = (network) => Object.keys(network)
  .filter((node) => node.at(2) === "A")

export const stepsToFirstZNode = (startingNodes, map) => startingNodes
  .map((node) => {
    let steps = 0;
    while (node.at(2) !== "Z") {
      node = step(map, node, steps)
      steps++;
    }
    return steps;
  })

export const countArraySteps = (map) => {
  const startingNodes = findStartingNodes(map.network);
  const loopingSteps = stepsToFirstZNode(startingNodes, map);
  return utils.math.leastCommonMultiple(loopingSteps);
}