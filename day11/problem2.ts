import * as fs from 'fs';

function processInstructions() {
  const nums = fs.readFileSync("input.txt", "utf8").split(" ").map(num => Number.parseInt(num));
  // 0 => 1
  // even number OF DIGITS is replaced by 2 stones left half of digits go to left stone, right half to right stone
  // if no other rules, multiply value by 2024
  let totalMap = new Map();
  for(let i = 0; i < nums.length; i++) {
    totalMap.set(nums[i], 1);
  }

  // This really wasn't hard, but boy was my first problem assumption bad
  for(let i = 0; i < 75; i++) {
    const newMap = new Map();
    for(const key of totalMap.keys()) {
      if(key === 0) {
        newMap.set(1, (newMap.get(1) || 0) + totalMap.get(key));
      } else if(key.toString().length % 2 === 0) {
        const str = key.toString();
        const index = str.length / 2;
        const leftVal = Number.parseInt(str.substring(0,index));
        newMap.set(leftVal, (newMap.get(leftVal) || 0) + totalMap.get(key))
        const rightVal = Number.parseInt(str.substring(index));
        newMap.set(rightVal, (newMap.get(rightVal) || 0) + totalMap.get(key));
      } else {
        const newVal = key * 2024;
        newMap.set(newVal, (newMap.get(newVal) || 0) + totalMap.get(key));
      }
    }
    totalMap = newMap;
  }

  let count = 0;
  for(const key of totalMap.keys()) {
    count += totalMap.get(key);
  }
  console.log(count);
}

processInstructions();