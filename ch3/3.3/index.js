
/*  func.js 에서 export 를 하나만 했기때문.   */
const { checkOddOrEven } = require('./func');

const { odd, even } = require('./var');

function checkStringOddOrEven(str) {
  if (str.length % 2) { // 홀수면
    return odd;
  }
  return even;
}

console.log(checkOddOrEven(10));
console.log(checkStringOddOrEven('hello'));
