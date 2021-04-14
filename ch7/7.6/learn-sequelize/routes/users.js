const express = require('express');
const { User, Comment } =  require('../models');

const router = express.Router();

router.route('/')
    .get( async (req, res, next) => {
        try {
          const users = await User.findAll({});
        } catch (error) {
            next(error);
        }
    })
    .post( async (req, res, next) => {
        /** body json or formdate 로 요청이 올것이다. */
        try {
                const user = await User.create({
                        name: req.body.name,
                        age: req.body.age,   
                        married: req.body.married,
                    });
                res.status(201).json(user);  
            } catch (error) {
                next(error);
            } 
    });

router.get('/:id/comments', async(req, res, next) => {
    try {
        /** path variable 을 호출하기 때문에  req.params  */
        const targetId = req.params.id;
        const comments = 
            await Comment.findAll({
                include:[
                    {   model: User,   
                        where: { id: targetId }, 
                    },
                ],
            });
        res.json(comments);    
        
    } catch (error) {
        next(error);
    }
});    

module.exports = router;   