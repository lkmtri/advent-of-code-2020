const path = require('path')
const fs = require('fs')
const file = fs.readFileSync(path.resolve(__dirname, 'input'))
const input = file.toString().split('\n').map(Number)

const solve = (arr) => {
  const map = {}

  for (let num of arr) {
    if (map[2020 - num]) {
      return num * (2020 - num)
    }
    map[num] = true
  }
}

console.log(solve(input))
