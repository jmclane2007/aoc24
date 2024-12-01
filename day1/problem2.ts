import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput: string[] = input.split(/\s+/);
  const list1 = [];
  const map = new Map();
  for(let i = 0; i < splitInput.length; i+=2) {
    list1.push(Number.parseInt(splitInput[i]));
    const num = Number.parseInt(splitInput[i+1]);
    const temp = map.get(num);
    if(temp) {
      map.set(num, temp + 1);
    } else {
      map.set(num, 1);
    }
  }
  let sim = 0;
  for(let i = 0; i < list1.length; i++) {
    const temp = map.get(list1[i])
    if(temp) {
      sim += (list1[i] * temp)
    }
  }
  console.log(sim);
}

processInstructions();