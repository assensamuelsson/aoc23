export const part1 = (input) => {
  const result = parse(input)
    .map(possibleArrangements)
    .reduce((acc, curr) => acc + curr);

  console.log(result);
}

export const part2 = (input) => {
  const result = parse(input)
    .map(({ conditionRecord, groupSizes }) => ({
      conditionRecord: Array(5).fill(conditionRecord).join("?"),
      groupSizes: Array(5).fill(groupSizes).flat(),
    }))
    .map(possibleArrangements)
    .reduce((acc, curr) => acc + curr);

  console.log(result);
}

export const parse = (input) => input
  .split("\n")
  .map((row) => {
    const [conditionRecord, groupSizes] = row.split(" ");

    return {
      conditionRecord,
      groupSizes: groupSizes.split(",").map(Number),
    }
  });

export const possibleArrangements = ({ conditionRecord, groupSizes }) => {
  const memoKeyGen = (...args) => args.join("-");

  const dp = (p, n, r=0, memo={}) => {
    const memoKey = memoKeyGen(p, n);
    if (memoKey in memo) return memo[memoKey];

    if (p >= conditionRecord.length) {
      memo[memoKey] = n === groupSizes.length ? 1 : 0;
      return memo[memoKey];
    }

    if (conditionRecord[p] !== "#") {
      r += dp(p+1, n, 0, memo);
    }

    if (n < groupSizes.length) {
      const q = p + groupSizes[n];
      const springGroup = conditionRecord.slice(p, q);
      const springAfterGroup = conditionRecord.at(q);
      if (springGroup && springGroup.length === groupSizes[n] && !springGroup.includes(".") && (springAfterGroup !== "#" || springAfterGroup === undefined)) {
        r += dp(q+1, n+1, 0, memo);
      }
    }
    memo[memoKey] = r;
    return r;
  }

  return dp(0, 0);
}