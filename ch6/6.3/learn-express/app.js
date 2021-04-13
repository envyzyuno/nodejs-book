const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
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

/**
 * spring controller 
 * @RequestMapping 처럼 
 * exports 된 라우터들을 url 과 매핑시킨다.
 * 
 * router 내부에도 인자 (req, res, next) 가
 * 정의되어 있을것이고. 후처리로 next(); 를 수행할것이다.
 */
app.use('/',      require('./routes') );
app.use('/user',  require('./routes/user'));

/**
 * app.use 가 정의된 순서대로 
 * url 이 매핑된다.
 * 요청 url 에 매핑되는 router 가 존재하지 않을시에
 * 404 not found
 * error 이 발생했을경우 500 으로 redirect 된다.
 */


app.use((req, res, next) => {

  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
