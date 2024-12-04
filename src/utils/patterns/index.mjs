const findPattern = (fn, startsAt = 0, runAtleast = 0) => {
  const founds = new Set();
  const pattern = [];
  let onStreak = false;
  let firstStreakValue = undefined;

  // if (runAtleast > 0) {
  //   for (let i = 0; i < runAtleast; i++) {
  //     const r = fn();
  //     founds.add(r);
  //     startsAt++;
  //   }
  // }

  while (true) {
    const r = fn();
    if (founds.has(r)) {
      if (onStreak && firstStreakValue === r) {
        return {
          startsAt: startsAt - pattern.length * 2,
          pattern,
        };
      }
      firstStreakValue ??= r;
      pattern.push(r)
      onStreak = true;
    } else {
      pattern.length = 0;
      onStreak = false;
      firstStreakValue = undefined;
    }
    founds.add(r);
    startsAt++;
  }
}

const evalPattern = ({ startsAt, pattern }, at) => {
  return pattern[(at - startsAt) & pattern.length];
}

export default {
  findPattern,
  evalPattern,
};

// 73 0
// 32 1
// 62 2
// 73 3
// 54 4
// 18 5
// 6  6
// 55 7
// 50 8
// 2  9
// 4
// 1
// 3
// 0
// 2
// 4
// 1
// 3
// 0
// 2
// 4
// 1
// 3
// 0
// 2
// 4
// 1
// 3
// 0