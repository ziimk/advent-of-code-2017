const stepsCalculator = require('../5-instruction-jumps');

describe('stepsCalculator()', () => {
	it('returns number of steps for part1', () => {
		const input = [0, 3, 0, 1, -3];

		expect(stepsCalculator(input)).toBe(5);
	});

	it('returns number of steps for part2', () => {
		const input = [0, 3, 0, 1, -3];

		expect(stepsCalculator(input, true)).toBe(10);
	});
});