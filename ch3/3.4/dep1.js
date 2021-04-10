const dep2 = require('./dep2');
console.log('2 require dep2', dep2);
module.exports = () => {
  console.log('3 dep2', dep2);
};
