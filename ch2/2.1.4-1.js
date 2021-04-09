function add1(x, y) {
  return x + y;
}

const add2 = (x, y) => { return x + y; }
const add3 = (x, y) => x + y;
const add4 = (x, y) => (x + y);

function not1(x) {
  return !x;
}

const not2 = x => !x;

console.log( 'add1=', add1( 1, 2 ) );
console.log( 'add2=', add2( 1, 2 ) );
console.log( 'add3=', add3( 1, 2 ) );
console.log( 'add4=', add4( 1, 2 ) );

console.log( 'not1=', not1( false ) );
console.log( 'not2=', not2( false ) );