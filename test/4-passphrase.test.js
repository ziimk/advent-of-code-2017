const { hasDuplicates, validatePassphrases } = require('../4-passphrase');

describe('hasDuplicates()', () => {
	it('returns true in case of duplicates', () => {
		const input = 'aa bb cc dd aa'.split(' ');

		expect(hasDuplicates(input)).toBe(true);
	});

	it('returns false in case of no duplicates', () => {
		const input = 'aa bb cc dd aaa'.split(' ');

		expect(hasDuplicates(input)).toBe(false);
	});
});

describe('validatePassphrases()', () => {
	it('returns 0 if all rows have duplicates', () => {
		const input = 'aa bb cc dd aa\n' +
			'ee oo uu oo';

		expect(validatePassphrases(input)).toBe(0);
	});

	it('returns count of rows without duplicates', () => {
		const input = 'aa bb cc dd aa\n' +
			'ee oo uu';

		expect(validatePassphrases(input)).toBe(1);
	});
});