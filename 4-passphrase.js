/**
 * A passphrase consists of a series of words (lowercase letters) separated by spaces.
 * To ensure security, a valid passphrase must contain no duplicate words.
 * 
 * For example:
 * aa bb cc dd ee is valid.
 * aa bb cc dd aa is not valid - the word aa appears more than once.
 * aa bb cc dd aaa is valid - aa and aaa count as different words.
 */

const fs = require('fs');

const readFile = () => {
	return new Promise((resolve, reject) => {
		fs.readFile('4-passphrase-input.txt', 'utf8', (err, data) => {
			if (err) {
				return reject(err);
			}

			resolve(data);
		});
	});
};

/**
 * @param {Array} row
 * @returns {bool}
 */
const hasDuplicates = (row) => {
	// The Set object lets you store unique values of any type
	const set = new Set();
	
	return row.some(word => set.size === set.add(word).size);
};

const validatePassphrases = (input) => {
	const rows = input.split('\n');
	let validCount = 0;

	rows.forEach(row => {
		if (!hasDuplicates(row.split(' '))) {
			validCount++;
		}
	});

	return validCount;
};

readFile()
	.then(data => console.log('Valid passphrases count:', validatePassphrases(data)))
	.catch(err => console.log(err));

module.exports = {
	hasDuplicates,
	validatePassphrases
};