const { parseLine, runIstructions } = require('../8-instructions');

const input = 'b inc 5 if a > 1\n' +
	'a inc 1 if b < 5\n' +
	'c dec -10 if a >= 1\n' +
	'c inc -20 if c == 10';

describe('parseLine()', () => {
	it('parses instruction line', () => {
		const result = parseLine(input.split('\n')[0]);

		expect(result).toEqual({
			amount: 5,
			condition: '>',
			conditionAmount: 1,
			operation: 'inc',
			register: 'b',
			registerToCompare: 'a'
		});
	});
});

describe('runInstructions()', () => {
	it('returns biggest values', () => {
		const result = runIstructions(input);

		expect(result).toEqual({
			maxValue: 1,
			maxValueEver: 10
		});
	});
});