const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { User , sequelize } = require('../models');

const router = express.Router();

/** 팔로잉 끊기 */
router.delete('/:id/follow',
    isLoggedIn,
    async(req, res, next) => {
        try {

            /** 현재 로그인 사용자 */
            const loginId = req.user.id;

            /** 팔로잉 대상 */
            const follwoingId = parseInt( req.params.id, 10 );
            const Follow = sequelize.models.Follow;
            await Follow.destroy( { where: { followingId: follwoingId ,  followerId: loginId }   } );

            return res.send('success');
            
        } catch (error) {
            console.error(error);
            next(error); 
        }


    }
);

/** 팔로잉 하기  */
router.post('/:id/follow',
    isLoggedIn,
    async (req, res, next) => {
        try {
            /** 현재 로그인 사용자 (팔로우할사용자)
             * 팔로우: 누군가를 따른다.
             */
            const loginId = req.user.id;
            const user = await User.findOne({ where: {id: loginId } });

            if( ! user ){
                return res.status(404).send('no user');
            }

            /**
             * 팔로잉 대상
             */
            const follwoingId = parseInt( req.params.id, 10 );

            /**
             * 내가 대상에대해서 팔로잉한다.
             */
            user.addFollowing( follwoingId );

            return res.send('success');
        } catch (error) {
            console.error(error);
            next(error);
        }
    },
);

module.exports = router;
