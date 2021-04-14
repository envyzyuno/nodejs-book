const Sequelize =  require('sequelize');

const User = require('./user');
const Comment = require('./comment');

/** .env 파일 조회 */
const env = process.env.NODE_ENV || 'development';

/** CONFIG 조회 */
const config = require('../config/config.json')[env];

/** 모듈화 할 객체 생성  */
const db = {};

/** 시퀄라이즈 객체 생성 */
const sequelize = new Sequelize( config.database, 
                                config.username, 
                                config.password, 
                                config);
                                
/** DB JSON 에 세팅 */
db.sequelize =  sequelize;
/** 테이블 MODEL 세팅 */
db.User = User;
db.Comment = Comment;

/** 테이블별 초기화  */
User.init( sequelize );
Comment.init( sequelize );

/** 연관관계 세팅 */
User.associate( db );
Comment.associate( db );


/** exports 된것이 json 형태일경우.. */
module.exports = db;