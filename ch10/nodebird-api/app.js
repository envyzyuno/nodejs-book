const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();
const passportConfig = require('./passport');

const { sequelize } = require('./models')


const app = express();
passportConfig();

app.set('port', process.env.PORT || 8002 );
app.set('view engine', 'html');
nunjucks.configure('views',{
    express: app ,
    watch: true,
});
sequelize.sync( { force: false } )
    .then(() => {
        console.log('테이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error( err );
    });

/** 모든 요청 공통 라우터 처리 */
app.use( morgan('dev') );
app.use( express.static(path.join( __dirname, 'public' ) ) );
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );
app.use( cookieParser(process.env.COOKIE_SECRET) );
app.use( session(
    {
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    }
));
app.use( passport.initialize() );
app.use( passport.session() );

/** 서비스별 라우터 처리 */
app.use('/', require('./routes') );
app.use('/auth', require('./routes/auth') );
app.use('/v1', require('./routes/v1') );


/** 매핑되는 라우터가 존재하지 않을경우 404 not found */
app.use( (req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next( error );
} );

/** 공통 에러 처리 */
app.use( (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV != 'production' ? err : {};
    res.status( err.status || 500 );
    res.render('error');
} );

/** 애플리케이션 구동 */
app.listen( app.get('port'), () => {
    console.log( app.get('port'), '번 포트에서 대기 중' );
} );
