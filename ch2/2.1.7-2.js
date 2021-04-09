const condition = true;

/**
 * resolve : 해결하다
 * reject : 불합격하다.
 */
const promise = new Promise( (resolve, reject) => {
  if( condition ){
    resolve('성공');
  }else{
    reject('실패');
  }
});


/* java Optional 처럼 사용가능하다. 하지만 마지막 응답값은 promise 이다. */
promise
  .then((message) => {
    message += '1';
    return new Promise((resolve, reject) => {
      resolve(message);
    });
  })
  .then((message2) => {
    message2 += '2';
    return new Promise((resolve, reject) => {
      resolve(message2);
    });
  })
  .then((message3) => {
    console.log(message3);
  })
  .catch((error) => {
    console.error('catch....', error );
  });


 // https://joshua1988.github.io/web-development/javascript/promise-for-beginners/

console.log('###########################');
console.log('promise 예제1');

const integer = 
  new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve(1);
    }, 2000);
  })
  .then( result => {
    console.log(result); // 1
    return result + 10;
  })
  .then( result => {
    console.log(result); // 11
    return result + 20;
  })
  .then(  result => {
    console.log(result); // 31
  });
console.log( `promise 예제1 결과: ${integer}` ); 





