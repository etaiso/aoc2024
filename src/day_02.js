/**
 * Contains solutions for Day 2
 * Puzzle Description: https://adventofcode.com/2024/day/2
 */

const inRange = (a, b) => Math.abs(a - b) >= 1 && Math.abs(a - b) <= 3;
const isIncreasing = (a, b) => a <= b;
const isDecreasing = (a, b) => a >= b;
const getPermutations = (line) => [
  line,
  ...line.reduce(
    (acc, _, index) => [
      ...acc,
      [...line.slice(0, index), ...line.slice(index + 1)],
    ],
    []
  ),
];

const isSafe = (line) =>
  line.every((value, index, arr) => {
    const directionPredicate = line[0] > line[1] ? isDecreasing : isIncreasing;

    if (index === arr.length - 1) {
      return true;
    }
    return (
      directionPredicate(value, arr[index + 1]) &&
      inRange(value, arr[index + 1])
    );
  });

/**
 * Returns the solution for level one of this puzzle.
 * @param {Object} args - Provides both raw and split input.
 * @param {String} args.input - The original, unparsed input string.
 * @param {String[]} args.lines - Array containing each line of the input string.
 * @returns {Number|String}
 */
export const levelOne = ({ input, lines }) => {
  return lines.reduce((acc, _line) => {
    const line = _line.split(" ").map(Number);
    return isSafe(line) ? acc + 1 : acc;
  }, 0);
};

/**
 * Returns the solution for level two of this puzzle.
 * @param {Object} args - Provides both raw and split input.
 * @param {String} args.input - The original, unparsed input string.
 * @param {String[]} args.lines - Array containing each line of the input string.
 * @returns {Number|String}
 */
export const levelTwo = ({ input, lines }) => {
  return lines.reduce((acc, _line) => {
    const line = _line.split(" ").map(Number);
    const permutations = getPermutations(line);
    return permutations.some(isSafe) ? acc + 1 : acc;
  }, 0);
};
