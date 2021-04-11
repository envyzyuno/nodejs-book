const fs = require('fs');

const file_path1 = 'ch3/3.6/big.txt';
const file_path2 = 'ch3/3.6/big2.txt';

/**
 * 파일을 buffer 에 모두 담아서 copy 하는 경우
 */
console.log('before: ', Math.ceil( process.memoryUsage().rss / 1024 /1024 ) , ' MB' );
const data1 = fs.readFileSync( file_path1 );

fs.writeFileSync( file_path2, data1 );
console.log('buffer: ', Math.ceil( process.memoryUsage().rss / 1024 /1024 ) , ' MB');
