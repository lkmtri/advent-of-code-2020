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

  const seats = []

  boardingPasses.forEach(([row, seat]) => {
    const r = binary(row)
    const s = binary(seat)

    if (r > 0 && r < 127) {
      seats.push(r * 8 + s)
    }
  })

  seats.sort((a, b) => a - b)

  for (let i = 0; i < seats.length - 1; i++) {
    if (seats[i] + 2 === seats[i + 1]) {
      return seats[i] + 1
    }
  }
}


console.log(solve());
