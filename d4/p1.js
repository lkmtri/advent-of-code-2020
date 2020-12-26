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
  const requiredFields = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
  ];

  const isValid = (passport) => {
    const count = requiredFields.filter(
      (field) => passport[field] !== undefined
    ).length;

    return count === requiredFields.length
  };

  return passports.filter(isValid).length;
};

console.log(solve(parseInput()));
