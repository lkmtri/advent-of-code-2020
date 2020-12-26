const path = require("path");
const fs = require("fs");

const readInput = () => {
  const filePath = path.resolve(__dirname, "input");
  return fs.readFileSync(filePath).toString();
};

const parseInput = () => {
  let input = readInput();
  input = input.split("\n").map((line) => {
    let [policy, password] = line.split(":").map((str) => str.trim());
    let [range, letter] = policy.split(" ");
    let [min, max] = range.split("-");

    return { min, max, letter, password };
  });

  return input;
};

const solve = (input) => {
  let ans = 0

  const isValid = ({ min, max, letter, password }) => {
    const count = password.split('').filter((l) => l === letter).length

    return count >= min && count <= max
  }

  input.forEach((line) => {
    if (isValid(line)) ans++
  })

  return ans
};

console.log(solve(parseInput()));
