const fs = require('fs').promises;

const file_path = 'ch3/3.6/readme2.txt';

console.log('시작');
fs.readFile(file_path)
  .then((data) => {
    console.log('1번', data.toString());
    return fs.readFile(file_path);
  })
  .then((data) => {
    console.log('2번', data.toString());
    return fs.readFile(file_path);
  })
  .then((data) => {
    console.log('3번', data.toString());
    console.log('끝');
  })
  .catch((err) => {
    console.error(err);
  });

