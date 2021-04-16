const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.use((req, res, next) =>{
    res.locals.user = req.user;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
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



router.get('/', (req, res) => {
    const twits = [];
    const model = { title: 'NodeBird', twits: twits };
    res.render('main', model );
});

module.exports = router;
