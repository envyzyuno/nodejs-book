/**
 * require : 필요로 하다.
 * 상대 경로로  var.js 의 odd, even 을 주입한다.
 */
const { odd, even } = require('./var'); 

function checkOddOrEven(num) {
  if (num % 2) { // 홀수면
    return odd;
  }
  return even;
}

/* checkOddOrEven 함수를 모듈화 한다.  */
module.exports = {
  checkOddOrEven,
};
