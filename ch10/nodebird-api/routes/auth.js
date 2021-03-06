const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

/** 회원 가입 */
router.post( '/join',
    isNotLoggedIn,
    async ( req, res, next ) => {
        /** req body 의 입력값 조회 */
        const { email, nick, password } = req.body;

        try {
            const exUser = await User.findOne({where: { email: email } });
            if( exUser ){
                return res.redirect('/join?error=exist');
            }
            /** 비밀번호 암호화 */
            const hash = await bcrypt.hash( password, 12 );

            /** 사용자 정보 저장 */
            await User.create({
                email,
                nick,
                password: hash,
                provider: 'local',
            });
            /** 메인 페이지로 이동*/
            return res.redirect('/');      
        } catch (error) {
            console.error( error );
            return next( error );
        }
    }
);

/** 로그인 처리 */
router.post('/login',
    isNotLoggedIn,
    (req, res, next) => {

        /** passport.authenticate 는 localStrategy 를 호출한다. */
        passport.authenticate('local', 
            (authError, user, info)=>{
                if(authError){
                    console.error(authError);
                    return next(authError);
                }
                if( !user ){
                    return res.redirect(`/?loginError=${info.message}`);
                }

                /** passport.serializeUser 호출   */
                return req.login(user, 
                    (loginError) =>{
                        if(loginError){
                            console.error(loginError);
                            return next(loginError);
                        }
                        return res.redirect('/');
                    }
                );
            }
        )(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
    }
);

/** 로그아웃 처리 */
router.get('/logout',
    isLoggedIn,
    (req, res, next) => {
        /** 로그아웃 이후 메인 페이지로 이동 */
        req.logout();
        req.session.destroy();
        res.redirect('/'); 
    }
);

/** 카카오 로그인 내부적으로 req.login 을 호출한다.  */
router.get('/kakao', passport.authenticate('kakao') );

router.get('/kakao/callback', 
    passport.authenticate(
        'kakao', 
        { failureRedirect : '/' } ),
        ( req, res ) => {
            res.redirect('/');
        }
);

module.exports = router;