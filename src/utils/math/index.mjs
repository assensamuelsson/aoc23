/**
 * @param {number[]} inputArray 
 * @returns {number}
 */
const greatestCommonDivisor = (inputArray) => {
  const gcd = (a, b) => (!b ? a : gcd(b, a % b));
  return inputArray
    .reduce((acc, curr) => gcd(acc, curr));
}

/**
 * @param {number[]} inputArray 
 * @returns {number}
 */
const leastCommonMultiple = (inputArray) => {
  const lcm = (a, b) => a * (b / greatestCommonDivisor([a, b]));
  return inputArray
    .reduce((acc, curr) => lcm(acc, curr));
}

export default {
  greatestCommonDivisor,
  leastCommonMultiple,
};
