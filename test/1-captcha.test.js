const sequenceAdder = require('../1-captcha');

describe('sequenceAdder()', () => {
	describe('adds number if it matches the next one', () => {
		it('1122', () => {
			const input = '1122';

			expect(sequenceAdder(input)).toBe(3);
		});

		it('11122', () => {
			const input = '11122';
		
			expect(sequenceAdder(input)).toBe(4);
		});

		it('1111', () => {
			const input = '1111';
		
			expect(sequenceAdder(input)).toBe(4);
		});
	});

	it('does not add numbers from sequence if no matches', () => {
		const input = '1234';

		expect(sequenceAdder(input)).toBe(0);
	})
});