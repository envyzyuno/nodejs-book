const passport = require('passport');
const KakaoStrategy =  require('passport-kakao').Strategy;

const { User } = require('../models');

module.exports = () => {

    const options =         {
            clientID: process.env.KAKAO_ID,
            callbackURL: '/auth/kakao/callback'
        };
    let verifyFunction = 
        async( accessToken, refreshToken, profile, done ) => {
            console.log('kakao profile:', profile );
            try {
                /** 제공자가 카카오이며, sns id 가 kakao 에서 제공한것과 동일한 사용자 정보 조회 */  
                const exUser = await User.findOne({ where: { snsId: profile.id, provider: 'kakao' } });
                if( exUser ){
                    /** 카카오 계정의 정보가 존재할경우.  */
                    return done( null, exUser );
                }

                /** 카카오 계정으로 회원정보 등록 */
                const newUser = await User.create(
                    {
                        email: profile._json && profile._json.kakao_account_email,
                        nick: profile.displayName,
                        snsId: profile.id,
                        provider: 'kakao',
                    }
                );
                return done( null, newUser );

            } catch (error) {
                console.error(error);
                return done(error);
            }
        };   
        
    const strategy =  new KakaoStrategy( options, verifyFunction );

    passport.use( strategy );
};
