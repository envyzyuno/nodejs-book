const fs = require('fs');

const file_path = 'ch3/3.6/readme3.txt';

/**
 * JAVA 와 다른점: close 가 없다.
 */
const readStream = fs.createReadStream( file_path , { highWaterMark: 16 });


const data = [];

readStream.on('data', (chunk) => {
  data.push(chunk);
  console.log('data :', chunk, chunk.length);
});

readStream.on('end', () => {
  console.log('end :', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
  console.log('error :', err);
});
