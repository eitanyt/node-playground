import { createReadStream } from 'fs';
import { createInterface } from 'readline';

async function checkBrackets(file) {
    const fileStream = createReadStream(file);
    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
  
    const stack = [];
    const brackets = { '(': ')', '{': '}', '[': ']' };
    let lineNumber = 0;
  
    for await (const line of rl) {
      lineNumber++;
      for (const char of line) {
        if (brackets[char]) {
          stack.push({ char, lineNumber });
        } else if (Object.values(brackets).includes(char)) {
          const last = stack.pop();
          if (!last || brackets[last.char] !== char) {
            console.log(`Error: Mismatched bracket '${char}' on line ${lineNumber}`);
            return;
          }
        }
      }
    }
  
    if (stack.length > 0) {
      console.log(`Error: Unmatched opening bracket '${stack[0].char}' on line ${stack[0].lineNumber}`);
    } else {
      console.log('Brackets are balanced.');
    }
  }
  
  checkBrackets(process.argv[2]);
  