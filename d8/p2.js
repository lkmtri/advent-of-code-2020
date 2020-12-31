const path = require("path");
const fs = require("fs");

const readInput = () => {
  const filePath = path.resolve(__dirname, "input");
  return fs.readFileSync(filePath).toString();
};

const parseInput = () => {
  const input = readInput().split("\n");

  return input.map((line) => {
    const [instruction, val] = line.split(" ");

    return [instruction, Number(val)];
  });
};

const solve = () => {
  const rules = parseInput();

  const run = (instructions) => {
    const visited = {};

    let acc = 0;
    let idx = 0;

    while (!visited[idx] && idx < instructions.length) {
      const [instruction, val] = rules[idx];
      visited[idx] = true;

      if (instruction === "acc") {
        acc += val;
        idx++;
      } else if (instruction === "jmp") {
        idx += val;
      } else {
        idx++;
      }
    }

    if (idx < instructions.length) {
      return undefined;
    }

    return acc;
  };

  const flip = (instruction) => {
    if (instruction[0] === "nop") {
      instruction[0] = "jmp";
    } else if (instruction[0] === "jmp") {
      instruction[0] = "nop";
    }
  };

  for (let i = 0; i < rules.length; i++) {
    if (rules[i][0] !== "acc") {
      flip(rules[i]);
      const res = run(rules);
      if (res !== undefined) {
        return res;
      }
      flip(rules[i]);
    }
  }
};

console.log(solve());
