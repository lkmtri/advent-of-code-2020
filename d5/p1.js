const path = require("path");
const fs = require("fs");

const readInput = () => {
  const filePath = path.resolve(__dirname, "input");
  return fs.readFileSync(filePath).toString();
};

const parseInput = () => {
  let input = readInput()
    .split("\n")
    .map((line) => {
      const letters = line.split('')
      const row = letters.slice(0, 7).map((l) => l === 'B' ? 1 : 0)
      const seat = letters.slice(7).map((l) => l === 'L' ? 0 : 1)
      return [row, seat]
    })

  return input;
};

const solve = () => {
  const boardingPasses = parseInput()

  const binary = (num) => {
    let ans = 0

    num.forEach((cur) => {
      if (cur) {
        ans = 2 * ans + 1
      } else {
        ans = 2 * ans
      }
    })

    return ans
  }

  let max = -Infinity

  boardingPasses.forEach(([row, seat]) => {
    const r = binary(row)
    const s = binary(seat)

    const seatId = r * 8 + s
    
    if (seatId > max) {
      max = seatId
    }
  })

  return max
}


console.log(solve());
