const { parseLine, rootFinder } = require('../7-tree-bottom');

describe('parseLine()', () => {
	it('parses program name and weight', () => {
		const result = parseLine('pbga (66)');

		expect(result).toEqual({
			children: [],
			name: 'pbga',
			weight: 66
		});
	});

	it('parses program name, weight and children', () => {
		const result = parseLine('ugml (68) -> gyxo, ebii, jptl');

		expect(result).toEqual({
			children: ['gyxo', 'ebii', 'jptl'],
			name: 'ugml',
			weight: 68
		});
	});
});

describe('rootFinder()', () => {
	it('finds root element', () => {
		const input = 'pbga (66)\n' +
			'xhth (57)\n' +
			'ebii (61)\n' +
			'havc (66)\n' +
			'ktlj (57)\n' +
			'fwft (72) -> ktlj, cntj, xhth\n' +
			'qoyq (66)\n' +
			'padx (45) -> pbga, havc, qoyq\n' +
			'tknk (41) -> ugml, padx, fwft\n' +
			'jptl (61)\n' +
			'ugml (68) -> gyxo, ebii, jptl\n' +
			'gyxo (61)\n' +
			'cntj (57)';
	
		const result = rootFinder(input);

		expect(result).toEqual({
			children: ['ugml', 'padx', 'fwft'],
			name: 'tknk',
			weight: 41
		});
	});
});