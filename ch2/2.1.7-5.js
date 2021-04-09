const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
const promise3 = Promise.reject('실패3');

/**
 * Promise.all 
 *  Promise 들을 and 조건으로 엮는다.
 *  Promise.all(iterable);
 * 
 * 매우중요 https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
 */

Promise.all([promise1, promise2, promise3])
  .then((result) => {
    console.log(result); // ['성공1', '성공2'];
  })
  .catch((error) => {
    console.error(error);
  });
