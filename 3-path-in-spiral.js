/**
 * Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while
 * spiraling outward. For example, the first few squares are allocated like this:
 * 17  16  15  14  13
 * 18   5   4   3  12
 * 19   6   1   2  11
 * 20   7   8   9  10
 * 21  22  23  24  25 ...
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

let table = [];
let largestElement = 0;

const getSideLength = (input) => {
	let sideLength = Math.ceil(Math.sqrt(input));
	
	if (sideLength % 2 === 0) {
		sideLength++;
	}

	return sideLength;
}

const stepsToCentre = (getSideLength(input) - 1) / 2;
// return;

// for (let ring = 1; ring <= 280; ring++) {
// 	const elementsInRing = ring === 1 ? 1 : (ring - 1) * 8;

// 	console.log(ring);
// 	largestElement += elementsInRing
// 	console.log('suurim', largestElement);

// 	//for (let element = 0; column < 3; column++) {
// 		//table[row][]
// 	//}
// }

module.exports = {
	getSideLength
}