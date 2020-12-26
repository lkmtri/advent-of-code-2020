const path = require("path");
const fs = require("fs");

const readInput = () => {
  const filePath = path.resolve(__dirname, "input");
  return fs.readFileSync(filePath).toString();
};

const parseInput = () => {
  let input = readInput()
    .split("\n\n")
    .map((line) => {
      let passport = line
        .split("\n")
        .join(" ")
        .split(" ")
        .reduce((acc, field) => {
          const [key, value] = field.split(":");
          acc[key] = value;
          return acc;
        }, {});

      return passport;
    });

  return input;
};

const solve = (passports) => {
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  const rules = {
    byr: (num) =>
      Number.isInteger(Number(num)) &&
      Number(num) >= 1920 &&
      Number(num) <= 2002,
    iyr: (num) =>
      Number.isInteger(Number(num)) &&
      Number(num) >= 2010 &&
      Number(num) <= 2020,
    eyr: (num) =>
      Number.isInteger(Number(num)) &&
      Number(num) >= 2020 &&
      Number(num) <= 2030,
    hgt: (h) => {
      if (typeof h !== 'string') return false;
      const unit = h.split("in").length > 1 ? "in" : "cm";
      const [val] = h.split(unit);

      if (unit === "in") {
        return Number(val) >= 59 && Number(val) <= 76;
      }

      return Number(val) >= 150 && Number(val) <= 193;
    },
    hcl: (val) => {
      if (typeof val !== 'string') return false;

      return /^#[0-9a-f]{6}$/.test(val);
    },
    ecl: (val) =>
      ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val),
    pid: (val) => {
      if (typeof val !== 'string') return false;
      return /^[0-9]{9}$/.test(val);
    },
  };

  const isValid = (passport) => {
    const count = requiredFields.filter(
      (field) => rules[field](passport[field])
    ).length;

    return count === requiredFields.length;
  };

  return passports.filter(isValid).length;
};

console.log(solve(parseInput()));
