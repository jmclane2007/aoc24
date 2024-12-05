import * as fs from 'fs';

function processInstructions() {
  let input = fs.readFileSync("input.txt", "utf8");
  const splits = input.split("don't()");
  let total = 0;
  total += getMultis(splits[0]);
  for(let i = 1; i < splits.length; i++) {
    const index = splits[i].indexOf("do()");
    if(index > -1) {
      total += getMultis(splits[i].substring(index + 4));
    }
  }
  console.log(total);
}

function getMultis(str: string): number {
  const matches = str.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);
  let total = 0;
  if(matches) {
    for(const match of matches) {
      const split = match.substring(4, match.length - 1).split(",");
      total += (Number.parseInt(split[0]) * Number.parseInt(split[1]))
    }
  }
  return total;
}
processInstructions();
