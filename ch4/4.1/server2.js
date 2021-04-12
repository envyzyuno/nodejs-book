const http = require('http');
const fs = require('fs').promises;

/**
 * fs 를 통해서 파일을 읽는다..
 * 왠지.. 좀더 괜찮은 방법이 있을것 같은데...
 */
const html = 'ch4/4.1/server2.html';
/**
 * async , await 로 html 파일 읽기 에대해서 동기화 처리
 */
http.createServer( async (req, res ) => {
  try {
    const data = await fs.readFile( html );
    /** view 는 text/html */
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' } );
    res.end(data);
  } catch (err) {
    console.error(err);
    /** 에러 메세지는 text/plain */
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err.message);
  }
})
.listen(8081, () => {
  console.log('8081번 포트에서 서버 대기 중입니다!');
})
;