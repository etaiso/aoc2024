/**
 * Contains solutions for Day 3
 * Puzzle Description: https://adventofcode.com/2024/day/3
 */

const filterDonts = (input) => {
  const parts = input.split(/(do\(\)|don't\(\))/);
  let currentKey = "do";

  return parts.reduce((acc, part) => {
    if (part === "do()") {
      currentKey = "do";
    } else if (part === "don't()") {
      currentKey = "dont";
    } else {
      if (currentKey === "do") {
        return acc + part;
      }
    }
    return acc;
  }, "");
};

const getSumOfAllMuls = (input) => {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  const matches = Array.from(input.matchAll(regex), (match) => [
    Number(match[1]),
    Number(match[2]),
  ]);

  return matches.reduce((acc, [x, y]) => {
    return acc + x * y;
  }, 0);
};

/**
 * Returns the solution for level one of this puzzle.
 * @param {Object} args - Provides both raw and split input.
 * @param {String} args.input - The original, unparsed input string.
 * @param {String[]} args.lines - Array containing each line of the input string.
 * @returns {Number|String}
 */
export const levelOne = ({ input, lines }) => {
  return getSumOfAllMuls(input);
};

/**
 * Returns the solution for level two of this puzzle.
 * @param {Object} args - Provides both raw and split input.
 * @param {String} args.input - The original, unparsed input string.
 * @param {String[]} args.lines - Array containing each line of the input string.
 * @returns {Number|String}
 */
export const levelTwo = ({ input, lines }) => {
  return getSumOfAllMuls(filterDonts(input));
};
