const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const url = require('url');

const { verifyToken, apiLimiter } = require('./middlewares');
const { Domain, User, Post, Hashtag } = require('../models');

const router = express.Router();

/** 
 * CORS 
 * Access-Control-Allow-Origin: *
router.use(cors({
    credentials: true,
}));
**/

router.use( async(req, res, next) => {
    const origin = req.get('origin');
    const host = url.parse( origin ).host;
    const domain = await Domain.findOne({ where: { host } });

    /**
    console.log('origin:',origin);
    console.log('host',host);
    console.log('domain',domain);
    */
    if( domain ){
        cors({ origin: origin, credentials: true } )(req, res, next);
    }else{
        next();
    }

});

/** 토큰 발급 */ 
router.post(
    '/token', 
    apiLimiter,
    async(req, res) => {
        const { clientSecret } = req.body;
        try {
            const domain = 
                await Domain.findOne({
                    include: {
                        model: User,
                        attribute: ['nick','id']
                    },
                    where: { clientSecret },
                });
            if(!domain){
                return res.status(401),json({ code:401, message:'등록되지 않은 도메인.' });
            }
            /** 토큰생성 */
            const token = jwt.sign(
                { id: domain.User.id, nick: domain.User.nick },
                process.env.JWT_SECRET,
                { expiresIn: '30m', issuer: 'nodebird' }
            );

            return res.json({
                code: 200,
                message: '토큰이 발급되었습니다.',
                token
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ code:500, message:'서버에러' });
        }
    }
);


/** 토큰 테스트 */
router.get(
    '/test',
    verifyToken,
    apiLimiter,
    async(req, res, next) => {
        req.json( req.decoded );
    }
);

/** 내 포스트 조회 */
router.get(
    '/posts/my',
    apiLimiter,
    verifyToken,
    (req, res, next) => {
        const loginId = req.decoded.id;
        Post.findAll( { where: { userId: loginId } } )
            .then( posts => {
                console.log( posts );
                res.json({ code:200, payload:posts  });
            })
            .catch( error => {
                console.error(error);
                return res.status(500)
                         .json({ code:500, message:'서버에러'});
            });

    }
);


/** 해당 해시태그들 조회 */
router.get(
    '/posts/hashtag/:title',
    verifyToken,
    apiLimiter,
    async(req, res) =>{
        try {
            const title = req.params.title;
            const hashtag = await Hashtag.findOne({ title: title });
            if(!hashtag){
                return res.status(404).json({ code:404, message:'해시태그 없음.' });
            }
            const posts = await hashtag.getPosts();
            return res.json({ code:200, payload: posts });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ code:500, message:'서버 에러' });
        }
    }
);

module.exports = router;