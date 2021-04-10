const { Worker, isMainThread, parentPort, workerData, } = require('worker_threads');

if (isMainThread) { // 부모일 때
  const threads = new Set();
  threads.add(new Worker(__filename, 
    { workerData: { start: 1 }, } /** workerData 형태로 인수 세팅  */
    ));

  threads.add(new Worker(__filename, 
    { workerData: { start: 2 }, } /** workerData 형태로 인수 세팅  */
    ));

    /** threads set 에 두개의 worker 를 주입  */
  
  for (let worker of threads) {
    /** worker message 이벤트 바인드 */
    worker.on('message', message => console.log('from worker', message));
    /** worker exit 이벤트 바인드 */
    worker.on('exit', () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.log('job done');
      }      
    });

  }
} else { // 워커일 때
  const data = workerData;
  parentPort.postMessage( data.start + 100 );
  
  /** 워커가 부모와의 연결을 종료하는 부분이 존재하지 않는다..  
   *  worker 라는건 
   *  java Runable 과 같이 한번만 동작하는것인가?
   *  java Thread while(true) 가 존재 하지 않으면 한번만 동작하고
   *  종료 되는것인가?
   * 
   *  아니다... worker_threads.js 에서 parentPort.close(); 를 지우면
   *  프로그램이 종료되지 않는다..
   * 
   *  worker_threads.js 에서는 워커에서 .on 으로 바인드를 했기 때문에
   *  워커에서 부모로 close 해야한다.
   */
  
}
