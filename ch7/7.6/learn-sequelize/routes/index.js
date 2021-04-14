const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll({});
        /**
         * views/sequelize.html 페이지를 랜더하며
         * users: users 를 세팅한다.
         */
        res.render( 'sequelize', { users } );

    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;