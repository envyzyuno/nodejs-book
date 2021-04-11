const fs = require('fs');

const file_path = 'ch3/3.6/readme2.txt';

/* 비동기로 파일들을 읽기 때문에 순서가 일관적이지 않다. */

console.log('시작');
fs.readFile( file_path, (err, data) => {
  if (err) {
    throw err;
  }
  console.log('1번', data.toString());
});
fs.readFile( file_path, (err, data) => {
  if (err) {
    throw err;
  }
  console.log('2번', data.toString());
});
fs.readFile( file_path, (err, data) => {
  if (err) {
    throw err;
  }
  console.log('3번', data.toString());
});
console.log('끝');
