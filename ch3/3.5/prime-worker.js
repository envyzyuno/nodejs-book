const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const min = 2;
let primes = [];

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

if (isMainThread) {
  const max = 10000000;
  const threadCount = 8; /** 스레드 의 수량  */
  const threads = new Set(); /** 스레드 set  */

  /** 올림 함수 사용해서 range 한쓰레드당 처리해야할 range */
  const range = Math.ceil( (max - min) / threadCount );
 
  let start = min; /** 가변 인수기 때문에 let 선언  */

  console.time('prime');
  
  /** 8개의 스레드 추가 */
  for (let i = 0; i < threadCount - 1; i++) {
    const wStart = start;
    threads.add(new Worker(__filename, { workerData: { start: wStart, range } }));
    start += range; /** 다음 스레드 시작 점 변경  */
  }

  /* 
  console.log( 'last_start:', start );
  console.log( 'last_range:', range + ((max - min + 1) % threadCount) );
 */

  /** 마지막 스레드 추가 */
  threads.add(new Worker(__filename, { workerData: { start, range: range + ((max - min + 1) % threadCount) } }));
  
  for (let worker of threads) {

    /**
     * worker 에러 발생시 throw
     */
    worker.on('error', (err) => {
      throw err;
    });

    /**
     * worker exit 될 경우 
     * 메인 스레드에 threads 에 해당 worker 삭제 (아마도 reference 관련되어서 점유되어있으면 애플리케이션이 종료되지 않을듯하다.)
     * 모드 워커 스레드 종료시에 로깅
     */
    worker.on('exit', () => {
      threads.delete( worker );
      if (threads.size === 0) {
        console.timeEnd('prime');
        console.log( '소수의 개수:', primes.length);
      }
    });

    /** 
     *  worker (자식 스레드) 에서 온 primes 들을 
     *  메인 스레드의 primes 와 concat 한다.
     */
    worker.on('message', (msg) => {
      primes = primes.concat(msg);
    });
  }
} else {

  /**
   * 각 워커 순으로 처리
   * java 로 생각하면 worker 가 Thread 가 된다.
   */
  const start = workerData.start;
  const range = workerData.range;
  
  /** 멀티 스레드 이기 때문에 
   * findPrimes 함수와  primes 는 worker 별로 
   * 다른 instance 라고 생각해야한다.
   */
  findPrimes( start, range );

  /** 부모 스레드에 현재 work 에서 연산한 primes 를 전송한다. */
  parentPort.postMessage( primes );

  /**
   * 하나의 부모(메인) 스레드와 
   * 여러건의 worker ( 서브 스레드 ) 존재하며
   * worker 들이 연산한 이후에 결과값을 부모 스레드에 전송 
   * 부모 스레드에서 해당 결과값들을 join 한다.
   * java 의 fork and join 을 생각하면 될듯하다.
   */

}
