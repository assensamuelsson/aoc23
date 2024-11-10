export const part1 = (input) => {
  const result = input.split("\n")
    .map(parseCard)
    .map(({ winning, card }) => winning.intersection(card).size)
    .map((n) => n > 0 ? Math.pow(2, n - 1) : 0)
    .reduce((acc, curr) => acc + curr, 0);

    console.log('Part1:', result);
}

export const part2 = (input) => {
  const result = input.split("\n")
    .map(parseCard)
    .map(({ winning, card }) => winning.intersection(card).size)
    .reduce((allCards, matchingNumbers, index) => {
      if (matchingNumbers > 0) {
        const winningCopies = allCards[index];
        for (let i = index + 1; i < Math.min(index + 1 + matchingNumbers, allCards.length); i++) {
          allCards[i] += winningCopies;
        }
      }
      return allCards;
    }, Array.from({ length: input.split("\n").length}).fill(1))
    .reduce((acc, curr) => acc + curr, 0);

  console.log("Part2:", result);
}

export const parseCard = (row) => {
  const colonIndex = row.indexOf(":");
  const parts = row.slice(colonIndex + 1)
    .split("|")
    .map((part) => new Set(part
      .split(" ")
      .filter(Boolean)
      .map((v) => parseInt(v)))
    );
  
  return {
    winning: parts[0],
    card: parts[1],
  };
}