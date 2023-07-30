const fs = require('fs');
const args = process.argv;
const fileArg = args[2] ?? exit;
const file = fs.readFileSync(fileArg).toString();
if (!file) exit;

console.log('file loaded');

const lines = file.split('\n');

let sum = 0;
lines.forEach((line) => {
	const lineLength = line.length;
	const splitIn = Math.floor(lineLength / 2) ;
	const firstSlice = line.slice(0, splitIn);
	const secondSlice = line.slice(splitIn, lineLength);

	const duplicates = Array.from(new Set(firstSlice.split('').filter(
		first => secondSlice.split('').some(second => second === first)
	)));

	const duplicatesValues = duplicates.map((dup) => {
		if (dup === dup.toUpperCase()) {
			return dup.charCodeAt(0) - 64 + 26;
		} else if (dup === dup.toLowerCase()) {
			return dup.charCodeAt(0) - 96;
		}
	})

	sum += duplicatesValues.reduce((acc, val) => acc + val, 0);
});

console.log(sum);
