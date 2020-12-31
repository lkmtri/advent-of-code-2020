const path = require("path");
const fs = require("fs");

const readInput = () => {
  const filePath = path.resolve(__dirname, "input");
  return fs.readFileSync(filePath).toString();
};

const parseInput = () => {
  const input = readInput().split('\n')
  
  return input.map((line) => {
    const [instruction, val] = line.split(' ')

    if (instruction === 'nop') {
      return ['jump', 1]
    }

    return [instruction, Number(val)]
  })
};

const solve = () => {
  const rules =  parseInput()
  const visited = {}

  let acc = 0
  let idx = 0

  while (!visited[idx]) {
    const [instruction, val] = rules[idx]
    visited[idx] = true

    if (instruction === 'acc') {
      acc += val
      idx++
    } else {
      idx += val
    }
  }

  return acc
}


console.log(solve());
