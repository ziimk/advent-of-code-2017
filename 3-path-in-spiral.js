/**
 * Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while
 * spiraling outward. For example, the first few squares are allocated like this:
 * 17  16  15  14  13
 * 18   5   4   3  12
 * 19   6   1   2  11 <- Axis
 * 20   7   8   9  10
 * 21  22  23  24  25 ...
 *          ^
 *          |
 *         Axis
 * 
 * Requested data must be carried back to square 1. Always take the shortest path: the Manhattan Distance between the
 * location of the data and square 1.
 * 
 * For example:
 * Data from square 1 is carried 0 steps, since it's at the access port.
 * Data from square 12 is carried 3 steps, such as: down, left, left.
 * Data from square 23 is carried only 2 steps: up twice.
 * Data from square 1024 must be carried 31 steps.
 * How many steps are required to carry the data from the square identified in your puzzle input to the access port?
 * 
 * Your puzzle input is 312051
 */

const _ = require('lodash');

const getSteps = (input) => {
	if (input < 1) {
		throw new Error('No');
	}

	if (input === 1) {
		return 0;
	}

	let sideLength = Math.ceil(Math.sqrt(input));
	
	if (sideLength % 2 === 0) {
		sideLength++;
	}

	const largestElement = sideLength ** 2;
	const corners = {};

	corners.bottomRight = largestElement,
	corners.bottomLeft = largestElement - sideLength + 1,
	corners.topLeft = corners.bottomLeft - sideLength + 1,
	corners.topRight = corners.topLeft - sideLength + 1

	let stepsToAxis = 0;

	// such a dumb way
	_.forEach(corners, corner => {
		if (input === corner) {
			stepsToAxis = (sideLength - 1) / 2;
			return false;
		}

		if (corner - input === (sideLength - 1) / 2) {
			stepsToAxis = 0;
			return false;
		}

		if (corner - input >= sideLength) {
			// continue
			return;
		}

		let axis = corner - (sideLength - 1) / 2;

		stepsToAxis = Math.abs(axis - input);
		return false;
	});

	return stepsToAxis + ((sideLength - 1) / 2);
};

const input = 312051;

console.log(getSteps(input))

module.exports = {
	getSteps
}