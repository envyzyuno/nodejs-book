const express = require('express');
const axios = require('axios');

const router = express.Router();


const URL = 'http://127.0.0.1:8002/v1';
axios.defaults.headers.origin = 'http://127.0.0.1:4000'; /** origin 헤더 추가 */

const request = async(req, api) => {
    try {
        if( !req.session.jwt ){
            /** 세션에 토큰이 존재하지 않을경우 */
            const tokenResult = await axios.post(`${URL}/token`, { clientSecret: process.env.CLIENT_SECRET });
            /** 세션에 토큰 저장 */
            req.session.jwt = tokenResult.data.token;
        }

        /** API 요청 및 응답 */
        return await axios.get(`${URL}${api}`, { headers: { authorization: req.session.jwt }  } );
    } catch (error) {

        if( error.response.status === 419 ){
           /** 기존 세션 토큰 삭제후 재귀호출 */ 
           delete req.session.jwt;
           return request( req, api );
        }
        return error.response;    
    }
};

/** 나의 포스트 조회 */
router.get(
    '/mypost',
    async(req, res, next) => {
        try {
            const result = await request( req, '/posts/my');
            res.json( result.data );
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
);

/** 해시태그 에대한 포스트들 조회 */
router.get(
    '/search/:hashtag', 
    async(req, res, next) => {
        try {
            const api = `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`;
            const result = await request(req, api);
            res.json( result.data );
        } catch (error) {
            if( error.code ){
                console.error( error );
                next(error);
            }    
        }

    } 
);



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