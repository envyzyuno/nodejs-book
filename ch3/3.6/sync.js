const fs = require('fs');

const file_path = 'ch3/3.6/readme2.txt';

/**
 * NODE 의 동기 블로킹 방식으로 수행 순서 보장
 */
console.log('시작');
let data = fs.readFileSync(file_path);
console.log('1번', data.toString());
data = fs.readFileSync(file_path);
console.log('2번', data.toString());
data = fs.readFileSync(file_path);
console.log('3번', data.toString());
console.log('끝');
