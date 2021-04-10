const A = require('./globalA');


/**
 * 여기에서 정의된 global.message 가 globalA.js 에서도 접근가능하다.
 */
global.message = '안녕하세요';


console.log( 'message:', A() );
