export const part1 = (input) => {
  const result = input
    .split(",")
    .map(hash)
    .reduce((acc, curr) => acc + curr);

  console.log(result);
}

export const part2 = (input) => {
  const result = input
    .split(",")
    .reduce((hashMap, step) => {
      const operation = step.includes("=") ? "=" : "-";
      const [ label, focalLength ] = step.split(operation);
      const box = hash(label);
      if (operation === "=") {
        const index = hashMap[box].findIndex((i) => i.label === label);
        if (index === -1) {
          hashMap[box].push({ label, focalLength });
        } else {
          hashMap[box][index].focalLength = focalLength;
        }
      } else {
        const index = hashMap[box].findIndex((i) => i.label === label);
        if (index !== -1) {
          hashMap[box].splice(index, 1);
        }
      }
      return hashMap;
    }, Array.from({ length: 256 }, () => []))
    .map((box, i) => box
      .map((item, j) => item.focalLength * (i + 1) * (j + 1)))
    .flat()
    .reduce((acc, curr) => acc + curr);

  console.log(result);
}

export const hash = (s) => s
  .split("")
  .reduce((acc, curr) => {
    acc += curr.charCodeAt(0);
    acc *= 17;
    return acc % 256;
  }, 0);