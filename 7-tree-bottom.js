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
 *
 * --- Part Two ---
 * For any program holding a disc, each program standing on that disc forms a sub-tower. Each of those sub-towers are 
 * supposed to be the same weight, or the disc itself isn't balanced. The weight of a tower is the sum of the weights 
 * of the programs in that tower.
 * In the example above, this means that for ugml's disc to be balanced, gyxo, ebii, and jptl must all have the same 
 * weight, and they do: 61.
 * However, for tknk to be balanced, each of the programs standing on its disc and all programs above it must each 
 * match. This means that the following sums must all be the same:
 * ugml + (gyxo + ebii + jptl) = 68 + (61 + 61 + 61) = 251
 * padx + (pbga + havc + qoyq) = 45 + (66 + 66 + 66) = 243
 * fwft + (ktlj + cntj + xhth) = 72 + (57 + 57 + 57) = 243
 * As you can see, tknk's disc is unbalanced: ugml's stack is heavier than the other two. Even though the nodes above 
 * ugml are balanced, ugml itself is too heavy: it needs to be 8 units lighter for its stack to weigh 243 and keep the 
 * towers balanced. If this change were made, its weight would be 60.
 * 
 * Given that exactly one program is the wrong weight, what would its weight need to be to balance the entire tower?
 */

const readFile = require('./util/read-file');
const _ = require('lodash');

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

const addBranchWeights = (programs, root) => {
	const rootElement = _.find(programs, { name: root });
	let totalWeight = 0;

	if (rootElement.children.length > 0) {
		rootElement.children.forEach(child => {
			totalWeight += addBranchWeights(programs, child);
		})
	}

	totalWeight += rootElement.weight;
	if (rootElement.children.length > 0) {
		rootElement.totalWeight = totalWeight;
	}

	return totalWeight;
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

	const root = _.difference(parentPrograms, hasParents)[0];

	root.children.forEach(firstLevelChild => {
		addBranchWeights(programs, firstLevelChild);
	});

	/*
	[ 'twimhx', 'wfdiqkg', 'guuri', 'qwada', 'mwsivlf' ].forEach(name => {
		console.log(_.find(programs, { name }));
	});

	[ 'wfkcsb', 'qlboef', 'pkowhq' ].forEach(name => {
		console.log(_.find(programs, { name }));
	});

	[ 'zfrsmm', 'tlskukk', 'fqkbscn', 'mlafk' ].forEach(name => {
		console.log(_.find(programs, { name }));
	});

	// Manually found part 2 answer: 1458
	*/

	return root;
}

readFile('7-tree-bottom-input.txt')
	.then(data => console.log('Root element is:', rootFinder(data)))
	.catch(err => console.log(err));

module.exports = {
	parseLine,
	rootFinder
};