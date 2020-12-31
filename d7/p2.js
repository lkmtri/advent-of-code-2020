const path = require("path");
const fs = require("fs");

const readInput = () => {
  const filePath = path.resolve(__dirname, "input");
  return fs.readFileSync(filePath).toString();
};

const parseInput = () => {
  const getBag = (str) => {
    const [quantity, ...name] = str.split(" ");
    return [Number(quantity), name.join(" ")];
  };
  let input = readInput()
    .split(".\n")
    .map((rule) => {
      let [bag, content] = rule
        .split(".")
        .join(" ")
        .split(/bags?/)
        .join(" ")
        .split("contain")
        .map((cur) => cur.trim());
      if (content === "no other") {
        return;
      }
      content = content
        .split(",")
        .map((cur) => cur.trim())
        .map(getBag);
      return [bag, content];
    })
    .filter(Boolean);

  return input;
};

const solve = () => {
  const rules = parseInput();
  const map = {};

  rules.forEach(([bag, content]) => {
    map[bag] = content;
  });

  const mem = {};

  const count = (bag) => {
    const content = map[bag];

    if (!content) return 1;
    if (mem[bag] !== undefined) return mem[bag];

    let sum = 1;

    for (let i = 0; i < content.length; i++) {
      const [quantity, name] = content[i];
      sum += quantity * count(name);
    }

    mem[bag] = sum;
    return sum;
  };

  return count("shiny gold") - 1;
};

console.log(solve());
