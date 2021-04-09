var relationship1 = {
  name: 'zero',
  friends: ['nero', 'hero', 'xero'],
  logFriends: function () {
    var that = this; // relationship1을 가리키는 this를 that에 저장
    console.log( that ); // 이클립스에서는 이것이 동작되지 않음..
    this.friends.forEach(function (friend) {
      console.log(that.name, friend);
    });
  },
};
console.log('relationship1=================');
relationship1.logFriends();

const relationship2 = {
  name: 'zero',
  friends: ['nero', 'hero', 'xero'],
  logFriends() {
    this.friends.forEach(friend => {
      console.log(this.name, friend);
    });
  },
};
console.log('relationship2=================');
relationship2.logFriends();


const logging_func = function( friend ){
  console.log( friend );
};
const relationship3 = {
  name: 'zero',
  friends: ['nero', 'hero', 'xero'],
  logFriends(){
    console.log(this);
    console.log(`${this.name}'s Firends..`);
    this.friends.forEach( logging_func );
  },
};
console.log('relationship3=================');

relationship3.logFriends();
