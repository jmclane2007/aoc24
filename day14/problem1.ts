import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const NUM_ROWS = 103, NUM_COLS = 101;
  // const input = fs.readFileSync("test.txt", "utf8");
  // const NUM_ROWS = 7, NUM_COLS = 11;
  const lines = input.split("\r\n");
  const grid = new Array(NUM_ROWS).fill([]).map(arr => new Array(NUM_COLS).fill(0));
  let quad1 = 0, quad2 = 0, quad3 = 0, quad4 = 0;
  for(let i = 0; i < lines.length; i++) {
    const vals = lines[i].substring(2).split(/[,v =]+/).map(v => Number.parseInt(v));
    const newRow = (((vals[1] + (100 * vals[3])) % NUM_ROWS) + NUM_ROWS) % NUM_ROWS;
    const newCol = (((vals[0] + (100 * vals[2])) % NUM_COLS) + NUM_COLS) % NUM_COLS;
    if(newRow < 51) {
      if(newCol < 50) {
        quad1++;
      } else if(newCol > 50) {
        quad2++;
      }
    } else if(newRow > 51) {
      if(newCol < 50) {
        quad3++;
      } else if(newCol > 50) {
        quad4++;
      }
    }
    grid[newRow][newCol]++;
  }
  for(let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(" "))
  }
  console.log(quad1 , quad2 , quad3 , quad4)
  console.log(quad1 * quad2 * quad3 * quad4)
}

processInstructions();