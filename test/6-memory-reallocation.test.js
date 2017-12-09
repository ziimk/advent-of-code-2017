const reallocator = require('../6-memory-reallocation');

describe('reallocator()', () => {
	it('returns number of cycles to first and second encounter', () => {
		const input = [0, 2, 7, 0];
		const result = reallocator(input);

		expect(result.part1).toBe(5);
		expect(result.part2).toBe(4);
	});
});