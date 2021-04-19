const jwt = require('jsonwebtoken');
const RateLimit = require('express-rate-limit');

exports.apiLimiter = new RateLimit({
    windowMs: 60 * 1000, /** 1분 */
    max: 1,
    handler( req, res, next ){
        res.status( this.statusCode )
            .json({ 
                    code: this.statusCode, /** 기본값 429 */
                    message:'1분에 한 번만 요청할수 있습니다.' 
            });
    }
});

exports.deprecated = (req, res) => {
    res.status(410).json({
        code: 410,
        message: '새로운 버전이 나왔습니다. 새로운 버전을 사용하세요.'
    });
};


/** 토큰 유효성 체크 */
exports.verifyToken = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        const secret = process.env.JWT_SECRET;
        const decodedToken = jwt.verify( authorization, secret );
        req.decoded = decodedToken;

        return next();
    } catch (error) {
        if( error.name === 'TokenExpiredError' ){ 
            /** 토큰 유효기간 만료 */
            return res.status(419)
                      .json({ code: 419, message: '토큰이 만료되었습니다.' });
        }
        return res.status(401)
                  .json({ code: 401, message: '유효하지 않은 토큰입니다.' });
        
    }
};
exports.isLoggedIn = (req, res, next) => {
    if( req.isAuthenticated() ){
        next();
    }else{
        res.status(403).send('로그인 필요');
    }
};
exports.isNotLoggedIn = (req, res, next) => {

    if( !req.isAuthenticated() ){
        next();
    }else{
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }  

};

