const buffer = Buffer.from('저를 버퍼로 바꿔보세요');

console.log('from():', buffer);
console.log('length:', buffer.length);
console.log('toString():', buffer.toString());

/** buffer array */
const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];

/** buffer array 를 concat 하여 new Buffer 로 생성 */
const buffer2 = Buffer.concat(array);
console.log('concat():', buffer2.toString());


/** 5 사이즈의 버퍼를 할당시키다.  */
const buffer3 = Buffer.alloc(5);
console.log('alloc():', buffer3);
