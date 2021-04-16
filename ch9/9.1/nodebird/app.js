const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

const { sequelize } = require('./models');
const passportConfig = require('./passport');

/** evn 설정 */
dotenv.config();

const app = express();
/** passport 설정 */
passportConfig(); 
app.set('port', process.env.PORT || 8001 );
app.set('view engine', 'html');
/** nunjucks 템플릿 엔진 /views/ 경로의 html 을 타켓팅 */
nunjucks.configure('views', {
    express: app,
    secure: false,
});


sequelize.sync({ force: false} )
    .then( () => {
        console.log('데이터베이스 연결 성공');
    })
    .catch( (err) => {
        console.error(err);
    } );

app.use(morgan('dev'));
app.use(express.static( path.join(__dirname, 'public') ));
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
    }
}));

/**
 * req 에 passport 설정을 심는다.
 * 이 시점에서 req 에 isAuthenticated 메서드를 추가하여
 * 현재 요청의 인증여부를 판단할수있게한다.
 */
app.use(passport.initialize());
/**
 * req.session 에 passport 정보를 저장
 */
app.use(passport.session());


/** 서버스별 url 라우터 추가 */
app.use('/', require('./routes/page') );


/** 404 처리 */
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

/** 모든 에러 처리 */
app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    const _error = process.env.NODE_ENV != 'production' ? err : {};
    res.locals.error = _error;

    res.status(err.status || 500 );
    res.render('error');
});

app.listen( app.get('port'), ()=>{
    console.log( app.get('port'), '번 포트에서 대기중');
});