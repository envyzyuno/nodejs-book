const crypto  = require('crypto');

/**
 * 암호화를 위한 salt 생성
 * @returns 
 */
function createSalt(){
  return new Promise( (resolve, reject) => {
    try {
      crypto.randomBytes(64, (err, buf) => {
        const salt = buf.toString('base64');
        resolve( salt );
      });
    } catch (error) {
      /* await 로 사용한다면 과연 catch 가 의미가 있을까???
         없을것 같다.. 
         then().catch() 라도 의미가 없다.. 
       */
      reject( new Error('salt 생성중 에러') );
    }
  });
}

/**
 * 비밀번호 생성
 * @param {}} salt 
 * @param {*} plain 
 * @returns 
 */
function getPassword( salt, plain ){
  return new Promise( (resolve, reject) => {
    try {
      crypto.pbkdf2( plain, salt, 100000, 64, 'sha512', (err, key) => {
        //console.log('password:', key.toString('base64'));
        resolve( key.toString('base64') );
      });
    } catch (error) {
      reject( new Error('비밀번호 생성중 오류') );
    }
  });

}

async function logPassword(){
  const plain = '비밀번호';
  console.log('Start logging...');

  console.log('plain:', plain);

  const salt = await createSalt();
  console.log('salt:', salt );

  const encPassword = await getPassword( salt, plain );
  console.log('encPassword:', encPassword );

}

logPassword();