const { getSteps } = require('../3-path-in-spiral');

describe('getSteps', () => {
	it('throws an error in case input is less than 1', () => {
		try {
			getSteps(0);
		} catch(error) {
			expect(error).toEqual(new Error('No'));
		}
	});

	it('1', () => {
		expect(getSteps(1)).toBe(0);
	});

	it('9', () => {
		expect(getSteps(9)).toBe(2);
	});

	it('8', () => {
		expect(getSteps(8)).toBe(1);
	});

	it('2', () => {
		expect(getSteps(2)).toBe(1);
	});

	it('17', () => {
		expect(getSteps(17)).toBe(4);
	});

	it('14', () => {
		expect(getSteps(14)).toBe(3);
	});

	it('12', () => {
		expect(getSteps(12)).toBe(3);
	});

	it('1024', () => {
		expect(getSteps(1024)).toBe(31);
	});
});