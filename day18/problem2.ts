import * as fs from 'fs';

interface Point {
  row: number;
  col: number;
}

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\r\n");
  const NUM_ROWS = 71, NUM_COLS = 71;
  
  // I had a better solution where I only added one block each time, but screwed it up somehow and punted
  for(let j = 1024; j < lines.length; j++) {
    const grid = new Array(NUM_ROWS).fill([]).map(arr => new Array(NUM_COLS).fill(Number.MAX_SAFE_INTEGER));
    grid[0][0] = 0;
    // Only the first 1024 (byte) for part 1
    for(let i = 0; i < j; i++) {
      const split = lines[i].split(",").map(a => Number.parseInt(a));
      grid[split[0]][split[1]] = -1;
    }
    dijkstras(grid, 0, 0);
    if(grid[NUM_ROWS-1][NUM_COLS-1] === Number.MAX_SAFE_INTEGER) {
      console.log(lines[j-1]);
      break;
    }
    console.log(j);
  }
  
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

// import * as fs from 'fs';

// interface Point {
//   row: number;
//   col: number;
// }

// function processInstructions() {
//   const input = fs.readFileSync("input.txt", "utf8");
//   const lines = input.split("\r\n");
//   const NUM_ROWS = 71, NUM_COLS = 71;
//   const grid = new Array(NUM_ROWS).fill([]).map(arr => new Array(NUM_COLS).fill(true));
//   // iterate through each dropped byte and if we don't get a value back then return that byte
//   for(let i = 0; i < lines.length; i++) {
//     const split = lines[i].split(",").map(a => Number.parseInt(a));
//     grid[split[0]][split[1]] = false;
//     const distances = new Array(NUM_ROWS).fill([]).map(arr => new Array(NUM_COLS).fill(Number.MAX_SAFE_INTEGER));
//     dijkstras(grid, distances, 0, 0);
//     if(distances[70][70] === Number.MAX_SAFE_INTEGER) {
//       console.log(distances);
//       grid.forEach(row => console.log(row.map(a => a ? " " : "#").join("")));
//       console.log(lines[i]);
//       break;
//     }
//   }
// }

// function dijkstras(grid: boolean[][], distances: number[][], startRow: number, startCol: number) {
//   const stack: Point[] = [{row: startRow, col: startCol}];
//   let distance = Number.MAX_SAFE_INTEGER;
//   while(stack.length > 0) {
//     const currPoint = stack.pop();
//     const currRow = currPoint!.row;
//     const currCol = currPoint!.col;
//     distance = distances[currRow][currCol];
//     // For each adjacency
//     if(currRow + 1 < grid.length && grid[currRow + 1][currCol] && distances[currRow + 1][currCol] > distance + 1) {
//       distances[currRow + 1][currCol] = distance + 1;
//       stack.push({row: currRow + 1, col: currCol})
//     }
//     if(currRow - 1 >= 0 && grid[currRow - 1][currCol] && distances[currRow - 1][currCol] > distance + 1) {
//       distances[currRow - 1][currCol] = distance + 1;
//       stack.push({row: currRow - 1, col: currCol})
//     }
//     if(currCol + 1 < grid[0].length && grid[currRow][currCol + 1] && distances[currRow][currCol + 1] > distance + 1) {
//       distances[currRow][currCol + 1] = distance + 1;
//       stack.push({row: currRow, col: currCol + 1})
//     }
//     if(currCol - 1 >= 0 && grid[currRow][currCol - 1] && distances[currRow][currCol - 1] > distance + 1) {
//       distances[currRow][currCol - 1] = distance + 1;
//       stack.push({row: currRow, col: currCol - 1})
//     }
//   }

//   return distance;
// }

// processInstructions();