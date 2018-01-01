/**
 * You get a list of the offsets for each jump. Jumps are relative: -1 moves to the previous instruction, and 2 skips
 * the next one. Start at the first instruction in the list. Follow the jumps until one leads outside the list.
 * 
 * In addition, after each jump, the offset of that instruction increases by 1. So, if you come across an offset of 3,
 * you would move three instructions forward, but change it to a 4 for the next time it is encountered.
 * 
 * For example, consider the following list of jump offsets:
 * 0
 * 3
 * 0
 * 1
 * -3
 * 
 * Positive jumps ("forward") move downward; negative jumps move upward. For legibility in this example, these offset
 * values will be written all on one line, with the current instruction marked in parentheses. The following steps would
 * be taken before an exit is found:
 * (0) 3  0  1  -3 - before we have taken any steps.
 * (1) 3  0  1  -3 - jump with offset 0 (don't jump at all). Fortunately, the instruction is then incremented to 1.
 * 2 (3) 0  1  -3  - jump 1 because of the instruction we just modified. 1st instruction is incremented again, now to 2.
 * 2  4  0  1 (-3) - jump all the way to the end; leave a 4 behind.
 * 2 (4) 0  1  -2  - go back to where we just were; increment -3 to -2.
 * 2  5  0  1  -2  - jump 4 steps forward, escaping the maze.
 * 
 * In this example, the exit is reached in 5 steps.
 * How many steps does it take to reach the exit?
 * 
 * --- Part Two ---
 * After each jump, if the offset was three or more, instead decrease it by 1. Otherwise, increase it by 1 as before.
 * Using this rule with the above example, the process now takes 10 steps, and the offset values after finding the exit
 * are left as 2 3 2 3 -1.
 */

const readFile = require('./util/read-file');

const stepsCalculator = (sequence, part2 = false) => {
	let index = 0;
	let stepsCount = 0;

	while (index >= 0 && index < sequence.length) {
		const offset = sequence[index];

		sequence[index] = (part2 && offset >= 3) ? offset - 1 : offset + 1;
		index += offset;
		stepsCount++;
	};

	return stepsCount;
};

readFile('5-instruction-jumps-input.txt')
	.then(data => {
		const sequence = data.split('\n').map(Number);
		const sequencePt2 = sequence.slice();

		console.log('Steps count part1:', stepsCalculator(sequence))
		console.log('Steps count part2:', stepsCalculator(sequencePt2, true))		
	})
	.catch(err => console.log(err));

module.exports = stepsCalculator;