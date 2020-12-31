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

  const findPossibleSum = (nums) => {
    const sum = {};

    for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < i; j++) {
        sum[nums[i] + nums[j]] = true;
      }
    }

    return sum;
  };

  for (let i = 25; i < input.length; i++) {
    const possibleSum = findPossibleSum(input.slice(i - 25, i));

    if (!possibleSum[input[i]]) {
      return input[i];
    }
  }
};

console.log(solve());
