const fs = require('fs').promises;


setInterval(() => {
  
  /**
   * promise 의 에러는 catch 하지 않아도 알아서 처리된다.
   */
  fs.unlink('./abcdefg.js');

}, 1000);
