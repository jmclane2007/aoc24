import * as fs from 'fs';

const sides = new Map();
const area = new Map();

function processInstructions() {
  const input = fs.readFileSync("test.txt", "utf8");
  const lines = input.split("\r\n");
  const grid = [];
  for(let i = 0; i < lines.length; i++) {
    const row = new Array();
    for(let j = 0; j < lines[i].length; j++) {
      row.push(lines[i].charAt(j));
    }
    grid.push(row);
  }

  let id = 0;
  for(let i = 0; i < lines.length; i++) {
    for(let j = 0; j < lines[i].length; j++) {
      if(grid[i][j] !== ".") {
        const visited = createVisited(grid);
        dfs(grid, visited, i, j, grid[i][j], id);
        sides.set(id, countSides(visited, id));
        dfsFill(grid, i, j, grid[i][j]);
        id++;
      }
    }
  }
  let total = 0;
  for(const key of area.keys()) {
    console.log(area.get(key), sides.get(key))
    total += (area.get(key) * sides.get(key));
  }

  console.log(total);
}

function dfs(grid: string[][], visited: boolean[][], row: number, col: number, char: string, id: number): void {
  if(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || visited[row][col] || grid[row][col] !== char) {
    return
  }
  visited[row][col] = true;
  area.set(id, (area.get(id) || 0) + 1);
  dfs(grid, visited, row + 1, col, char, id);
  dfs(grid, visited, row - 1, col, char, id);
  dfs(grid, visited, row, col + 1, char, id);
  dfs(grid, visited, row, col - 1, char, id);
}

function countSides(visited: boolean[][], id: number): number {
  // Check all visited spots that are in a corner, one pass for each direction
  let totalSides = 0;
  let top = false, bottom = false, left = false, right = false;
  for(let i = 0; i < visited.length; i++) {
    for(let j = 0; j < visited[0].length; j++) {
      if(visited[i][j]) {
        if(!top) {
          if(i === 0 || !visited[i-1][j]) {
            top = true;
            totalSides++;
          } else {
            top = false;
          }
        } else {
          if(i > 0 && visited[i-1][j]) {
            top = false;
          }
        }
        if(!bottom) {
          if(i === visited.length - 1 || !visited[i+1][j]) {
            bottom = true;
            totalSides++;
          } else {
            bottom = false;
          }
        } else {
          if(i < visited.length - 1 && visited[i+1][j]) {
            bottom = false;
          }
        }
      } else {
        top = false;
        bottom = false;
      }
    }
    top = false;
    bottom = false;
  }
  // for(let i = 0; i < visited[0].length; i++) {
  //   for(let j = 0; j < visited.length; j++) {
  //     if(visited[i][j]) {
  //       if(!left) {
  //         if(i === 0 || !visited[i][j-1]) {
  //           left = true;
  //           totalSides++;
  //         } else {
  //           left = false;
  //         }
  //       }
  //       if(!right) {
  //         if(i === visited[0].length - 1 || !visited[i][j+1]) {
  //           right = true;
  //           totalSides++;
  //         } else {
  //           right = false;
  //         }
  //       }
  //     }
  //   }
  // }
  return totalSides;
}

function dfsFill(grid: string[][], row: number, col: number, char: string): void {
  if(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
    return
  }
  if(grid[row][col] !== char) {
    return;
  }
  grid[row][col] = ".";
  dfsFill(grid, row + 1, col, char);
  dfsFill(grid, row - 1, col, char);
  dfsFill(grid, row, col + 1, char);
  dfsFill(grid, row, col - 1, char);
}

function createVisited(grid: number[][]) {
  return new Array(grid.length).fill([]).map(arr => new Array(grid[0].length).fill(false));
}

processInstructions();