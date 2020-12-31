const path = require("path");
const fs = require("fs");

const readInput = () => {
  const filePath = path.resolve(__dirname, "input");
  return fs.readFileSync(filePath).toString();
};

const parseInput = () => {
  const input = readInput().split("\n").map(Number);

  return input;
};

const solve = () => {
  const input = parseInput();

  input.sort((a, b) => a - b);

  input[-1] = 0;

  let diff1Count = 0,
    diff3Count = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] - input[i - 1] === 1) {
      diff1Count++;
    } else if (input[i] - input[i - 1] === 3) {
      diff3Count++;
    }
  }

  return diff1Count * (diff3Count + 1);
};

console.log(solve());
