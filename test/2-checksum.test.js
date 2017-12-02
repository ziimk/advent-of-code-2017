const checksum = require('../2-checksum');

describe('checksum()', () => {
	it('calculates from one row', () => {
		const row = '5	1	9	5';

		expect(checksum(row)).toBe(8);
	});

	it('calculates from multiple rows', () => {
		const table = '5	1	9	5\n' +
			'7	5	3\n' +
			'2	4	6	8';

		expect(checksum(table)).toBe(18);
	});
});