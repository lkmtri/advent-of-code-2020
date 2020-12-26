const path = require('path')
const fs = require('fs')

const readInput = () => {
  const filePath = path.resolve(__dirname, 'input')
  return fs.readFileSync(filePath).toString()
}

const parseInput = () => {
  let input = readInput().split('\n')
  return input
}

const solve = (getNextPos) => {
  const input = parseInput()
  const height = input.length
  const width = input[0].length || 0

  const getNextPos = ([x, y]) => [(x + 3) % width, y + 1]

  const isTree = ([x, y]) => input[y][x] === '#'

  let ans = 0
  let pos = [0, 0]

  while (pos[1] < height) {
    if (isTree(pos)) {
      ans++
    }
    pos = getNextPos(pos)
  }

  return ans
}

console.log(solve())