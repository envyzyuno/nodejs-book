const fs = require('fs');

setInterval(() => {
  /** 존재하지 않는 파일을 삭제하려고한다. */
  fs.unlink('./abcdefg.js', (err) => {
    if (err) {
      /** 스레드가 종료되지 않고 err 이 != null 로 세팅된다. */
      console.error(err);
    }
  });
}, 1000);
