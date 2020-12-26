const path = require("path");
const fs = require("fs");

const readInput = () => {
  const filePath = path.resolve(__dirname, "input");
  return fs.readFileSync(filePath).toString();
};

const parseInput = () => {
  let input = readInput()
    .split("\n\n")
    .map((group) => {
      const person = group.split('\n')
      return person
    })

  return input;
};

const solve = () => {
  const answers = parseInput()

  const count = (group) => {
    let ans = {}

    group.forEach((person) => {
      for (let i = 0; i < person.length; i++) {
        ans[person[i]] = true
      }
    })

    return Object.keys(ans).length
  }

  return answers.reduce((acc, cur) => acc + count(cur), 0)
}


console.log(solve());
