/**
 * A passphrase consists of a series of words (lowercase letters) separated by spaces.
 * To ensure security, a valid passphrase must contain no duplicate words.
 * 
 * For example:
 * aa bb cc dd ee is valid.
 * aa bb cc dd aa is not valid - the word aa appears more than once.
 * aa bb cc dd aaa is valid - aa and aaa count as different words.
 * 
 * --- Part Two ---
 * Now, a valid passphrase must contain no two words that are anagrams of each other - that is, a passphrase is invalid
 * if any word's letters can be rearranged to form any other word in the passphrase.
 * 
 * For example:
 * abcde fghij is a valid passphrase.
 * abcde xyz ecdab is not valid - the letters from the third word can be rearranged to form the first word.
 * a ab abc abd abf abj is a valid passphrase, because all letters need to be used when forming another word.
 * iiii oiii ooii oooi oooo is valid.
 * oiii ioii iioi iiio is not valid - any of these words can be rearranged to form any other word.
 */

const readFile = require('./util/read-file');

/**
 * @param {Array} row
 * @returns {bool}
 */
const hasDuplicatesOrAnagrams = (row) => {
	// ['hola', 'cdab', 'ohal'] => ['ahlo', 'abcd', 'ahlo']
	const sortedWords = row.map(word => word.split('').sort().join(''));

	// The Set object lets you store unique values of any type
	return (new Set(sortedWords)).size !== sortedWords.length;
};

const validatePassphrases = (input) => {
	const rows = input.split('\n');
	let validCount = 0;

	rows.forEach(row => {
		if (!hasDuplicatesOrAnagrams(row.split(' '))) {
			validCount++;
		}
	});

	return validCount;
};

readFile('4-passphrase-input.txt')
	.then(data => console.log('Valid passphrases count:', validatePassphrases(data)))
	.catch(err => console.log(err));

module.exports = {
	hasDuplicatesOrAnagrams,
	validatePassphrases
};