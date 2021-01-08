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

  const getDirection = (degree) => {
    const radian = (degree / 180) * Math.PI;
    return [Math.round(Math.cos(radian)), Math.round(Math.sin(radian))];
  };

  const getNextState = ([curX, curY, curDir], [move, value]) => {
    switch (move) {
      case "N":
        return [curX, curY + value, curDir];
      case "S":
        return [curX, curY - value, curDir];
      case "E":
        return [curX + value, curY, curDir];
      case "W":
        return [curX - value, curY, curDir];
      case "R":
        return [curX, curY, (curDir - value + 360) % 360];
      case "L":
        return [curX, curY, (curDir + value) % 360];
      case "F":
        const [dx, dy] = getDirection(curDir);
        return [curX + value * dx, curY + value * dy, curDir];
    }
  };

  const [x, y] = input.reduce(getNextState, [0, 0, 0]);

  return Math.abs(x) + Math.abs(y);
};

console.log(solve());
