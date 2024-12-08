import * as fs from 'fs';

const DIRECTIONS = [[-1,0],[0,1],[1,0],[0,-1]];

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\r\n");
  let total = 0;
  for(const line of lines) {
    const nums = line.split(/[\s:]+/).map((item) => Number.parseInt(item));
    if(isPossible(nums[0], nums[1], nums.slice(2))) {
      total += nums[0]
    }
  }

  console.log(total);
}

function isPossible(goal: number, sum: number, nums: number[]): boolean {
  if(nums.length === 1) {
    if(sum + nums[0] === goal || sum * nums[0] === goal || Number.parseInt(sum + "" + nums[0]) === goal) {
      return true;
    }
    return false;
  }
  if(sum > goal) {
    return false;
  }
  return isPossible(goal, sum * nums[0], nums.slice(1)) || isPossible(goal, sum + nums[0], nums.slice(1)) || isPossible(goal, Number.parseInt(sum + "" + nums[0]), nums.slice(1));
}
processInstructions();