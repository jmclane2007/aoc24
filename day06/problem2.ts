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
  let count = 0;
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[0].length; j++) {
      if(grid[i][j] === ".") {
        grid[i][j] = "#";
        if(isLoop(grid, startPos)) {
          count++;
        }
        grid[i][j] = ".";
      }
    }
  }
  console.log(count);
}

function isLoop(grid: string[][], startPos: number[]) {
  let row = startPos[0];
  let col = startPos[1];
  const maxSteps = grid.length * grid[0].length;
  let steps = 0;
  let dir = 0;
  while(steps < maxSteps) {
    if(row + DIRECTIONS[dir%4][0] < 0 || col + DIRECTIONS[dir%4][1] < 0 || row + DIRECTIONS[dir%4][0] >= grid.length || col + DIRECTIONS[dir%4][1] >= grid[0].length) {
      return false;
    }
    if(grid[row + DIRECTIONS[dir%4][0]][col + DIRECTIONS[dir%4][1]] === "#") {
      dir++;
    } else {
      steps++;
      row += DIRECTIONS[dir%4][0];
      col += DIRECTIONS[dir%4][1];
    }
  }
  return true;
}

processInstructions();

// Wanted to get this to work without brute forcing. Feels like I'm on the right track, but can't figure it out.
// The idea is to only place obstacles in front of the path of the guard.
// import * as fs from 'fs';

// const DIRECTIONS = [[-1,0],[0,1],[1,0],[0,-1]];

// function processInstructions() {
//   const input = fs.readFileSync("input.txt", "utf8");
//   const splitInput = input.split("\r\n");
//   const grid = new Array(splitInput.length).fill([]).map(arr => new Array(splitInput[0].length).fill("."));
//   let startPos = [0,0];
//   for(let i = 0; i < splitInput.length; i++) {
//     for(let j = 0; j < splitInput[0].length; j++) {
//       const char = splitInput[i].charAt(j);
//       grid[i][j] = char;
//       if(char === "^") {
//         startPos = [i,j];
//         grid[i][j] = ".";
//       }
//     }
//   }
//   console.log(walk(grid, startPos));
// }

// function walk(grid: string[][], startPos: number[]) {
//   let row = startPos[0];
//   let col = startPos[1];
//   // Start at 1 because of where the guard starts
//   let count = 0;
//   let dir = 0;
//   while(row > -1 && col > -1 && row < grid.length && col < grid[0].length) {
//     if(row + DIRECTIONS[dir%4][0] < 0 || col + DIRECTIONS[dir%4][1] < 0 || row + DIRECTIONS[dir%4][0] >= grid.length || col + DIRECTIONS[dir%4][1] >= grid[0].length) {
//       return count;
//     }
    
//     if(grid[row + DIRECTIONS[dir%4][0]][col + DIRECTIONS[dir%4][1]] === "#") {
//       dir++;
//     } else {
//       grid[row + DIRECTIONS[dir%4][0]][col + DIRECTIONS[dir%4][1]] = "#";
//       if(isLoop(grid, [row,col], dir)) {
//         console.log(row, col);
//         count++;
//       }
//       grid[row + DIRECTIONS[dir%4][0]][col + DIRECTIONS[dir%4][1]] = ".";
//       row += DIRECTIONS[dir%4][0];
//       col += DIRECTIONS[dir%4][1];
//     }
//   }
//   return count;
// }

// function isLoop(grid: string[][], startPos: number[], dir: number) {
//   let row = startPos[0];
//   let col = startPos[1];
//   const maxSteps = grid.length * grid[0].length;
//   let steps = 0;
//   while(row > -1 && col > -1 && row < grid.length && col < grid[0].length) {
//     if(steps > maxSteps) {
//       return true;
//     }
//     if(row + DIRECTIONS[dir%4][0] < 0 || col + DIRECTIONS[dir%4][1] < 0 || row + DIRECTIONS[dir%4][0] >= grid.length || col + DIRECTIONS[dir%4][1] >= grid[0].length) {
//       return false;
//     }
    
//     if(grid[row + DIRECTIONS[dir%4][0]][col + DIRECTIONS[dir%4][1]] === "#") {
//       dir++;
//     } else if (grid[row + DIRECTIONS[dir%4][0]][col + DIRECTIONS[dir%4][1]] === ".") {
//       grid[row + DIRECTIONS[dir%4][0]][col + DIRECTIONS[dir%4][1]] = ".";
//       row += DIRECTIONS[dir%4][0];
//       col += DIRECTIONS[dir%4][1];
//       steps++;
//     } else {
//       row += DIRECTIONS[dir%4][0];
//       col += DIRECTIONS[dir%4][1];
//       steps++;
//     }
//   }
//   return false;
// }
// processInstructions();
