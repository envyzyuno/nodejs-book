const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');

const { User } = require('../models');

module.exports = () => {

    /**
     * 로그인시 실행 
     * req.session 객체에 어떤 데이터를 저장할지 지정한다.
     * user: 로그인 사용자정보
     * done: 후처리 함수
     */
    passport.serializeUser( (user, done) => {
        const err = null;
        done(err, user.id);
    }); 

    /**
     * 모든 요청에대해서 실행 ( request 가 왔을경우 )
     * id : serializeUser 에서 사용한 user.id
     * done: 후처리 함수
     */
    passport.deserializeUser( (id, done) => {
        /** 로그인한 사용자 정보 조회  */        
        User.findOne(
            { 
                where: {id},
                include: [
                    {
                        model: User,
                        attributes: ['id', 'nick' ],
                        as: 'Followers'   /** 로그인 사용자를 팔로잉 하는 사용자 목록 */
                    },

                    {
                        model: User,
                        attributes: ['id', 'nick' ],
                        as: 'Followings'   /** 로그인 사용자가 팔로잉 하는 사용자 목록 */
                    },

                ], 
            },

            
        )
        .then( user => done( null, user ) )
        .catch( err => done( err ) );

        /**
        User.findOne( { where: {id} } )
            .then( user => done( null, user ) )
            .catch( err => done( err ) );
         */
    });

    local();
    kakao();
};
