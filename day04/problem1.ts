import * as fs from 'fs';

const DIRECTIONS = 
  [[0,1,0,2,0,3],
  [0,-1,0,-2,0,-3],
  [1,0,2,0,3,0],
  [-1,0,-2,0,-3,0],
  [1,1,2,2,3,3],
  [-1,1,-2,2,-3,3],
  [-1,-1,-2,-2,-3,-3],
  [1,-1,2,-2,3,-3]]

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput = input.split("\r\n");
  let total = 0;
  for(let i = 0; i < splitInput.length; i++) {
    for(let j = 0; j < splitInput[0].length; j++) {
      if(splitInput[i][j] === "X") {
        total += checkDirections(i, j, splitInput);
      }
    }
  }
  
  console.log(total);
}

function checkDirections(row: number, col: number, input: string[]) {
  let total = 0;
  for(const dir of DIRECTIONS) {
    // check bounds first
    if(row+dir[4] > -1 && row+dir[4] < input.length && col + dir[5] > -1 && col + dir[5] < input[0].length) {
      if(input[row+dir[0]].charAt(col + dir[1]) === "M" &&
      input[row+dir[2]].charAt(col + dir[3]) === "A" &&
      input[row+dir[4]].charAt(col + dir[5]) === "S") {
        total++;
      }
    }
  }
  return total;
}

processInstructions();