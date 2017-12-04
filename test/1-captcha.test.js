const sequenceAdder = require('../1-captcha');

describe('sequenceAdder()', () => {
	describe('adds number if it matches the next one', () => {
		it('1122', () => {
			const input = '1122';

			expect(sequenceAdder(input, 1)).toBe(3);
		});

		it('11122', () => {
			const input = '11122';
		
			expect(sequenceAdder(input, 1)).toBe(4);
		});

		it('1111', () => {
			const input = '1111';
		
			expect(sequenceAdder(input, 1)).toBe(4);
		});

		it('does not add numbers from sequence if no matches', () => {
			const input = '1234';
	
			expect(sequenceAdder(input, 1)).toBe(0);
		})
	});

	describe('adds number if it matches the one halfway around the circular list', () => {
		it('1212', () => {
			const input = '1212';

			expect(sequenceAdder(input, 2)).toBe(6);
		});

		it('1221', () => {
			const input = '1221';
		
			expect(sequenceAdder(input, 2)).toBe(0);
		});

		it('123425', () => {
			const input = '123425';
		
			expect(sequenceAdder(input, 3)).toBe(4);
		});

		it('123123', () => {
			const input = '123123';
		
			expect(sequenceAdder(input, 3)).toBe(12);
		});

		it('12131415', () => {
			const input = '12131415';
		
			expect(sequenceAdder(input, 4)).toBe(4);
		});
	});
});