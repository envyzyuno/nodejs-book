const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000 );

/** JAVA 의 필터와 같은 기능을 수행한다. */
app.use( (req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');
  next();
});

app.get('/', (req, res, next) => {
  // res.send('Hello, Express');
  res.sendFile(path.join(__dirname, '/index.html'));
});



app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
