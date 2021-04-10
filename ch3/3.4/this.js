
/**
 * module export 를 가리킨다.
 */
console.log(this);
console.log(this === module.exports);
console.log(this === exports);



function whatIsThis() {
  /**
   * global 을 가리킨다.
   */
  console.log( '함수내부 ===============' );
  console.log('function', this === exports, this === global);
  console.log( '함수내부 ===============' );

}
whatIsThis();
