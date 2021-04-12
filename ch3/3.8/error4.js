/**
 * web server 로 사용하면 process 의 이벤트 리스너가 
 * global 하게 동작할까? 아마도 현재 js 에서만 동작할것 같다.
 * 아니면 global.on('uncaughtException') 이런식으로 설정해야되는걸까?
 */
process.on('uncaughtException', (err) => {
  console.error('예기치 못한 에러', err);
});

setInterval(() => {
  throw new Error('서버를 고장내주마!');
}, 1000);

setTimeout(() => {
  console.log('실행됩니다');
}, 2000);
