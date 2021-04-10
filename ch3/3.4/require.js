console.log('require가 가장 위에 오지 않아도 됩니다.');

/* 모듈에 추가 */
module.exports = '저를 찾아보세요.';

/* 모듈에서 임포트  */
require('./var');

/* 모듈에서 주입된 CACHE 출력  */
console.log('require.cache입니다.');
console.log(require.cache);

console.log('require.main입니다.');
/* 현재 require 가 모듈인지 여부 */
console.log(require.main === module);
/* 현재 require 물리 경로  */
console.log(require.main.filename);
