const util = require('util');
const crypto = require('crypto');

const dontUseMe = util.deprecate((x, y) => {
  console.log(x + y);
}, 'dontUseMe 함수는 deprecated되었으니 더 이상 사용하지 마세요!');


dontUseMe(1, 2);

/**
 * 콜백 함수를 promise 로 변경
 */
const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
  .then((buf) => {
    console.log(buf.toString('base64'));
    return buf.toString('base64');
  })
  .catch((error) => {
    console.error(error);
  });

async function toAwait(){
  const aaaa =  await randomBytesPromise(64)
                        .then( buf => buf.toString('base64') );

  console.log( 'toAwait:', aaaa );

}  

toAwait();




  
