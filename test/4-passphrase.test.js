const { hasDuplicatesOrAnagrams, validatePassphrases } = require('../4-passphrase');

describe('hasDuplicatesOrAnagrams()', () => {
	it('returns true in case of duplicates', () => {
		const input = 'aa bb cc dd aa'.split(' ');

		expect(hasDuplicatesOrAnagrams(input)).toBe(true);
	});

	it('returns false in case of no duplicates', () => {
		const input = 'aa bb cc dd aaa'.split(' ');

		expect(hasDuplicatesOrAnagrams(input)).toBe(false);
	});

	it('returns false in case of no anagrams', () => {
		const input = 'abcde fghij'.split(' ');
		const input2 = 'a ab abc abd abf abj'.split(' ');

		expect(hasDuplicatesOrAnagrams(input)).toBe(false);
		expect(hasDuplicatesOrAnagrams(input2)).toBe(false);
	});

	it('returns true in case of anagrams', () => {
		const input = 'abcde xyz ecdab'.split(' ');

		expect(hasDuplicatesOrAnagrams(input)).toBe(true);
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