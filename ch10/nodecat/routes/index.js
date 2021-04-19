const express = require('express');
const axios = require('axios');

const router = express.Router();


router.get(
    '/test',
    async(req, res, next) => {
        /** 토큰 테스트 라우터 */
        try {
            if( !req.session.jwt ){
                const tokenResult = await axios.post( 'http://127.0.0.1:8002/v1/token'
                                                     ,{ clientSecret: process.env.CLIENT_SECRET } );
                if( tokenResult.data && tokenResult.data.code === 200 ){
                    /** 토큰 발급 성공 시 세션에 토큰 저장 */
                    req.session.jwt = tokenResult.data.token;
                }else{
                    /** 토큰 발급 실패 시 실패 사유 응답 */
                    return res.json( tokenResult.data );
                }                                     
            }

            /** 발급받은 토큰 테스트 */
            const result = 
                await axios.get('http://127.0.0.1:8002/v1/test'
                                ,{ headers: { authorization: req.session.jwt }  } );

            return res.json(result.data);
        } catch (error) {
            console.error(error);
            if( error.response.status === 419 ){
                return res.json( error.response.data );
            }
            return next(error);
        }
    }

);


module.exports = router;