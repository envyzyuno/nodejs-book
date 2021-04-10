
/**
 * worker thread 를 사용하지 않은 소수 추출
 */
const min = 2;
const max = 10000000;
const primes = [];

function findPrimes(start, range) {
  let isPrime = true;
  const end = start + range;
  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
    isPrime = true;
  }
}

console.time('prime');
/** 소수 찾기  */
findPrimes( min, max );
console.timeEnd('prime');
console.log('소수의 개수',primes.length);
