const fs = require('fs');


//const file_path = './readme.txt';
const file_path = 'ch3/3.6/readme.txt';

/**  */
fs.readFile( file_path, (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
  console.log(data.toString());
});


/** readFilePromise.js 에서 다 낫은 방식을 보여준다.
 * 
 * 

const util = require('util');
const readFilePromise = util.promisify( fs.readFile );

readFilePromise( file_path )
  .then( ( data ) => {

    console.log( data.toString() );
  })
;

 */

