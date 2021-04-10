const dep1 = require('./dep1');
console.log('1 require dep1', dep1);
module.exports = () => {
  console.log('4 dep1', dep1);
};
