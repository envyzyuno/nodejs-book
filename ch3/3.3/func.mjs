import { odd, even } from './var.js';

function checkOddOrEven(num) {
  if (num % 2) { // 홀수면
    return odd;
  }
  return even;
}


export default { checkOddOrEven };
//export default checkOddOrEven;
