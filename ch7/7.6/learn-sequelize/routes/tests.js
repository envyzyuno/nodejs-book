const express = require('express');

const { User, Comment, sequelize } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

/** 회원 등록  */
router.get('/create_user' , async (req, res, next) => {
    try{
        await User.create({
            name: 'xxx3',
            age: 111,
            married: false,
            comment: '회원설명',
        });
    
        res.send('create_user');
    } catch( error ){
        next(error);
    }
});


/**
 * 
 */
router.get('/query', async ( req, res, next ) => {

    try {
        const { result, metadata } = await sequelize.query('SELECT * FROM COMMENTS');

        console.log( 'result:', result );
        console.log( 'metadata:', metadata );
        res.send( result );
    } catch (error) {
        next(error);
    }

});

/** findall 전체 리스트  */
router.get('/find_all_01', async (req, res, next ) => {
    try {
        const allList = await User.findAll({});
        allList.forEach( d => {
            console.log( d.dataValues );
        });
        res.send(allList);
    } catch (error) {
        next(error);
    }

});

/** findAll 조건 리스트  */
router.get('/find_all_02', async(req, res, next) => {
    try {
        const user = 
            await User.findAll({
                attributes: [ 'name', 'married' ],
                where: { married: false, 
                    [ Op.or ]: [
                        { married:false },
                        { age:{ [Op.gt]: 30 } }
                    ]
                },
                order: [ ['age', 'DESC'] ],
                limit: 100,
                offset: 1,
            });
            res.send( user );
    } catch (error) {
        next(error);
    }
});


/**
 * 사용자 코멘트 변경
 * http://127.0.0.1:3001/tests/update?userId=11&comment=%EC%82%AC%EC%9A%A9%EC%9E%90%EC%84%A4%EB%AA%85%EB%B3%80%EA%B2%BD
 */
router.get('/update', async(req, res, next) => {
    try {

        /** 쿼리 파라미터에서 데이터 추출 */
       const { userId, comment } = req.query;
       const user = await getUserOnce( userId );

       if( user == null ){
         throw new Error('사용자 정보 없음.');
       }

       console.log( 'name=', user.name );

        const count = 
            await User.update( 
                { comment: comment },
                { where: {id : userId } }
            );

        const afterUser = await getUserOnce( userId );

        res.send( afterUser );
        
    } catch (error) {
        next(error);
    }
});


/**
 * 사용자가 코멘트 추가
 * http://127.0.0.1:3001/tests/addCommnet?userId=11&comment=1232323
 */
router.get('/addCommnet', async( req, res, next) => {
    try {
        const { userId, comment } = req.query;

        /**
         * User 테이블의 식별자를 같이 조회한다면
         * Comment 테이블에 등록도 가능하다.
         */
        const user = await getUserOnce( userId );

        //const user = await User.findOne( { where: { id: userId }, });
    
        const _comment = await Comment.create( { comment: comment } );

        await user.addComment( [ _comment ] );

        const afterUser = await getUserOnce( userId );

        res.send(afterUser);

    } catch (error) {
        next(error);
    }

});

/**
 * 사용자 정보 삭제
 * http://127.0.0.1:3001/tests/remove?userId=11
 */
router.get('/remove', async (req, res, next) => {

    try {
        const { userId } = req.query;

        await User.destroy({
                where: {id: userId },
            });

            /**
             * Comments 테이블에 연관성있는 데이터가 있는데도
             * 연관성있는 Comments 는 외래키를 null 처리한다.
             * user 정보를 삭제해버린다..
             */

        const afterUser = await getUserOnce( userId );

         res.send( afterUser );   
        
    } catch (error) {
        next(error);
    }


});

/** 1건의 사용자 정보 조회 */
function getUserOnce( userId = 0 ){

    return new Promise( (resolve, reject) => {
        try {
            const user =
                User.findOne({
                    attributes: [ 'id', 'name', 'married', 'comment' ],
                    where:{
                        id: userId,
                    },
            
                    include:[
                        {   model: Comment,
                            attributes: [ 'id', 'comment' ],
                            required: false, /** outer join */
                        },
                    ],
                        
                }); 
            resolve( user );              
        } catch (error) {
            reject( error );
        }
    });

}


module.exports = router;