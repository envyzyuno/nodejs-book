const express = require('express');

const router = express.Router();

router.get( '/', (req, res) => {
  res.send('Hello, User');
});

/**
 * 같은 url 패턴으로 처리하고 싶을경우
 */
router.route('/test')
      .get( (req, res, next) => {
        res.send('test get');
      })
      .post( (req, res, next) => {
        res.send('test get');
      });

/**
 * PathVariable 조회방법
 */
router.get( '/:id', 
  (req, res, next ) =>{
    console.log('plain id=',req.param.id);
    next();

    /** 
     * 라우터 매개변수
      다음 로우터로 이동한다.
      아래 두개의 함수를 수행하지 않고
      다음 url 패턴에 맞는 app.use 를 접근하게 된다.
    */
    next('route'); 
  },
  ( req, res, next) => {
    /** 중간에 변조가 가능하다. */
    let id = req.params.id;
    id = '001_'+id;
    req.params.id = id;
    next();
  },
  ( req, res, next) => {
    let id = req.params.id;
    res.send(`id=${id}`);
  },
);


module.exports = router;
