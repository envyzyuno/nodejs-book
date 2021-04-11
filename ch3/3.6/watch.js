const fs = require('fs');

const target_file = 'ch3/3.6/target.txt';

fs.watch( target_file , (eventType, filename) => {
  console.log(eventType, filename);
});





