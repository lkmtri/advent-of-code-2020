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

  const prefixSum = [];

  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    sum += input[i];
    prefixSum.push(sum);
  }

  prefixSum[-1] = 0;

  let start, end;

  for (let i = 1; i < input.length; i++) {
    for (let j = 0; j < i; j++) {
      if (prefixSum[i] - prefixSum[j - 1] === 20874512) {
        start = j;
        end = i;
      }
    }
  }

  const findLargestTwo = (arr) => {
    const largestTwo = [];

    for (let i = 0; i < arr.length; i++) {
      largestTwo.push(arr[i]);
      if (largestTwo.length > 2) {
        largestTwo.sort((a, b) => b - a > 0);
        largestTwo.pop();
      }
    }

    return largestTwo;
  };

  const [first, second] = findLargestTwo(input.slice(start, end + 1));

  return first + second;
};

console.log(solve());
