import * as fs from 'fs';


function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\r\n");
  const designs = lines[0].split(", ");
  const countMap = new Map<string, number>();
  for(let i = 2; i < lines.length; i++) {
    isTowelPossible(lines[i], designs, countMap);
  }
  let total = 0;
  for(let i = 2; i < lines.length; i++) {
    total += countMap.get(lines[i])!;
  }
  console.log(total);
}

function isTowelPossible(str: string, designs: string[], countMap: Map<string, number>): number {
  if(countMap.has(str)) {
    return countMap.get(str)!;
  }
  if(!str) {
    return 1;
  }
  
  let possCount = 0;
  const starts = designs.filter(a => str.startsWith(a));
  for(const start of starts) {
    possCount += isTowelPossible(str.substring(start.length), designs, countMap);
  }
  countMap.set(str, possCount);
  return possCount;
}

processInstructions();
