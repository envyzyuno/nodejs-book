const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { addFollowing, removeFollowing } = require('../controllers/user');

const router = express.Router();

/** 팔로잉 끊기 */
router.delete('/:id/follow',
    isLoggedIn,
    removeFollowing,
);

/** 팔로잉 하기  */
router.post('/:id/follow',
    isLoggedIn,
    addFollowing
);

module.exports = router;