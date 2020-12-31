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

  input.unshift(0);
  input.push(input[input.length - 1] + 3);

  const res = [];
  res[0] = 1;

  for (let i = 1; i < input.length; i++) {
    let sum = 0;

    for (let j = 1; j <= 3; j++) {
      if (i - j >= 0 && input[i] - input[i - j] <= 3) {
        sum += res[i - j];
      }
    }

    res[i] = sum;
  }

  return res[input.length - 1];
};

console.log(solve());
