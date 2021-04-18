const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User, Hashtag } = require('../models');

router.use((req, res, next) =>{

    /**
     * request 에 있는 세션 사용자 정보를 
     * res locals 로 세팅한다.
     */
    res.locals.user = req.user;

    /** 로그인 사용자를 팔로잉 하는 카운트   */
    res.locals.followerCount = req.user ? req.user.Followers.length : 0;


    /** 로그인 사용자가 팔로잉 하는 카운트 */
    res.locals.followingCount = req.user ? req.user.Followings.length : 0 ;

     /** 로그인 사용자가 팔로잉 하는 id 리스트 */
    res.locals.followerIdList = req.user ? req.user.Followings.map( f => f.id ) : [] ;
 
    next();
});

/** 내정보 (로그인 사용자만 조회 가능) */
router.get('/profile', 
  isLoggedIn,
  (req, res) => {
    const model = { title: '내 정보 - NodeBird' };

    
    res.render('profile', model );
});

/** 회원가입 (비로그인 사용자만 사용가능) */
router.get('/join', 
    isNotLoggedIn,
     (req, res) => {
    const model = { title: '회원 가입 - NodeBird' };
    res.render('join', model );
});


/**
 *  메인 페이지 호출
 */
router.get('/', async(req, res, next ) => {

    try {
        const posts = await 
            Post.findAll({
                include:{
                    model: User,
                    attributes: [ 'id', 'nick' ],
                },
                order:[ [ 'createdAt', 'DESC' ] ],
            });
        const model = { title: 'NodeBird', twits: posts,  };    
        
        /** 
        console.log('###################');
        console.log( model );
        console.log('###################');
        
        */

        res.render('main', model );    
        
    } catch (error) {
        console.error(error);
        next(error);
    }

});


/** hashtag 페이지 호출 */
router.get('/hashtag', async(req, res, next) => {
    const query = req.query.hashtag;
    if( !query ){
        /** 메인페이지로 이동  */
        return res.redirect('/');
    }

    try {

        const hashtag = await Hashtag.findOne({ where: { title : query } });
        
        let posts = [];
        if( hashtag ){
            posts = await hashtag.getPosts({
                include: [ { model: User } ]
            });
        }

        const model = {
            title: `${query} | NodeBird`,
            twits: posts,
        };

        res.render('main', model );

    } catch (error) {
        console.error(error);
        return next(error);
    }

});

module.exports = router;
