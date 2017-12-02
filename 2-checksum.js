/**
 * For each row, determine the difference between the largest value and the smallest value; the checksum is the sum of
 * all of these differences.
 * 
 * For example, given the following spreadsheet:
 * 5 1 9 5
 * 7 5 3
 * 2 4 6 8
 * The first row's largest and smallest values are 9 and 1, and their difference is 8.
 * The second row's largest and smallest values are 7 and 3, and their difference is 4.
 * The third row's difference is 6.
 * In this example, the spreadsheet's checksum would be 8 + 4 + 6 = 18.
 */

const fs = require('fs');
const _ = require('lodash');

const readFile = () => {
	return new Promise((resolve, reject) => {
		fs.readFile('2-checksum-input.txt', 'utf8', (err, data) => {
			if (err) {
				return reject(err);
			}

			resolve(data);
		});
	});
}

const checksum = (input) => {
	const rows = input.split('\n');
	let sum = 0;

	rows.forEach(row => {
		const rowNumbers = row.split('\t').map(Number);
		const smallest = _.min(rowNumbers);
		const largest = _.max(rowNumbers);
		const rowDiff = largest - smallest;

		sum += rowDiff;
	});

	return sum;
};

readFile()
	.then(data => console.log('Checksum is:', checksum(data)))
	.catch(err => console.log(err));

module.exports = checksum;