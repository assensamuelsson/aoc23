import { strictEqual, deepStrictEqual } from 'node:assert';
import { it, describe } from 'node:test';

import {
  getCalibrationValues,
  getNumberTokens,
  getCalibrationValues2,
 } from './src.mjs';

describe('day1', () => {
  it('Gets correct calibration values', () => {
    strictEqual(getCalibrationValues('1abc2'), '12');
    strictEqual(getCalibrationValues('pqr3stu8vwx'), '38');
    strictEqual(getCalibrationValues('a1b2c3d4e5f'), '15');
    strictEqual(getCalibrationValues('treb7uchet'), '77');
  });

  it('Extracts correct number tokens', () => {
    deepStrictEqual(getNumberTokens('1a3'), [[0, '1'], [2, '3']]);
    deepStrictEqual(getNumberTokens('113'), [[0, '1'], [1, '1'], [2, '3']]);
    deepStrictEqual(getNumberTokens('1abc2'), [[0, '1'], [4, '2']]);
    deepStrictEqual(getNumberTokens('four1abcnine'), [[4, '1'], [0, '4'], [8, '9']]);
  });

  it('Gets correct calibration values - updated', () => {
    strictEqual(getCalibrationValues2('two1nine'), '29');
    strictEqual(getCalibrationValues2('eightwothree'), '83');
    strictEqual(getCalibrationValues2('4nineeightseven2'), '42');
    strictEqual(getCalibrationValues2('7pqrstsixteen'), '76');
  });
})
