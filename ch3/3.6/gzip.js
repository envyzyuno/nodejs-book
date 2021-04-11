const zlib = require('zlib');
const fs = require('fs');


const file_path1 = 'ch3/3.6/readme4.txt';
const file_path2 = 'ch3/3.6/readme4.txt.gz';

const readStream = fs.createReadStream( file_path1 );
const zlibStream = zlib.createGzip();

const writeStream = fs.createWriteStream( file_path2 );

/**
 * readStream --> zlibStream --> writeStream
 * 으로 파이핑해서 gzip 파일을 생성한다.
 */
 
readStream.pipe( zlibStream ).pipe( writeStream );
