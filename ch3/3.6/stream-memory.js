const fs = require('fs');

const file_path1 = 'ch3/3.6/big.txt';
const file_path2 = 'ch3/3.6/big3.txt';


console.log('before: ', Math.ceil( process.memoryUsage().rss / 1024 /1024 ) , ' MB' );

const readStream = fs.createReadStream( file_path1 );
const writeStream = fs.createWriteStream( file_path2 );


/**
 * readStream --> writeStream
 */
readStream.pipe( writeStream );

readStream.on('end', () => {
  console.log('stream: ', Math.ceil( process.memoryUsage().rss / 1024 /1024 ) , ' MB');
});




return;




/**
 * 아래부터 개인적인 테스트 코드들...
 * 
 * 아직 async await 쓰는것이 미흡하다..
 */


const util = require('util');
const createReadStreamPromise =  util.promisify( fs.createReadStream );
const createWriteStreamPromise = util.promisify( fs.createWriteStream );

async function syncTest(){

  console.log( 11111 );
  const readStream =  await createReadStreamPromise( file_path1 )
                            .then( s1 => s1 );
  const writeStream = await createWriteStreamPromise( file_path2 )
                            .then( s2 => s2 );
  console.log( 22222 );
/**
 *  해당 코드를 동기화 하는 방법을 아직 모르겠음.
  readStream.pipe( writeStream );

  readStream.on('end', () => {
    console.log('stream: ', Math.ceil( process.memoryUsage().rss / 1024 /1024 ) , ' MB');
  });

 */


}
syncTest();


