import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split(/\s+/);
  const list1 = [];
  const list2 = [];
  for(let i = 0; i < splitInput.length; i+=2) {
    list1.push(Number.parseInt(splitInput[i]));
    list2.push(Number.parseInt(splitInput[i+1]));
  }
  list1.sort((a,b) => a-b);
  list2.sort((a,b) => a-b);
  let totalDistance = 0;
  for(let i = 0; i < list1.length; i++) {
    totalDistance += Math.abs(list1[i] - list2[i]);
  }
  console.log(totalDistance);
}

processInstructions();