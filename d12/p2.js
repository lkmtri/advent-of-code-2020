const path = require("path");
const fs = require("fs");

const readInput = () => {
  const filePath = path.resolve(__dirname, "input");
  return fs.readFileSync(filePath).toString();
};

const parseInput = () => {
  const input = readInput()
    .split("\n")
    .map((line) => [line[0], Number(line.slice(1))]);

  return input;
};

const solve = () => {
  const input = parseInput();

  let [x, y] = [10, 1];
  let [px, py] = [0, 0];

  function rotate([cx, cy], [x, y], angle) {
    var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = cos * (x - cx) + sin * (y - cy) + cx,
      ny = cos * (y - cy) - sin * (x - cx) + cy;
    return [Math.round(nx), Math.round(ny)];
  }

  const getNextState = ([curPx, curPy], [curX, curY], [move, value]) => {
    switch (move) {
      case "N":
        return [
          [curPx, curPy],
          [curX, curY + value],
        ];
      case "S":
        return [
          [curPx, curPy],
          [curX, curY - value],
        ];
      case "E":
        return [
          [curPx, curPy],
          [curX + value, curY],
        ];
      case "W":
        return [
          [curPx, curPy],
          [curX - value, curY],
        ];
      case "R":
        return [[curPx, curPy], rotate([0, 0], [curX, curY], value)];
      case "L":
        return [[curPx, curPy], rotate([0, 0], [curX, curY], -value)];
      case "F":
        return [
          [curPx + value * curX, curPy + value * curY],
          [curX, curY],
        ];
    }
  };

  input.forEach(([m, v]) => {
    [[px, py], [x, y]] = getNextState([px, py], [x, y], [m, v]);
    console.log([m, v], [px, py], [x, y]);
  });

  return Math.abs(Math.round(px)) + Math.abs(Math.round(py));
};

console.log(solve());
