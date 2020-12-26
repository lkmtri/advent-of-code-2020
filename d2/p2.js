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
    let [positions, letter] = policy.split(" ");
    positions = positions.split('-')

    return { positions, letter, password };
  });

  return input;
};

const solve = (input) => {
  let ans = 0

  const isValid = ({ positions, letter, password }) => {
    return positions.map((cur) => password[cur - 1]).filter(cur => cur === letter).length === 1
  }

  input.forEach((line) => {
    if (isValid(line)) ans++
  })

  return ans
};

console.log(solve(parseInput()));
