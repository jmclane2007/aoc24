import * as fs from 'fs';

// Max height of key or lock, minus 2 for the top and bottom rows
const HEIGHT = 5;

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\r\n\r\n");

  const keys = [];
  const locks = [];
  for(let i = 0; i < lines.length; i++) {
    if(lines[i].charAt(0) === ".") {
      keys.push(parseItem(lines[i], true));
    } else {
      locks.push(parseItem(lines[i], false));
    }
  }
  let total = 0;
  for(let i = 0; i < keys.length; i++) {
    for(let j = 0; j < locks.length; j++) {
      if(checkLock(keys[i], locks[j])) {
        total++;
      }
    }
  }
  console.log(total);
}

function parseItem(item: string, isKey: boolean): number[] {
  const lines = item.split("\r\n");
  const nums = [];
  for(let i = 0; i < lines[0].length; i++) {
    let height = 0;
    for(let j = 0; j < lines.length; j++) {
      if(isKey) {
        if(lines[j].charAt(i) === ".") {
          height++;
        } else {
          break;
        }
      } else {
        if(lines[j].charAt(i) === "#") {
          height++;
        } else {
          break;
        }
      }
    }
    if(isKey) {
      nums.push(lines.length - height - 1);
    } else {
      nums.push(height-1);
    }
  }
  return nums;
}

function checkLock(key: number[], lock: number[]) {
  for(let i = 0; i < key.length; i++) {
    if(key[i] + lock[i] > HEIGHT) {
      return false;
    }
  }
  return true;
}
processInstructions();