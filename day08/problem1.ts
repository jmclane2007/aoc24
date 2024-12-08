import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\r\n");
  const map = new Map<string, number[][]>();
  // organize the points so we make this easier
  const grid = []
  for(let i = 0; i < lines.length; i++) {
    const row = new Array();
    for(let j = 0; j < lines[0].length; j++) {
      const char = lines[i].charAt(j);
      row.push(".");
      if(char !== ".") {
        const temp = map.get(char);
        if(!temp) {
          map.set(char, [[i,j]]);
        } else {
          temp.push([i,j]);
        }
      }
    }
    grid.push(row);
  }

  let antinodes = 0;
  for(const key of map.keys()) {
    const points = map.get(key) || [];
    for(let i = 0; i < points!.length; i++) {
      for(let j = i+1; j < points!.length; j++) {
        const rowDiff = points[i][0] - points[j][0];
        const colDiff = points[i][1] - points[j][1];
        const firstRow = points[i][0] + rowDiff;
        const firstCol = points[i][1] + colDiff;
        if(firstRow > -1 && firstCol > -1 && firstCol < lines[0].length) {
          if(grid[firstRow][firstCol] === ".") {
            antinodes++;
            grid[firstRow][firstCol] = "#"
          }
        }
        const secondRow = points[i][0] + (-2*rowDiff);
        const secondCol = points[i][1] + (-2*colDiff);
        if(secondRow < lines.length && secondCol > -1 && secondCol < lines[0].length) {
          if(grid[secondRow][secondCol] === ".") {
            antinodes++;
            grid[secondRow][secondCol] = "#"
          }
        }
      }
    }
  }
  console.log(antinodes);
}

processInstructions();