const express = require('express');
const { Comment } = require('../models');

const router = express.Router();

router.post('/', async(req, res, next) => {
    try {
       const _comenter = req.body.id;
       const _comment = req.body.comment;
       const comment =  
            await Comment.create({
                commenter: _comenter ,
                comment: _comment ,
            });
        res.status(201).json(comment);    
    } catch (error) {
        next(error);
    }
});

router.route('/:id')
    .patch( async(req, res, next) => {
       try {
            const _id = req.params.id;
            const _comment = req.body.comment;
            
            const result = await Comment.update(
                    {   comment: _comment,  },
                    {   where: { id: _id }  },
                );
            res.json( result );
       } catch (error) {
           next(error);
       } 
    })
    .delete( async(req, res, next) => {
        try {
            const _id = req.params.id;
            const result = await Comment.destroy(
                { where: { id: _id } }
            );
            res.json( result );
            
        } catch (error) {
            next(error);
        }
    });  

;


module.exports = router;