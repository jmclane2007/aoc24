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
    let lower = 1, higher = 3;
    if(arr[0] < arr[1]) {
      lower = -3, higher = -1;
    }
    let safe = true;
    for(let i = 0; i < arr.length - 1; i++) {
      const diff = arr[i] - arr[i + 1];
      if(diff < lower || diff > higher) {
        safe = false;
        break;
      }
    }
    if(safe) {
      safeReports++;
    }
  }
  console.log(safeReports);
}

processInstructions();