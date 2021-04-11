const fs = require('fs');

const file_path = 'ch3/3.6/readme2.txt';

/**
 * 콜백함수를 연속으로 처리해서 수행 순서를 보장할수는 있다
 */
console.log('시작');
fs.readFile(file_path, (err, data) => {
  if (err) {
    throw err;
  }
  console.log('1번', data.toString());
  fs.readFile(file_path, (err, data) => {
    if (err) {
      throw err;
    }
    console.log('2번', data.toString());
    fs.readFile(file_path, (err, data) => {
      if (err) {
        throw err;
      }
      console.log('3번', data.toString());
      console.log('끝');
    });
  });
});
