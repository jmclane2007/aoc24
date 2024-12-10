import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\r\n");
  const grid = []
  for(let i = 0; i < lines.length; i++) {
    const row = new Array();
    for(let j = 0; j < lines[i].length; j++) {
      row.push(Number.parseInt(lines[i].charAt(j)));
    }
    grid.push(row);
  }
  let total = 0;
  for(let i = 0; i < lines.length; i++) {
    for(let j = 0; j < lines[i].length; j++) {
      if(grid[i][j] === 0) {
        total += dfs(grid, i, j, 0, createVisited(grid));
      }
    }
  }
  console.log(total);
}

function dfs(grid: number[][], row: number, col: number, nextNum: number, visited: number[][]): number {
  if(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
    return 0;
  }
  if(grid[row][col] === nextNum) {
    if(nextNum === 9) {
      if(visited[row][col] === 0) {
        visited[row][col] = 1;
        return 1;
      }
      return 0;
    }
    return dfs(grid, row + 1, col, nextNum+1, visited) + 
      dfs(grid, row - 1, col, nextNum+1, visited) + 
      dfs(grid, row, col + 1, nextNum+1, visited) + 
      dfs(grid, row, col - 1, nextNum+1, visited);
  }
  return 0;
}

function createVisited(grid: number[][]) {
  return new Array(grid.length).fill([]).map(arr => new Array(grid[0].length).fill(0));
}

processInstructions();