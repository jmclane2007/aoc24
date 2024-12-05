import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput = input.split("\r\n");
  let total = 0;
  for(let i = 1; i < splitInput.length-1; i++) {
    for(let j = 1; j < splitInput[0].length-1; j++) {
      if(splitInput[i][j] === "A") {
        total += checkDirections(i, j, splitInput);
      }
    }
  }
  
  console.log(total);
}

function checkDirections(row: number, col: number, input: string[]) {
  let total = 0;
  const topLeft = input[row-1].charAt(col-1);
  const topRight = input[row-1].charAt(col+1);
  const botLeft = input[row+1].charAt(col-1);
  const botRight = input[row+1].charAt(col+1);
  if((topLeft === "M" && botRight === "S") || (topLeft === "S" && botRight === "M")) {
    if((topRight === "M" && botLeft === "S") || (topRight === "S" && botLeft === "M")) {
      total++
    }
  }
  return total;
}

processInstructions();