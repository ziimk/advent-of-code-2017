/**
 * Each instruction consists of several parts: the register to modify, whether to increase or decrease that register's 
 * value, the amount by which to increase or decrease it, and a condition. If the condition fails, skip the instruction 
 * without modifying the register. The registers all start at 0. The instructions look like this:
 * b inc 5 if a > 1
 * a inc 1 if b < 5
 * c dec -10 if a >= 1
 * c inc -20 if c == 10
 * These instructions would be processed as follows:
 * Because a starts at 0, it is not greater than 1, and so b is not modified.
 * a is increased by 1 (to 1) because b is less than 5 (it is 0).
 * c is decreased by -10 (to 10) because a is now greater than or equal to 1 (it is 1).
 * c is increased by -20 (to -10) because c is equal to 10.
 * After this process, the largest value in any register is 1.
 * You might also encounter <= (less than or equal to) or != (not equal to).
 *
 * What is the largest value in any register after completing the instructions in your puzzle input?
 * 
 * --- Part Two ---
 * To be safe, the CPU also needs to know the highest value held in any register during this process so that it can 
 * decide how much memory to allocate to these operations. For example, in the above instructions, the highest value 
 * ever held was 10 (in register c after the third instruction was evaluated).
 */

const readFile = require('./util/read-file');
const _ = require('lodash');

const parseLine = (line) => {
	let [register, operation, amount, , registerToCompare, condition, conditionAmount] = line.split(' ');

	amount = parseInt(amount, 10);
	conditionAmount = parseInt(conditionAmount, 10);

	return {
		register,
		operation,
		amount,
		registerToCompare,
		condition,
		conditionAmount
	};
};

const runIstructions = (input) => {
	const lines = input.split('\n');
	let instructions = [];

	lines.forEach(line => {
		instructions.push(parseLine(line));
	});

	const registers = new Map();
	let maxValueEver = 0;

	instructions.forEach(instruction => {
		// set initial value to 0 for each register
		if (_.isUndefined(registers.get(instruction.register))) {
			registers.set(instruction.register, 0);
		}

		if (_.isUndefined(registers.get(instruction.registerToCompare))) {
			registers.set(instruction.registerToCompare, 0);
		}

		const registerToEval = `registers.get('${instruction.registerToCompare}')`;
		const toEval = `${registerToEval} ${instruction.condition} ${instruction.conditionAmount}`;

		if (eval(toEval) === true) {
			const valueBeforeModify = registers.get(instruction.register);

			if (instruction.operation === 'inc') {
				registers.set(instruction.register, valueBeforeModify + instruction.amount);
			} else {
				registers.set(instruction.register, valueBeforeModify - instruction.amount);
			}

			if (registers.get(instruction.register) > maxValueEver) {
				maxValueEver = registers.get(instruction.register);
			}
		}
	});

	const values = Array.from(registers.values());

	return {
		maxValue: _.max(values),
		maxValueEver
	};
};

readFile('8-instructions-input.txt')
	.then(data => {
		const result = runIstructions(data);

		console.log('Biggest value in registers is:', result.maxValue);
		console.log('Biggest ever value in registers was:', result.maxValueEver);
	})
	.catch(err => console.log(err));

module.exports = {
	parseLine,
	runIstructions
};