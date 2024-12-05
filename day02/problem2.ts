import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split("\r\n");
  let safeReports = 0;
  for(const line of splitInput) {
    const temp = line.split(" ");
    const arr = [];
    for(const num of temp) {
      arr.push(Number.parseInt(num));
    }
    let safe = false;
    for(let i = 0; i < arr.length && !safe; i++) {
      safe = isSafe(arr.slice(0,i).concat(arr.slice(i+1)));
    }
    if(safe) {
      safeReports++;
    }
  }
  console.log(safeReports);
}

function isSafe(arr: number[]): boolean {
  let lower = 1, higher = 3;
  if(arr[0] < arr[1]) {
    lower = -3, higher = -1;
  }
  for(let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i] - arr[i + 1];
    if(diff < lower || diff > higher) {
      return false;
    }
  }
  return true;
}

processInstructions();