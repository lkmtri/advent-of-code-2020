const path = require("path");
const fs = require("fs");

const readInput = () => {
  const filePath = path.resolve(__dirname, "input");
  return fs.readFileSync(filePath).toString();
};

const parseInput = () => {
  const input = readInput()
    .split("\n")
    .map((line) => line.split("").map((s) => s === "L"));

  return input;
};

const solve = () => {
  const input = parseInput();

  const seats = input.reduce((acc, row, rowIdx) => {
    row.forEach((s, colIdx) => s && acc.push([rowIdx, colIdx]));
    return acc;
  }, []);

  const getAdj = ([x, y]) => [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ];

  const isEmpty = ([x, y], seating) => !seating[x] || !seating[x][y];

  const getNextState = (cur) => {
    let hasChanged = false;
    let nextState = {};

    seats.forEach(([rowIdx, colIdx]) => {
      const adj = getAdj([rowIdx, colIdx]);
      const adjOccupiedCount = adj.filter(([r, c]) => cur[r] && cur[r][c])
        .length;
      nextState[rowIdx] = nextState[rowIdx] || {};
      const isOccupied = !isEmpty([rowIdx, colIdx], cur);

      if (!isOccupied && adjOccupiedCount === 0) {
        nextState[rowIdx][colIdx] = true;
        hasChanged = true;
      } else if (isOccupied && adjOccupiedCount >= 4) {
        nextState[rowIdx][colIdx] = false;
        hasChanged = true;
      } else {
        nextState[rowIdx][colIdx] = cur[rowIdx] && cur[rowIdx][colIdx];
      }
    });

    return [hasChanged, nextState];
  };

  let [changed, next] = getNextState({});

  while (changed) {
    [changed, next] = getNextState(next);
  }

  return seats.filter(
    ([rowIdx, colIdx]) => next[rowIdx] && next[rowIdx][colIdx]
  ).length;
};

console.log(solve());
