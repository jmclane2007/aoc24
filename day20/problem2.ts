import * as fs from 'fs';

interface Point {
  row: number;
  col: number;
}

const CHEAT_LENGTH = 20;
let CHEATS: number[][] = generateCheats(CHEAT_LENGTH);

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\r\n");
  const NUM_ROWS = lines.length, NUM_COLS = lines[0].length;
  const grid = new Array(NUM_ROWS).fill([]).map(arr => new Array(NUM_COLS).fill(Number.MAX_SAFE_INTEGER));
  let start = {row: 0, col: 0}, end = {row: 0, col: 0};
  for(let i = 0; i < NUM_ROWS; i++) {
    for(let j = 0; j < NUM_COLS; j++) {
      if(lines[i].charAt(j) === "S") {
        start = {row: i, col: j};
      } else if(lines[i].charAt(j) === "E") {
        end = {row: i, col: j};
      } else if(lines[i].charAt(j) === "#") {
        grid[i][j] = -1;
      }
    }
  }
  grid[start.row][start.col] = 0;
  // Run dijkstras then attempt to cheat at every point within 20 manhattan distance
  dijkstras(grid, start.row, start.col);
  let total = 0;
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[0].length; j++) {
      if(grid[i][j] !== -1) {
        total += checkCheat(grid, i, j);
      }
    }
  }
  console.log(total);
}

function dijkstras(grid: number[][], startRow: number, startCol: number) {
  const stack: Point[] = [{row: startRow, col: startCol}];
  let distance = Number.MAX_SAFE_INTEGER;
  while(stack.length > 0) {
    const currPoint = stack.pop();
    const currRow = currPoint!.row;
    const currCol = currPoint!.col;
    distance = grid[currRow][currCol];
    // For each adjacency
    if(currRow + 1 < grid.length && grid[currRow + 1][currCol] !== -1 && grid[currRow + 1][currCol] > distance + 1) {
      grid[currRow + 1][currCol] = distance + 1;
      stack.push({row: currRow + 1, col: currCol})
    }
    if(currRow - 1 >= 0 && grid[currRow - 1][currCol] !== -1 && grid[currRow - 1][currCol] > distance + 1) {
      grid[currRow - 1][currCol] = distance + 1;
      stack.push({row: currRow - 1, col: currCol})
    }
    if(currCol + 1 < grid[0].length && grid[currRow][currCol + 1] !== -1 && grid[currRow][currCol + 1] > distance + 1) {
      grid[currRow][currCol + 1] = distance + 1;
      stack.push({row: currRow, col: currCol + 1})
    }
    if(currCol - 1 >= 0 && grid[currRow][currCol - 1] !== -1 && grid[currRow][currCol - 1] > distance + 1) {
      grid[currRow][currCol - 1] = distance + 1;
      stack.push({row: currRow, col: currCol - 1})
    }
  }

  return distance;
}

function checkCheat(grid: number[][], row: number, col: number) {
  let count = 0;
  for(let i = 0; i < CHEATS.length; i++) {
    const newRow = row + CHEATS[i][0];
    const newCol = col + CHEATS[i][1];
    const cheatDist = Math.abs(CHEATS[i][0]) + Math.abs(CHEATS[i][1]) + 100;
    if(newRow > -1 && newRow < grid.length && newCol > -1 && newCol < grid[0].length && grid[newRow][newCol] !== Number.MAX_SAFE_INTEGER && grid[row][col] + cheatDist <= grid[newRow][newCol]) {
      count++;
    }
  }
  return count;
}

function generateCheats(cheatLength: number): number[][] {
  const cheats: number[][] = [];
  for(let i = -cheatLength; i <= cheatLength; i++) {
    for(let j = -cheatLength; j <= cheatLength; j++) {
      if(Math.abs(i) + Math.abs(j) <= cheatLength && (i !== 0 || j !== 0)) {
        cheats.push([i,j]);
      }
    }
  }
  return cheats;
}

processInstructions();