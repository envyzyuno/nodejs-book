const fs = require('fs');
const file_path = 'ch3/3.6/writeme.txt';


fs.writeFile( file_path , '글이 입력됩니다', (err) => {
  if (err) {
    throw err;
  }
  fs.readFile('./writeme.txt', (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data.toString());
  });
});
