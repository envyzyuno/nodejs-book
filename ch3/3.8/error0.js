
/**
 * 1초마다 loop 를 실행했으나.
 * throw 되면서 종료된다.
 */

setInterval(() => {
  console.log('시작');
  throw new Error('서버를 고장내주마!');
}, 1000);
