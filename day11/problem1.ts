import * as fs from 'fs';

interface List {
  val: number;
  // Just saving on toString calls
  stringVal: string;
  next: List | null;
}

function processInstructions() {
  const nums = fs.readFileSync("input.txt", "utf8").split(" ").map(num => Number.parseInt(num));
  // 0 => 1
  // even number OF DIGITS is replaced by 2 stones left half of digits go to left stone, right half to right stone
  // if no other rules, multiply value by 2024
  let head: List = {val: nums[0], stringVal: nums[0].toString(), next: null};
  let count = 1;
  let prev = head;
  for(let i = 1; i < nums.length; i++) {
    let curr: List = {val: nums[i], stringVal: nums[i].toString(), next: null};
    prev.next = curr;
    count++;
    prev = prev.next;
  }
  
  // This is going to be like 10,000 for part 2 huh
  for(let i = 0; i < 25; i++) {
    let curr: List | null = head;
    while(curr) {
      if(curr.val === 0) {
        curr.val = 1;
        curr.stringVal = "1";
      } else if(curr.stringVal.length % 2 === 0) {
        count++;
        const index = curr.stringVal.length / 2;
        const rightVal = Number.parseInt(curr.stringVal.substring(index));
        const temp: List = {val: rightVal, stringVal: rightVal + "", next: curr.next};
        curr.next = temp;
        const leftVal = Number.parseInt(curr.stringVal.substring(0,index));
        curr.val = leftVal;
        curr.stringVal = leftVal + "";
        curr = curr.next;
      } else {
        curr.val = curr.val * 2024;
        curr.stringVal = curr.val + "";
      }
      curr = curr.next;
    }
  }

  console.log(count);
}

processInstructions();