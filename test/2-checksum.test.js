const { checksum, checksumPart2 } = require('../2-checksum');

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

describe('checksumPart2()', () => {
	it('calculates from one row', () => {
		const row = '9	4	7	3';

		expect(checksumPart2(row)).toBe(3);
	});

	it('calculates from multiple rows', () => {
		const table = '5	9	2	8\n' +
		'9	4	7	3\n' +
		'3	8	6	5';

		expect(checksumPart2(table)).toBe(9);
	});
});