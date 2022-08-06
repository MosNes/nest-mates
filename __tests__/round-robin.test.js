const roundRobin = require('../utils/round-robin');

test('assigns daily tasks in round robin pattern', () => {
	const nestMateArr = ['Hank', 'Bill', 'Dale', 'Boomhauer', 'Bobby'];

	const dailyTaskArr = ['Dishes', 'Trash', 'Walk Dog'];

	const days = 5;

	expect(roundRobin(nestMateArr, dailyTaskArr, days).length).toEqual(5);
	expect(roundRobin(nestMateArr, dailyTaskArr, days)[0]).toEqual([
		'Hank',
		'Dishes',
	]);
	expect(roundRobin(nestMateArr, dailyTaskArr, days)[1]).toEqual([
		'Bill',
		'Trash',
	]);
	expect(roundRobin(nestMateArr, dailyTaskArr, days)[2]).toEqual([
		'Dale',
		'Walk Dog',
	]);
	expect(roundRobin(nestMateArr, dailyTaskArr, days)[3]).toEqual([
		'Boomhauer',
		'Dishes',
	]);
	expect(roundRobin(nestMateArr, dailyTaskArr, days)[4]).toEqual([
		'Bobby',
		'Trash',
	]);
});
