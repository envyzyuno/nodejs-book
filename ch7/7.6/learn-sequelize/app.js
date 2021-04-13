const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

/** .env 파일 로드  */
dotenv.config();

/**
 * sequelize import
 * 
 * { sequelize } 를 사용한 이유는 exports 된 데이터가  { sequelize: Object }
 * 형태 이기 때문에.
 */
const { sequelize } = require('./models');


const app = express();
app.set('port', process.env.PORT || 3001 );
app.set('view engine', 'html');
nunjucks.configure( 'views',{
    express : app,
    watch: true,
});

/**
 * sequelize 의 형상이 jpa 와 닮았다.
 * force : true 이면 서버 실행시 마다 테이블을 alter or create 
 * 하는 것까지 jpa 와 닮아있다.
 */
sequelize.sync( {force : false } )
    .then( () => {
        console.log('DB CONNECTED...');
    })
    .catch( (err) => {
        console.error( err );
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


 

const { User, Comment } = require( './models' );
const {  Op } = require('sequelize');


async function testSql(){
    const { result, metadata } = await sequelize.query('SELECT * FROM COMMENTS');

    console.log( 'result:', result );
    console.log( 'metadata:', metadata );
}

testSql();
return;



/** 테스트를 위한 임시 코드 
User.create( {
    name: 'abc',
    age: 100,
    married: false,
    comment: 'What The Fuck..'
});
User.findAll({})
    .then( (list) => {
        console.log('findAllList---------------------');
        console.log('length:', list.length );
    })
    .finally( () => {
        console.log('--------------------------------\n');
    });
 */
/** 
 User.findAll( 
        { attributes: ['name', 'married' ],
           where: {
            married: false,
            [ Op.or ]: [ { married:false} , { age: { [Op.gt]: 30 } } ]     
           },
           order: [ ['age', 'DESC'] ],
           limit: 100,
           offset: 1,
        }
    )
    .then( (list) => {
        console.log('findAllList2---------------------');
        list.forEach( d => {
            console.log( d.dataValues );
        });
        
    })
    .finally( () => {
        console.log('--------------------------------\n');
    });
    ;
 */
 /**
    User.update( 
    { comment: 'xxxxx' },
    { where: { id: 3 }}
    );
     */
    /**     
    User.destroy( {
        where: { id : 3 }
    });
*/

/**
 * 이름으로 사용자 1명 조회 
 */
async function getUserOnce( user_id ){

    /**
    const user = await User.findOne({});
     */
    const user = await User.findOne( {
        attributes: ['name', 'married' ],
        where: {
            id: user_id,
        },
           
        include: [ 
            { model: Comment,
              attributes: [ 'id', 'comment' ],  
              //where: { id:1 ,},
              required: false, /** outer join */
            },
            
        ],
    });

    //const comments = await user.getComments();
    /** user.js as: 'Answers' 로 정의됨 */
    //const answers = await  user.getAnswers();
 
    console.log( user );
    console.log('user name:', user.name );
    console.log('user Comments:', user.Comments );
    // console.log('user Comments:', comments);
   // console.log('user answers:', answers );
}


/** 사용자 아이디로  */
async function addComment( user_id, comment ){

    const user = await 
            User.findOne( {         
                            where: { id: user_id, },
    });
    const _comment =  await Comment.create( {   comment: '댓글1',   } );

    await user.addComment( [ _comment ] );

}


//addComment( 1, '코멘트1' );

  getUserOnce( 1 );









