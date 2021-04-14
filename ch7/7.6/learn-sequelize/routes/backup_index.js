const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    /**
     * views/sequelize.html 페이지를 랜더하며
     * users: users 를 세팅한다.
     */
    res.render('sequelize',{ users } );
    
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
