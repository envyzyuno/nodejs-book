const { Worker, isMainThread, parentPort,} = require('worker_threads');

/**
 * https://melius.tistory.com/58
 */

if (isMainThread) { // 부모일 때
  /** 기존에 동작하는 싱글스레드를 메인 스레도 또는 부모 스레드라고 부른다. */
  /** 현재 물리 js 파일에 대해서 worker 생성 
   * else { // 워커일때
   *  아래 부분문 워커쓰레드에서 실행
   */
  const worker = new Worker(__filename);
  
  /** 워커의 message 이벤트 바인드 */
  worker.on('message', message => console.log('from worker', message));

  /** 워커의 메세지를 한번만 받고 싶을경우 */
  //worker.once('message', message => console.log('from worker', message));

  /** 워커의 exit 이벤트 바인드 */
  worker.on('exit', () => {
    console.log('worker exit');
  });
  
  
  /** 워커에 ping 메세지 보냄.  */
  worker.postMessage('ping');

} else { // 워커일때
  
  /** 부모 포트  */ 
  parentPort.on('message', (value) => {
    console.log('from parent', value);

    /** 워커가 부모에게 메세지 pong1 메세지 전송 */
    parentPort.postMessage('pong1');

    /** 워커가 부모에게 메세지 pong2 메세지 전송 */
    parentPort.postMessage('pong2');

    /** 
     * 워커에서 on 을 사용하였기 때문에 워커에서 부모오
     * 워커가 부모와의 연결을 종료해야 한다.
     */
    parentPort.close();
  });


}


/**
 * TODO const util = require('util'); 로 구현해볼것.
 */