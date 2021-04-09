const candyMachine = {
  status: {
    name: 'node',
    count: 5,
  },
  getCandy() {
    /* 여기서 this 가 global Object 로 잡힘.. */
    this.status.count--;
    return this.status.count;
  },
};

/* JSON 의 구조분해 할당 */
const { getCandy, status, status: { count } } = candyMachine;

console.log( getCandy );
console.log( status );
console.log( count );
/* P.125  */
try {
  getCandy();
} catch (error) {
  console.log( error );
}


