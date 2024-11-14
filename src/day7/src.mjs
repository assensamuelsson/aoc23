export const part1 = (input) => {
  const result = parse(input)
    .toSorted(sortFunction())
    .map(({ bid }, i) => ({ bid, rank: i + 1 }))
    .reduce((acc, { bid, rank }) => acc + bid * rank, 0);

  console.log(result);
}

export const part2 = (input) => {
  const result = parse(input)
    .toSorted(sortFunction({ jokers: true }))
    .map(({ bid }, i) => ({ bid, rank: i + 1 }))
    .reduce((acc, { bid, rank }) => acc + bid * rank, 0);

  console.log(result);
}

export const parse = (input) => input
  .split("\n")
  .map((row) => {
    const [cards, bid] = row.split(" ");
    return { cards, bid: Number(bid) };
  });

export const handTypes = {
  FIVE_OF_A_KIND: 6,  // 1 label
  FOUR_OF_A_KIND: 5,  // 2 labels
  FULL_HOUSE: 4,      // 2 labels
  THREE_OF_A_KIND: 3, // 3 labels
  TWO_PAIRS: 2,       // 3 labels
  ONE_PAIR: 1,        // 4 labels
  HIGH_CARD: 0,       // 5 labels
};

export const cardFrequencies = (cards) => Array.from(cards)
  .reduce((frequencies, card) => {
    if (!(card in frequencies)) frequencies[card] = 1;
    else frequencies[card]++;
    return frequencies;
  }, {});

export const calculateType = (cards, jokers = false) => {
  const frequencies = cardFrequencies(cards)
  let nJokers = frequencies["J"] ?? 0;
  if (jokers) {
    delete frequencies["J"];
  }
  const sortedFrequencies = Object.values(frequencies)
    .sort((a, b) => b - a);

  let originalType = handTypes.HIGH_CARD;
  if (sortedFrequencies[0] === 5) originalType = handTypes.FIVE_OF_A_KIND;
  else if (sortedFrequencies[0] === 4) originalType = handTypes.FOUR_OF_A_KIND;
  else if (sortedFrequencies[0] === 3 && sortedFrequencies[1] === 2) originalType = handTypes.FULL_HOUSE;
  else if (sortedFrequencies[0] === 3) originalType = handTypes.THREE_OF_A_KIND;
  else if (sortedFrequencies[0] === 2 && sortedFrequencies[1] === 2) originalType = handTypes.TWO_PAIRS;
  else if (sortedFrequencies[0] === 2) originalType = handTypes.ONE_PAIR;

  if (jokers && nJokers > 0) {
    switch (originalType) {
      case handTypes.FOUR_OF_A_KIND: {
        return handTypes.FIVE_OF_A_KIND;
      }
      case handTypes.THREE_OF_A_KIND: {
        return nJokers === 1
          ? handTypes.FOUR_OF_A_KIND
          : handTypes.FIVE_OF_A_KIND;
      }
      case handTypes.TWO_PAIRS: {
        return nJokers === 1
          ? handTypes.FULL_HOUSE
          : handTypes.TWO_PAIRS
      }
      case handTypes.ONE_PAIR: {
        switch (nJokers) {
          case 3: return handTypes.FIVE_OF_A_KIND;
          case 2: return handTypes.FOUR_OF_A_KIND;
          case 1: return handTypes.THREE_OF_A_KIND
        }
      }
      case handTypes.HIGH_CARD: {
        switch (nJokers) {
          case 5: return handTypes.FIVE_OF_A_KIND;
          case 4: return handTypes.FIVE_OF_A_KIND;
          case 3: return handTypes.FOUR_OF_A_KIND;
          case 2: return handTypes.THREE_OF_A_KIND;
          case 1: return handTypes.ONE_PAIR;
        }
      }
    }
  }

  return originalType;
}

export const sortFunction = ({ jokers = false } = {}) => (a, b) => {
  const aType = calculateType(a.cards, jokers);
  const bType = calculateType(b.cards, jokers);

  if (aType !== bType) {
    return aType - bType;
  }

  for (let i = 0; i < 5; i++) {
    const aCard = a.cards.at(i);
    const bCard = b.cards.at(i);
    if (aCard !== bCard) {
      const cardValues = jokers
        ? ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"]
        : ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
      return cardValues.findIndex((c) => c === aCard) - cardValues.findIndex((c) => c === bCard);
    }
  }

  return 0;
};