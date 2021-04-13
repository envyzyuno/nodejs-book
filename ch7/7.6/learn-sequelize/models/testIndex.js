const Sequelize =  require('sequelize');

/**
 * .env 파일 조회
 */
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

/**
 * 시퀄라이즈 객체 생성
 */
const sequelize = new Sequelize( config.database, 
                                config.username, 
                                config.password, 
                                config);
/**
 * DB JSON 에 세팅
 */
db.sequelize =  sequelize;

module.exports = db;