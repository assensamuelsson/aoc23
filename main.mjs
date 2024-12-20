import { readFileSync } from 'fs';

const day = process.argv[2];
const file = process.argv[3];
console.log(`${day} - ${file}`);

const src = await import(`./src/${day}/src.mjs`);

const input = readFileSync(file, 'utf8');

const start = Date.now();
src.part1(input);
const part1 = Date.now();
console.log(`Part 1 done in: ${part1 - start}ms`);

if (src.part2) {
  src.part2(input);
  const part2 = Date.now();
  console.log(`Part 2 done in: ${part2 - part1}ms`);
}
