/**
 * require('../3.3/var') 와 비슷한 방식.
 * module.exports = { odd, even }
 * 
 * exports 로 주입할경우는 
 * name 과 value 를 반드시 주입해야한다.
 * exports 에서는 객체만 주입할수 있다. 
 * exports 에서는 함수는 주입할수 없다.
 * 
 * module.exports 와 exports 는 참조 관계가 있으므로 
 * 한모듈에 동시에 사용하지 않는것이 좋다.
 * P 77
 */
exports.odd = '홀수입니다';
exports.even = '짝수입니다';
