const dep1 = require('./dep1');
const dep2 = require('./dep2');

/**
 * 순환참조가 발생한다.
 */
dep1();
dep2();
