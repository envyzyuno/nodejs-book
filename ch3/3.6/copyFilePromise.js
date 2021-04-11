const fs = require('fs').promises;

const original_file = 'ch3/3.6/readme4.txt';
const copy_file = 'ch3/3.6/writeme4.txt';

fs.copyFile( original_file, copy_file )
  .then( () => console.log('복사완료') )
  .catch( error => console.log(error) );
