const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

/**
 * 현재 물리경로에 .env 파일을 읽어서 
 * process.env 로 만든다 ( 무슨 소리??? )
 * java 의 .properties 파일과 비슷한 기능을 하는것으로 보인다.
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
app.use( (req, res, next) => {
  /**
   * spring.active.profile 처럼 사용하는 방식은 없을까?
   * 현재는 .env 파일을 읽어야한다.
   */
  if( process.env.NODE_ENV === 'production' ){
      morgan('combined')
  }else{
      morgan('dev');
  }
  next();
});

/**
 * 정적인 파일들을 제공하는 라우터 역할
 * public/styleshheets/style.css 
 * http://localhost:3000/styleshheets/style.css 로 접근가능하다.
 * spring boot 의 정적경로 지정과 같은 기능
 */
app.use('/', express.static(path.join(__dirname, 'public')));

/**
 * 요청의 본문에 있는 데이트를 해석해서 req.body 로 만들어준다.
 * formData, ajax json 의 요청을 처리한다.
 * req.body : { name: 'aa', book: 'aaa' } 형태로 받는다.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * req.cookie 형태로 파싱한다.
 * { name: 'aa', book: 'aaa' } 형태로 받는다.
 * app.use( cookieParser('비밀키') );
 * 유효기간이 지난 쿠키는 자동으로 걸러낸다.
 * 
 * 서명된쿠키 : 비밀번호가 존재하는 쿠키는 
 * req.signedCookie 를 통해서 조회한다.
 * 
 * 쿠키를 생성하기 위해서는 
 * res.cookie, res.clearCookie 를 사용한다 (java 와동일)
 * cookieParser 는 쿠키를 파싱할때만 사용된다.
 * p.179 다시 읽어볼것
 * 
 * process.env.COOKIE_SECRET == System.getProperty('');
 * 와 비슷해보인다.
 */

app.use(cookieParser(process.env.COOKIE_SECRET));

/**
 * express session
 * java 의 jsessionid 와 시스템 내부의 sessionRepository 관계인것 같다.
 */
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

/**
 * multipart request 처리를 위한 모듈
 */
const multer = require('multer');
const fs = require('fs');

/**
 * 다운로드 디렉토리 확인후
 * 없는경우 디렉토리 생성
 */
try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
/** 파입 업로드를 위한 공통 컴포넌트 정도로 생각하면 될것같다. */
const upload = multer({
  storage: multer.diskStorage({  /** 디스크 스토리지 에 파일 저장 */
    destination(req, file, done) { /** 파일저장할 경로  */
      done(null, 'uploads/');

      /** 에러인 경우
       *  done('업로드 디렉토리 생성 실패.', null);
       */
    },
    filename(req, file, done) {  /** 파일명  */
      /** 파일 확장자 */
      const ext = path.extname(file.originalname);
      /** 종료함수 수행 */
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    
      /** 에러일 경우 
       * done('파일업로드실패', null );
       * 에러처리 app.use 로 동작할것이다.
       */
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});


/** 업로드 페이지 호출 */
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});
/**
 * /upload POST 메서드로
 * request.getAttribute('image') 를 파일 객체화
 */
app.post('/upload', upload.single('image'), (req, res) => {
  /**
   * 여러건의 파일 업로드시에는 p.184 를 참고할것.
   *  같은 name 으로 업로드시
   *     upload.array('image');
   *     req.files;
   *  다른 name 으로 업로드시
   *     upload.fields([{ name:'image1'} ,{ name:'image2'} ]);
   *     req.files;
   *  multipart 전송이나 파일 없이 업로드시
   *     upload.none
   */
  console.log('##################################');
  console.log( req.file ); /** upload 성공시에 multer 가 req 에 세팅해준다.   */
  console.log( req.body ); /** app.use(express.json()); 를 통해서 파싱된 내용  */
  console.log('##################################');
  
  res.send('ok');
});


/**
 * chain of responbillity 구조를 가지고 있는것 같다.
 */
app.get('/', 
  (req, res, next) => {
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
