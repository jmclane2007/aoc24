import * as fs from 'fs';

const DIRECTIONS = [[-1,0],[0,1],[1,0],[0,-1]];

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput = input.split("\r\n");
  const grid = new Array(splitInput.length).fill([]).map(arr => new Array(splitInput[0].length).fill("."));
  let startPos = [0,0];
  for(let i = 0; i < splitInput.length; i++) {
    for(let j = 0; j < splitInput[0].length; j++) {
      const char = splitInput[i].charAt(j);
      grid[i][j] = char;
      if(char === "^") {
        startPos = [i,j];
        grid[i][j] = "*"
      }
    }
  }

  console.log(walk(grid, startPos));
}

function walk(grid: string[][], startPos: number[]) {
  let row = startPos[0];
  let col = startPos[1];
  // Start at 1 because of where the guard starts
  let count = 1;
  let dir = 0;
  while(row > -1 && col > -1 && row < grid.length && col < grid[0].length) {
    console.log(row, col);
    if(row + DIRECTIONS[dir%4][0] < 0 || col + DIRECTIONS[dir%4][1] < 0 || row + DIRECTIONS[dir%4][0] >= grid.length || col + DIRECTIONS[dir%4][1] >= grid[0].length) {
      return count;
    }
    if(grid[row + DIRECTIONS[dir%4][0]][col + DIRECTIONS[dir%4][1]] === "#") {
      dir++;
    } else if (grid[row + DIRECTIONS[dir%4][0]][col + DIRECTIONS[dir%4][1]] === ".") {
      count++;
      grid[row + DIRECTIONS[dir%4][0]][col + DIRECTIONS[dir%4][1]] = "*";
      row += DIRECTIONS[dir%4][0];
      col += DIRECTIONS[dir%4][1];
    } else {
      row += DIRECTIONS[dir%4][0];
      col += DIRECTIONS[dir%4][1];
    }
  }
  return count;
}

processInstructions();