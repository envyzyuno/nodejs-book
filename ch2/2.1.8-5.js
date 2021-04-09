

const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
(async () => {

  /**
   * for 와 await 를 함께쓰는것은 
   * 노드 10 버전 부터 지원하는 ES2018 문법이다.
   */
  for await (promise of [promise1, promise2]) {
    console.log(promise);
  }

})();


