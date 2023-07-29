const fs = require('fs');
const args = process.argv;
const fileArg = args[2] ?? exit;
const file = fs.readFileSync(fileArg).toString();
if (!file) exit;

console.log('file loaded');

const isPartTwo = !!args[3];

/**
 * first col -> opp choice
 * second col -> my choice
*/
//
// [ str_wins str_draw int_point ]
const duelMapping = {
	'X': ['C', 'A', 1], // rock
	'Y': ['A', 'B', 2], // paper
	'Z': ['B', 'C', 3]  // scissors
};

const gameOutput = {
	'1': 6,  // win
	'-1': 0, // lose
	'0': 3   // draw
}

const partTwoOutcomeMap = {
	'Y': '0',
	'X': '-1',
	'Z': '1',
}

const games = file.split('\n');

let points = 0;
for (let game of games) {
	const gameSplit = game.split(' ');
	const oppPlay = gameSplit[0];
	let myPlay = gameSplit[1];

	if (gameSplit[0] === '') continue;

	let chosenDuel = duelMapping[myPlay];

	if (isPartTwo) {
		Object.keys(duelMapping).every((key) => {
			if (
				(
					partTwoOutcomeMap[myPlay] === '1' &&
					duelMapping[key][0] === oppPlay
				) || (
					partTwoOutcomeMap[myPlay] === '0' &&
					duelMapping[key][1] === oppPlay
				) || (
					partTwoOutcomeMap[myPlay] === '-1' &&
					!duelMapping[key].includes(oppPlay)
				)
			) {
				myPlay = key;	
				return false;
			}

			return true;
		})

		chosenDuel = duelMapping[myPlay];
	}

	if (chosenDuel[0] === oppPlay) {
		points += gameOutput['1'];
	} else if (chosenDuel[1] === oppPlay) {
		points += gameOutput['0'];
	} else {
		points += gameOutput['-1'];
	}

	points += chosenDuel[2];
}

console.log(points);

