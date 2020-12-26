const path = require("path");
const fs = require("fs");

const readInput = () => {
  const filePath = path.resolve(__dirname, "input");
  return fs.readFileSync(filePath).toString();
};

const parseInput = () => {
  const getBag = (str) => {
    const [quantity, ...name] = str.split(' ')
    return [Number(quantity), name.join(' ')]
  }
  let input = readInput()
    .split(".\n")
    .map((rule) => {
      let [bag, content] = rule.split('.').join(' ').split(/bags?/).join(' ').split('contain').map((cur) => cur.trim())
      if (content === 'no other') {
        return
      }
      content = content.split(',').map((cur) => cur.trim()).map(getBag)
      return [bag, content]
    }).filter(Boolean)

  return input;
};

const solve = () => {
  const rules =  parseInput()
  const map = {}
  const outermost = {}

  rules.forEach(([bag, content]) => {
    outermost[bag] = true
    content.forEach(([, name]) => {
      map[name] = map[name] || []
      map[name].push(bag)
    })
  })

  const queue = ['shiny gold']
  const visited = {
    'shiny gold': true
  }

  const ans = {}

  while (queue.length) {
    const cur = queue.shift();

    (map[cur] || []).forEach((next) => {
      if (outermost[next]) {
        ans[next] = true
      }

      if (!visited[next]) {
        queue.push(next)
      }
    })
  }

  return Object.keys(ans).length
}


console.log(solve());
