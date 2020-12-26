const path = require("path");
const fs = require("fs");

const readInput = () => {
  const filePath = path.resolve(__dirname, "input");
  return fs.readFileSync(filePath).toString();
};

const parseInput = () => {
  let input = readInput().split("\n");
  return input;
};

const countTree = (isTree, getNextPos, isBottomReached) => {
  let ans = 0;
  let pos = [0, 0];

  while (!isBottomReached(pos)) {
    if (isTree(pos)) {
      ans++;
    }

    pos = getNextPos(pos);
  }

  return ans;
};

const solve = () => {
  const map = parseInput();
  const height = map.length;
  const width = map[0].length || 0;
  const isTree = ([x, y]) => map[y] && map[y][x] === "#";
  const isBottomReached = ([_, y]) => y >= height;

  return [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]
    .map(([right, down]) => ([x, y]) => [(x + right) % width, y + down])
    .map((getNextPos) => countTree(isTree, getNextPos, isBottomReached))
    .reduce((acc, cur) => acc * cur, 1);
};

console.log(solve());
