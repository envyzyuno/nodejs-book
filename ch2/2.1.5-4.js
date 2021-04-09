const array = ['nodejs', {}, 10, true];

/* 배열의 구조 분해 할당 */
const [ node, obj, , bool ] = array;


console.log(`node = ${node}`);
console.log('obj = ', obj );
console.log(`bool = ${bool}`);

