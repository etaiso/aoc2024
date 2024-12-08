/**
 * Contains solutions for Day 5
 * Puzzle Description: https://adventofcode.com/2024/day/5
 */

const parseInput = (input) => {
  const [rules, updates] = input.split("\n\n").map((i) => i.split("\n"));
  return [rules, updates.map((u) => u.split(",").map(Number))];
};

const isValidUpdate = (update, rules) =>
  update.every((page) => {
    return rules.find((r) => `${page}|${r}` || `${r}|${page}`);
  });

const isOrderedUpdate = (update, rules) =>
  update.slice(0, -1).every((page, i) => {
    const next = update[i + 1];
    return rules.some((rule) => {
      const [ruleStart, ruleEnd] = rule.split("|").map(Number);
      return ruleStart === page && ruleEnd === next;
    });
  });

const sortByRuleOrder = (update, rules) =>
  update.toSorted((a, b) => {
    if (rules.find((r) => r === `${a}|${b}`)) {
      return -1;
    }
    if (rules.find((r) => r === `${b}|${a}`)) {
      return 1;
    }
    return 0;
  });

/**
 * Returns the solution for level one of this puzzle.
 * @param {Object} args - Provides both raw and split input.
 * @param {String} args.input - The original, unparsed input string.
 * @param {String[]} args.lines - Array containing each line of the input string.
 * @returns {Number|String}
 */
export const levelOne = ({ input, lines }) => {
  const [rules, updates] = parseInput(input);

  return updates.reduce((acc, update) => {
    if (isValidUpdate(update, rules) && isOrderedUpdate(update, rules)) {
      return acc + update[(update.length - 1) / 2];
    }
    return acc;
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
  const [rules, updates] = parseInput(input);

  return updates.reduce((acc, update) => {
    if (isValidUpdate(update, rules) && !isOrderedUpdate(update, rules)) {
      const sortedUpdate = sortByRuleOrder(update, rules);
      return acc + sortedUpdate[(sortedUpdate.length - 1) / 2];
    }
    return acc;
  }, 0);
};
