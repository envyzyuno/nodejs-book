
/* 바로 실행 */
setImmediate(() => {
  console.log('4. immediate');
});

/* 이벤트 루트가 다른 콜백 함수보다 우선 처리하게 한다. */
process.nextTick(() => {
  console.log('1. nextTick');
});

setTimeout(() => {
  console.log('3. timeout');
}, 0);


Promise.resolve().then(() => console.log('2. promise'));
