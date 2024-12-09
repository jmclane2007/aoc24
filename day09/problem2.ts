import * as fs from 'fs';

function processInstructions() {
  const input = fs.readFileSync("test.txt", "utf8");
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
  let left = 0, right = blocks.length - 1;
  while(left <= right) {
    if(blocks[left] === -1) {
      let freeSize = 0;
      for(let i = left; blocks[i] === -1; i++) {
        freeSize++;
      }
      let foundFill = false;
      // found free size, now find a matching number on the right
      while(!foundFill) {
        if(blocks[right] === -1) {
          right--;
        } else {
          // found an id, get the size
          const currId: number = blocks[right];
          let rightSize = 0;
          while(blocks[right] === currId) {
            rightSize++;
            right--;
          }
          
          if(rightSize <= freeSize) {
            foundFill = true;
            for(let i = left; i < left + rightSize; i++) {
              blocks[i] = currId;
            }
            for(let i = right + 1; i < right + rightSize + 1; i++) {
              blocks[i] = -1;
            }
            left += rightSize;
          }
        }
      }
      console.log(blocks, left, right);
    } else {
      left++;
    }
  }
  let checksum = 0;
  console.log(blocks);
  for(let i = 0; i < blocks.length; i++) {
    if(blocks[i] !== -1) {
      checksum += (blocks[i] * i);
    }
  }
  console.log(checksum);
}

processInstructions();