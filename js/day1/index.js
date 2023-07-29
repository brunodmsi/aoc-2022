const fs = require('fs');
const args = process.argv;
const fileArg = args[2] ?? exit;
const file = fs.readFileSync(fileArg).toString();
if (!file) exit;

console.log('file loaded');

const splittedVals = file.split('\n');
let elfs = [];
let indexCounter = 0;
for (let val of splittedVals) {
	if (val.toString().length > 0) {
		if (elfs[indexCounter]) {
			elfs[indexCounter].push(+val);
		} else {
			elfs[indexCounter] = [+val];
		}
	}	else {
		if (elfs[indexCounter]) {
			indexCounter++;
		}
	}
}

const elfTotalByIndex = elfs.map(
	(elf) => elf.reduce((acc, val) => (+acc) + (+val), 0)
);

const orderedDescElfTotal = elfTotalByIndex.sort((a, b) => a - b).reverse()

console.log(`part one -> ${orderedDescElfTotal[0]}`); 
console.log(`part two -> ` +
	`${orderedDescElfTotal[0] + orderedDescElfTotal[1] + orderedDescElfTotal[2]}`
); 



