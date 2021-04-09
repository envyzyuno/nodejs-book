var candyMachine = {
  status: {
    name: 'node',
    count: 5,
  },
  getCandy: function () {
    /* 여기서 this 가 global Object 로 잡힘.. */
    console.log( this );
    this.status.count--;

    return this.status.count;
  },
};
var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;


console.log( getCandy );
console.log( count );

try {
  getCandy();
} catch (error) {
  console.log( error );
}
