const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports= () => {
    passport.use( 
        new LocalStrategy(
            { usernameField: 'email', passwordField: 'password' },
            async( email, password, done ) => { 
                /** done: passport.authenticate 의 콜백함수 
                 *  (authError, user, info)=>{}
                 */
                try {
                    const exUser = await User.findOne( { where: { email } } );
                    if( !exUser ){
                        return done( null, false, { message: '가입되지 않은 회원입니다.' } );
                    }
                    
                    /** 비밀번호 일치 여부 */
                    const isCompare = await bcrypt.compare( password, exUser.password );
                    if( !isCompare ){
                        return done( null, false, { message: '비밀번호가 일치하지 않습니다.' } );
                    } 
                    /** 에러 없이 사용자 정보 세팅해서 응답 */                    
                    return done( null, exUser );

                } catch (error) {
                    console.error( error );
                    return done( error );
                }
            }
     )
    );
};