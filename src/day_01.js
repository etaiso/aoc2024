/**
 * Contains solutions for Day 1
 * Puzzle Description: https://adventofcode.com/2024/day/1
 */

const getSortedLists = (lines) => {
  const { left, right } = lines.reduce((acc, line) => {
    const [l, r] = line.trim().split(/\s+/).map(Number);
    acc.left.push(l);
    acc.right.push(r);
    return acc;
  }, { left: [], right: [] });

  return { sortedLeft: left.sort((a, b) => a - b), sortedRight: right.sort((a, b) => a - b) };
}

/**
 * Returns the solution for level one of this puzzle.
 * @param {Object} args - Provides both raw and split input.
 * @param {String} args.input - The original, unparsed input string.
 * @param {String[]} args.lines - Array containing each line of the input string.
 * @returns {Number|String}
 */
export const levelOne = ({ input, lines }) => {
  const { sortedLeft, sortedRight } = getSortedLists(lines);

  return sortedLeft.reduce((acc, leftValue, index) => {
    return acc + Math.abs(leftValue - sortedRight[index]);
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
  const { sortedLeft, sortedRight } = getSortedLists(lines);

  return sortedLeft.reduce((acc, leftValue) => {
    const rightOccurrences = sortedRight.filter((rightValue) => rightValue === leftValue).length;
    return acc + leftValue * rightOccurrences;
  }, 0);
};
