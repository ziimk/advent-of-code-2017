/**
 * Each program has a name, weight, and (if they're holding a disc) the names of the programs immediately above them
 * balancing on that disc. You write this information down (your puzzle input). Unfortunately, in their panic, they
 * don't do this in an orderly fashion; by the time you're done, you're not sure which program gave which information.
 * 
 * For example, if your list is the following:
 * pbga (66)
 * xhth (57)
 * ebii (61)
 * havc (66)
 * ktlj (57)
 * fwft (72) -> ktlj, cntj, xhth
 * qoyq (66)
 * padx (45) -> pbga, havc, qoyq
 * tknk (41) -> ugml, padx, fwft
 * jptl (61)
 * ugml (68) -> gyxo, ebii, jptl
 * gyxo (61)
 * cntj (57)
 * ...then you would be able to recreate the structure of the towers that looks like this:
 *                 gyxo
 *               /     
 *          ugml - ebii
 *        /      \     
 *       |         jptl
 *       |        
 *       |         pbga
 *      /        /
 * tknk --- padx - havc
 *      \        \
 *       |         qoyq
 *       |             
 *       |         ktlj
 *        \      /     
 *          fwft - cntj
 *               \     
 *                 xhth
 * In this example, tknk is at the bottom of the tower (the bottom program), and is holding up ugml, padx, and fwft. 
 * Those programs are, in turn, holding up other programs; in this example, none of those programs are holding up any 
 * other programs, and are all the tops of their own towers.
 * 
 * What is the name of the bottom program?
 */

const fs = require('fs');
const _ = require('lodash');

const readFile = () => {
	return new Promise((resolve, reject) => {
		fs.readFile('7-tree-bottom-input.txt', 'utf8', (err, data) => {
			if (err) {
				return reject(err);
			}

			resolve(data);
		});
	});
};

const parseLine = (line) => {
	// from start of line to closing ')'
	let [name, weight] = line.substring(0, line.indexOf(')')).replace('(', '').split(' ');
	let children = [];
	
	if (line.includes('>')) {
		children = line.substring(line.indexOf('>') + 2).replace(/ /g, '').split(',');
	}
	weight = parseInt(weight, 10);

	return { name, weight, children };
};

const rootFinder = (input) => {
	const lines = input.split('\n');
	let programs = [];

	lines.forEach(line => {
		programs.push(parseLine(line));
	});

	const parentPrograms = programs.filter(program => program.children.length > 0);
	let hasParents = [];

	parentPrograms.forEach(program => {
		parentPrograms.forEach(programToSearch => {
			if (programToSearch.children.includes(program.name)) {
				hasParents.push(program);
			}
		});
	});

	return _.difference(parentPrograms, hasParents);
}

readFile()
	.then(data => console.log('Root element is:', rootFinder(data)))
	.catch(err => console.log(err));

module.exports = {
	parseLine,
	rootFinder
};