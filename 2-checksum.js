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
 * 
 * --- Part Two ---
 * Find the only two numbers in each row where one evenly divides the other - that is, where the result of the division
 * operation is a whole number. Find those numbers on each line, divide them, and add up each line's result.
 * 
 * For example, given the following spreadsheet:
 * 5 9 2 8
 * 9 4 7 3
 * 3 8 6 5
 * In the first row, the only two numbers that evenly divide are 8 and 2; the result of this division is 4.
 * In the second row, the two numbers are 9 and 3; the result is 3.
 * In the third row, the result is 2.
 * In this example, the sum of the results would be 4 + 3 + 2 = 9.
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

const checksumPart2 = (input) => {
	const rows = input.split('\n');
	let sum = 0;

	rows.forEach(row => {
		const rowNumbers = row.split('\t').map(Number);

		rowNumbers.forEach(number => {
			rowNumbers.forEach(numberToDivide => {
				if (number !== numberToDivide && numberToDivide % number === 0) {
					sum += numberToDivide / number;
				}
			});
		});
	});

	return sum;
};

readFile()
	.then(data => {
		console.log('Checksum part1:', checksum(data));
		console.log('Checksum part2:', checksumPart2(data))
	})
	.catch(err => console.log(err));

module.exports = {
	checksum,
	checksumPart2
};