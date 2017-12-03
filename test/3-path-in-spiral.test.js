const { getSideLength } = require('../3-path-in-spiral');

describe('getSideLength', () => {
	it('calculates side length of spiral matrix', () => {
		expect(getSideLength(1)).toBe(1);
		expect(getSideLength(2)).toBe(3);
		expect(getSideLength(9)).toBe(3);
		expect(getSideLength(21)).toBe(5);
		expect(getSideLength(137)).toBe(13);
		expect(getSideLength(312051)).toBe(559);
	});
});