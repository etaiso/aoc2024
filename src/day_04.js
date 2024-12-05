/**
 * Contains solutions for Day 4
 * Puzzle Description: https://adventofcode.com/2024/day/4
 */

const getScanFunctions = () => {
  const scanDirections = [
    { name: "right", dx: 0, dy: 1 },
    { name: "left", dx: 0, dy: -1 },
    { name: "down", dx: 1, dy: 0 },
    { name: "up", dx: -1, dy: 0 },
    { name: "downRight", dx: 1, dy: 1 },
    { name: "downLeft", dx: 1, dy: -1 },
    { name: "upRight", dx: -1, dy: 1 },
    { name: "upLeft", dx: -1, dy: -1 },
  ];

  const checkPattern = (target, x, y, data, { dx, dy }) =>
    [...target].every((char, i) => data[x + i * dx]?.[y + i * dy] === char);

  const scan = scanDirections.reduce((acc, direction) => {
    acc[direction.name] = (target, x, y, data) =>
      checkPattern(target, x, y, data, direction);
    return acc;
  }, {});
  return scan;
};

const isMatch = (x, y, data, scan1, scan2) =>
  (scan1.direction(scan1.pattern, x, y, data) &&
    scan2.direction(scan2.pattern, x, y, data)) ||
  (scan1.direction(scan2.pattern, x, y, data) &&
    scan2.direction(scan1.pattern, x, y, data));

/**
 * Returns the solution for level one of this puzzle.
 * @param {Object} args - Provides both raw and split input.
 * @param {String} args.input - The original, unparsed input string.
 * @param {String[]} args.lines - Array containing each line of the input string.
 * @returns {Number|String}
 */
export const levelOne = ({ input, lines }) => {
  const data = lines.map((line) => [...line]);
  const scan = getScanFunctions();

  let count = 0;

  data.forEach((row, x) => {
    row.forEach((_, y) => {
      Object.values(scan).forEach((scanDirection) => {
        if (scanDirection("XMAS", x, y, data)) {
          count++;
        }
      });
    });
  });

  return count;
};

/**
 * Returns the solution for level two of this puzzle.
 * @param {Object} args - Provides both raw and split input.
 * @param {String} args.input - The original, unparsed input string.
 * @param {String[]} args.lines - Array containing each line of the input string.
 * @returns {Number|String}
 */
export const levelTwo = ({ input, lines }) => {
  const data = lines.map((line) => [...line]);
  const scan = getScanFunctions();

  let count = 0;

  data.forEach((row, x) => {
    row.forEach((_, y) => {
      if (data[x][y] === "A") {
        const patterns = [
          {
            scan1: { direction: scan.upLeft, pattern: "AM" },
            scan2: { direction: scan.downRight, pattern: "AS" },
          },
          {
            scan1: { direction: scan.upRight, pattern: "AM" },
            scan2: { direction: scan.downLeft, pattern: "AS" },
          },
        ];

        if (
          patterns.every(({ scan1, scan2 }) =>
            isMatch(x, y, data, scan1, scan2)
          )
        ) {
          count++;
        }
      }
    });
  });

  return count;
};
