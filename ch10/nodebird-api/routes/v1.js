const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken, deprecated } = require('./middlewares');
const { Domain, User, Post, Hashtag  } = require('../models');

const router = express.Router();

/** v1 api 폐기처리 */
router.use(deprecated);

/** 내 포스트 조회 */
router.get(
    '/posts/my',
    verifyToken,
    async(req, res) => {
        try {
            const loginId = req.decoded.id;
            const posts = await Post.findAll({ 
                            where: { userId: loginId }  
                         });
            return res.json({ code:200, payload: posts });  
        } catch (error) {
            console.error(error);
            return res.status(500)
                      .json({ code:500, message:'서버 에러' });            
        }
    }
);

/** 해당 해시태그들 조회 */
router.get(
    '/posts/hashtag/:title',
    verifyToken,
    async(req, res) => {
        try {
            const title = req.params.title;
            /** 해시태그 존재 유무 확인 */
            const hashtag = await Hashtag.findOne({ where: { title: title } });
            if(!hashtag){
                return res.status(404).json({ code:404, message:'해시태그 존재하지 않음.' });
            }
            /** 해시 태그의 포스트들 조회 */
            const posts = await hashtag.getPosts();
            return res.json({ code:200, payload: posts });

        } catch (error) {
            console.error(error);
            return res.status(500)
                      .json({ code:500, message:'서버 에러' }); 
        }
    }
);

/** 토큰 발급 */
router.post(
    '/token', 
    async(req, res) => {
        const { clientSecret } = req.body;
        try {
            const domain = 
                await Domain.findOne({
                    where: { clientSecret },
                    include: {
                        model: User,
                        attribute: ['nick','id'],
                    },
                });
            if(!domain){
                return res.status(401)
                          .json({ code:401, message:'등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요.' });
            }
            /** 토큰생성 */    
            const token = jwt.sign(
                { id: domain.User.id, nick: domain.User.nick },
                process.env.JWT_SECRET,
                {  expiresIn: '1m' , issuer: 'nodebird' }
            );

            return res.json({
                code: 200,
                message: '토큰이 발급되었습니다.',
                token,
            });    

        } catch (error) {
           console.error(error);
           return res.status(500)
                     .json({ code:500, message:'서버 에러', }); 
        }
    },
);

/** 토큰 테스트 */
router.get(
    '/test',
    verifyToken,
    (req, res) => {
        res.json( req.decoded );
    },
);



module.exports = router;