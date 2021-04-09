/**
 * java 의 syncronized 와 비슷한 기능 
 * async 를 함수 앞에 붙이고
 * 동기화가 필요한 부분에 await 를 추가한다.
 * https://joshua1988.github.io/web-development/javascript/js-async-await/
 */
async function findAndSaveUser(Users) {
  let user = await Users.findOne({}); /*  가변인수 이기때문에 let 로 선언  */
  user.name = 'zero';
  user = await user.save();
  user = await Users.findOne({ gender: 'm' });
  // 생략
}


/**
 * await 대상 함수는 응답값이 항상  Promise 이여야 한다.
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* 사용자 정보를 5초 이후에 응답  */
async function fetchUser( condition ){
  await sleep( 5000 );
  const user = 'user_01';
  return new Promise( ( resolve, reject ) => {
      if( condition ){
        resolve( user );
      }
      reject( new Error('사용자 조회중 오류') );
  });
}

/* 부서 정보를 5초 이후에 응답 */
async function fetchDept( condition ){
  await sleep( 5000 );
  const dept = 'dept_01';
  return new Promise( ( resolve, reject ) => {
    if( condition ){
      resolve( dept );
    }
    reject( new Error('부서 조회중 오류') );
  });
}

async function logUserAndDept(){
  try {
    const user = await fetchUser( true );
    console.log( '사용자 정보1:', user );

    const dept = await fetchDept( false );
    console.log( '부서 정보1:', dept );
    
  } catch (error) {
    console.error( error ) ;
  } finally{
    console.log( 'logUserAndDept1 END...' );
    console.log( '################################' );

  }
} 
logUserAndDept();

const logUserAndDept2 = async( ) => {
  try {

    const user = await fetchUser( true );
    console.log( '사용자 정보2:', user );
  
    const dept = await fetchDept( true );
    console.log( '부서 정보2:', dept );

  } catch (error) {
    console.error( error ) ;
  } finally {
    console.log( 'logUserAndDept2 END...' );
    console.log( '################################' );
  } 

};


logUserAndDept2();







