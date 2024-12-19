import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\r\n");
  const designs = lines[0].split(", ");
  const isPossSet = new Set<string>();
  const notPossSet = new Set<string>();
  for(let i = 0; i < designs.length; i++) {
    isPossSet.add(designs[i]);
  }
  let count = 0;
  for(let i = 2; i < lines.length; i++) {
    if(isTowelPossible(lines[i], isPossSet, notPossSet)) {
      count++;
    }
  }
  console.log(count);
}

function isTowelPossible(str: string, isPossSet: Set<string>, notPossSet: Set<string>): boolean {
    if(!str || isPossSet.has(str)) {
      return true;
    }
    if(notPossSet.has(str)) {
      return false;
    }
    let isPoss = false;
    for(let i = 1; i <= str.length && !isPoss; i++) {
      if(isPossSet.has(str.substring(0, i))) {
        const temp = isTowelPossible(str.substring(i), isPossSet, notPossSet);
        if(temp) {
          isPossSet.add(str.substring(i));
        }
        isPoss = isPoss || temp;
      }
    }
    if(!isPoss) {
      notPossSet.add(str);
    }
    return isPoss;
}

processInstructions();