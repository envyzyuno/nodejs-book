const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

/**
 * 현재 물리경로에 .env 파일을 읽어서 
 * process.env 로 만든다 ( 무슨 소리??? )
 */
dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

/**
 * app.user next() 내부적으로 호출함..
 */

/**
 * morgan : dev, combined, common, short, tiny
 * 오류 발생시 처리시간등을 로그로 출력한다.
 */
app.use(morgan('dev'));

/**
 * 정적인 파일들을 제공하는 라우터 역할
 */
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

const multer = require('multer');
const fs = require('fs');

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('ok');
});



app.get('/', 
  (req, res, next) => {
      console.log('next:', next );
      console.log('GET / 요청에서만 실행됩니다.');
      next();
  }, 
  (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
  }
);

/** 에러처리 app.use 
 * 람다의 매개변수가 4개 모두 존재해야한다. */
app.use(
  (err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);}
);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
