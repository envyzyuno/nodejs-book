const fs = require('fs');


const file_path1 = 'ch3/3.6/readme4.txt';
const file_path2 = 'ch3/3.6/writeme3.txt';

const readStream = fs.createReadStream( file_path1 );
const writeStream = fs.createWriteStream( file_path2 );

/**
 * 스트림끼리 연결하다. '파이핑 하다'
 * readStream --> writeStream
 */
readStream.pipe( writeStream );
