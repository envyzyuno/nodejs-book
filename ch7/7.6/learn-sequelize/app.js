const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const sequelize = require('./models/index');

const app = express();
app.set('port', process.env.PORT || 3001 );
app.set('view engine', 'html');
nunjucks.configure( 'views',{
    express : app,
    watch: true,
});

app.use( morgan('dev') );
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );


/**
 * 더이상 url 에 매핑되는 라우터가 존재하지 않을경우
 */
app.use( (req, res, next) =>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next( error );
});

/**
 * 공통 에러 처리
 */
app.use( ( err, req, res, next) =>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status( err.status || 500 );
    res.render( 'error' );
});

/**
 * 해당 포트로 웹서비스 시작
 */
app.listen( app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});


