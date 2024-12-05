import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const matches = input.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);
  let total = 0;
  if(matches) {
    for(const match of matches) {
      const split = match.substring(4, match.length - 1).split(",");
      total += (Number.parseInt(split[0]) * Number.parseInt(split[1]))
    }
  }
  
  console.log(total);
}

processInstructions();