const fs = require('fs');

const original_file = 'ch3/3.6/readme4.txt';
const copy_file = 'ch3/3.6/writeme4.txt';

fs.copyFile( original_file, copy_file, (error) => {
  if (error) {
    return console.error(error);
  }
  console.log('복사 완료');
});
