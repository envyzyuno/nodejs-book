const fs = require('fs');

const file_path = 'ch3/3.6/writeme2.txt';

const writeStream = fs.createWriteStream( file_path );
writeStream.on('finish', () => {
  console.log('파일 쓰기 완료');
});

/**
 * WriteStream 에서도 close 가 존재하지 않는다.
 * 내부적으로 stream 을 close 시켜주는것이 존재할것이다.
 */


writeStream.write('이 글을 씁니다.\n');
writeStream.write('한 번 더 씁니다.');
writeStream.end();
