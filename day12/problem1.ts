import * as fs from 'fs';

const perimeter = new Map();
const area = new Map();

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
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
        dfs(grid, createVisited(grid), i, j, grid[i][j], id);
        dfsFill(grid, i, j, grid[i][j]);
        id++;
      }
    }
  }
  let total = 0;
  for(const key of area.keys()) {
    total += (area.get(key) * perimeter.get(key));
  }

  console.log(total);
}

function dfs(grid: string[][], visited: boolean[][], row: number, col: number, char: string, id: number): void {
  if(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
    // add to perimeter when we get out of bounds
    perimeter.set(id, (perimeter.get(id) || 0) + 1);
    return
  }
  if(visited[row][col]) {
    return;
  }
  if(grid[row][col] !== char) {
    perimeter.set(id, (perimeter.get(id) || 0) + 1);
    return
  }
  visited[row][col] = true;
  area.set(id, (area.get(id) || 0) + 1);
  dfs(grid, visited, row + 1, col, char, id);
  dfs(grid, visited, row - 1, col, char, id);
  dfs(grid, visited, row, col + 1, char, id);
  dfs(grid, visited, row, col - 1, char, id);
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