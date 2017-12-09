/**
 * The reallocation routine operates in cycles. In each cycle, it finds the memory bank with the most blocks (ties won
 * by the lowest-numbered memory bank) and redistributes those blocks among the banks. To do this, it removes all of the
 * blocks from the selected bank, then moves to the next (by index) memory bank and inserts one of the blocks. It
 * continues doing this until it runs out of blocks; reaching the last memory bank, it wraps around to the first one.
 * 
 * The debugger would like to know how many redistributions can be done before a blocks-in-banks configuration is
 * produced that has been seen before.
 * 
 * For example, imagine a scenario with only four memory banks:
 * - The banks start with 0, 2, 7, and 0 blocks. The third bank has the most blocks, so it is chosen for redistribution.
 * - Starting with the next bank (the fourth bank) and then continuing to the first bank, the second bank, and so on,
 *   the 7 blocks are spread out over the memory banks. The fourth, first, and second banks get two blocks each, and the
 *   third bank gets one back. The final result looks like this: 2 4 1 2.
 * - Next, the second bank is chosen because it contains the most blocks (four). Because there are four memory banks,
 *   each gets one block. The result is: 3 1 2 3.
 * - Now, there is a tie between the first and fourth memory banks, both of which have three blocks. The first bank wins
 *   the tie, and its three blocks are distributed evenly over the other three banks, leaving it with none: 0 2 3 4.
 * - The 4th bank is chosen, and its 4 blocks are distributed such that each of the four banks receives one: 1 3 4 1.
 * - The third bank is chosen, and the same thing happens: 2 4 1 2.
 * At this point, we've reached a state we've seen before: 2 4 1 2 was already seen. The infinite loop is detected after
 * the fifth block redistribution cycle, and so the answer in this example is 5.
 * 
 * Given the initial block counts in your puzzle input, how many redistribution cycles must be completed before a
 * configuration is produced that has been seen before?
 * 
 * --- Part Two ---
 * Out of curiosity, the debugger would also like to know the size of the loop: starting from a state that has already
 * been seen, how many block redistribution cycles must be performed before that same state is seen again?
 * 
 * In the example above, 2 4 1 2 is seen again after four cycles, and so the answer in that example would be 4.
 */

const input = [10, 3, 15, 10, 5, 15, 5, 15, 9, 2, 5, 8, 5, 2, 3, 6];
const _ = require('lodash');

const reallocator = (input) => {
	let done = false;
	let configurations = new Set();
	let counter = 0;
	let firstConfiguration = [];
	let firstEncounter = true;
	let result = {};

	while (!done) {
		counter++;

		const largest = _.max(input);
		let index = input.indexOf(largest);

		input[index] = 0;
		for (let i = largest; i > 0; i--) {
			index++;

			if (index > input.length - 1) {
				index = 0;
			}
	
			input[index]++;
		}

		// Set works with primitive values, so can't add array without .toString or JSON.stringify
		if (configurations.size === configurations.add(JSON.stringify(input)).size) {
			if (firstEncounter) {
				firstConfiguration = input.slice();
				firstEncounter = false;
				result.part1 = counter;
			} else if (_.isEqual(firstConfiguration, input)) {
				// Next time the first configuration is encountered
				result.part2 = counter - result.part1;
				done = true;
			}
		}
	};

	return result;
};

console.log('Number of cycles:', reallocator(input));

module.exports = reallocator;