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

  const isSeat = ([x, y]) => input[x][y];

  const isWithinBound = ([x, y]) =>
    x >= 0 && x < input.length && y >= 0 && y < input[0].length;

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const isEmpty = ([x, y], seating) => !seating[x] || !seating[x][y];

  const isDirectionClear = ([x, y], direction, seating) => {
    let inc = 1;
    const [dx, dy] = direction;
    const getPoint = () => [x + inc * dx, y + inc * dy];

    let point = getPoint();

    while (isWithinBound(point)) {
      if (isSeat(point)) {
        return isEmpty(point, seating);
      }
      inc++;
      point = getPoint();
    }

    return true;
  };

  const getNextState = (cur) => {
    let hasChanged = false;
    let nextState = {};

    seats.forEach(([rowIdx, colIdx]) => {
      const occupiedDirectionCount = directions.filter(
        (direction) => !isDirectionClear([rowIdx, colIdx], direction, cur)
      ).length;

      const isOccupied = !isEmpty([rowIdx, colIdx], cur);

      nextState[rowIdx] = nextState[rowIdx] || {};

      if (!isOccupied && occupiedDirectionCount === 0) {
        nextState[rowIdx][colIdx] = true;
        hasChanged = true;
      } else if (isOccupied && occupiedDirectionCount >= 5) {
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

  return seats.filter(([rowIdx, colIdx]) => !isEmpty([rowIdx, colIdx], next))
    .length;
};

console.log(solve());
