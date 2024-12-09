import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  // let's see how large an array can be
  const blocks = [];
  let id = 0;
  for(let i = 0; i < input.length; i+=2) {
    const data = Number.parseInt(input.charAt(i));
    const free = Number.parseInt(input.charAt(i+1));
    for(let j = 0; j < data; j++) {
      blocks.push(id);
    }
    for(let j = 0; j < free; j++) {
      blocks.push(-1);
    }
    id++;
  }
  let checksum = 0;
  let left = 0, right = blocks.length - 1;
  while(left <= right) {
    if(blocks[left] === -1) {
      while(blocks[right] === -1) {
        right--;
      }
      checksum += (left * blocks[right]);
      right--;
    } else {
      checksum += (left * blocks[left]);
    }
    left++;
  }
  console.log(checksum);
}

processInstructions();