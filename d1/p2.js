const path = require('path')
const fs = require('fs')
const file = fs.readFileSync(path.resolve(__dirname, 'input.js'))
const input = file.toString().split('\n').map(Number)

const twoSum = (arr, sum) => {
  const map = {}

  for (let num of arr) {
    if (map[sum - num]) {
      return [num, sum - num]
    }
    map[num] = true
  }
}

const solve = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const find = twoSum(arr.slice(0, i), 2020 - arr[i])
    if (find) {
      const [first, second] = find
      return arr[i] * first * second
    }
  }
}

console.log(solve(input))
