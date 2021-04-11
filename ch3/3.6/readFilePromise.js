
//const fs = require('fs/promises');
const fs = require('fs').promises;
const file_path = 'ch3/3.6/readme.txt';


fs.readFile( file_path )
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    console.error(err);
  });
