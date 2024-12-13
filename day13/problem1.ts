import * as fs from 'fs';

interface Point {
  x: number;
  y: number;
}

function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\r\n");
  // Dynamic programming, basically coin counting

  let total = 0;
  for(let i = 0; i < lines.length; i += 4) {
    total += countTokens(lines, i);
  }
  console.log(total);
}

function countTokens(lines: string[], i: number): number {
  // For some reason everything is 2 digits so we know the number placement
  const a: Point = {x: Number.parseInt(lines[i].substring(12,14)), y: Number.parseInt(lines[i].substring(18,20))}
  const b: Point = {x: Number.parseInt(lines[i+1].substring(12,14)), y: Number.parseInt(lines[i+1].substring(18,20))}

  const prizeLine = lines[i+2].substring(9).split(", Y=");
  const target: Point = {x: Number.parseInt(prizeLine[0]), y: Number.parseInt(prizeLine[1])};
  const map = new Map();

  function recurse(curr: Point, aPresses: number, bPresses: number): Point {
    if(curr.x > target.x || curr.y > target.y || aPresses > 100 || bPresses > 100) {
      return {x: 200, y: 200};
    }
    if(target.x === curr.x && target.y === curr.y) {
      return {x: aPresses, y: bPresses};
    }
    const key = curr.x + " " + curr.y;
    const temp = map.get(key);
    if(temp && temp <= aPresses + bPresses) {
      return {x: 200, y: 200};
    } else {
      map.set(key, aPresses + bPresses);
    }
    const aPress = recurse({x: curr.x + a.x, y: curr.y + a.y}, aPresses + 1, bPresses);
    const bPress = recurse({x: curr.x + b.x, y: curr.y + b.y}, aPresses, bPresses + 1);
    if(aPress.x + aPress.y < bPress.x + bPress.y) {
      return aPress;
    }
    return bPress;
  }
  const result = recurse({x: 0, y: 0}, 0, 0);

  if(result.x >= 200) {
    return 0;
  }
  return (result.x * 3) + result.y
}


processInstructions();