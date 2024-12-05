import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput = input.split("\r\n\r\n");
  const orderInput = splitInput[0].split("\r\n");
  const orderMap = new Map<string,Set<string>>();
  for(const line of orderInput) {
    const nums = line.split("|");
    const set = orderMap.get(nums[0]);
    if(set) {
      set.add(nums[1]);
    } else {
      orderMap.set(nums[0], new Set([nums[1]]));
    }
  }
  const updates = splitInput[1].split("\r\n");
  let total = 0;
  for(const update of updates) {
    const line = update.split(",");
    const copy = update.split(",");
    line.sort((a,b) => {
      const temp = orderMap.get(a);
      if(temp) {
        if(temp.has(b)) {
          return -1;
        }
      }
      const temp2 = orderMap.get(b);
      if(temp2) {
        if(temp2.has(a)) {
          return 1;
        }
      }
      return 0;
    });
    console.log(line);
    let isValid = true;
    for(let i = 0; i < line.length; i++) {
      if(line[i] !== copy[i]) {
        isValid = false;
      }
    }
    if(isValid) {
      total += Number.parseInt(line[Math.floor(line.length / 2)])
    }
  }
  console.log(total);
}
  
//   const updates = splitInput[1].split("\r\n");
//   let total = 0;
//   for(const update of updates) {
//     const line = update.split(",");
//     if(isValidUpdate(orderMap, line)) {
//       total += Number.parseInt(line[Math.floor(line.length / 2)])
//     }
//   }
//   console.log(total);
// }

// function isValidUpdate(map: Map<string, Set<string>>, line: string[]): boolean {
//   for(let i = 1; i < line.length; i++) {
//     const temp = map.get(line[i])
//     if(temp) {
//       for(let j = i - 1; j > -1; j--) {
//         if(temp.has(line[j])) {
//           return false;
//         }
//       }
//     }
//   }
//   return true;
// }

processInstructions();