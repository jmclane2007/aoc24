import * as fs from 'fs';

interface Point {
  row: number;
  col: number;
}

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\r\n");
  const NUM_ROWS = 71, NUM_COLS = 71;
  const grid = new Array(NUM_ROWS).fill([]).map(arr => new Array(NUM_COLS).fill(Number.MAX_SAFE_INTEGER));
  grid[0][0] = 0;
  // Only the first 1024 (byte) for part 1
  for(let i = 0; i < 1024; i++) {
    const split = lines[i].split(",").map(a => Number.parseInt(a));
    grid[split[0]][split[1]] = -1;
  }
  dijkstras(grid, 0, 0);
  console.log(grid[70][70]);
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

processInstructions();