const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();


try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const options = {
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'uploads/')
        },
        filename(req, file, cb){
            /** 파일 확장자 추출 */
            const oriName = file.originalname;
            const ext = path.extname( oriName );
            const saveFileName = path.basename( oriName, ext ) + Date.now() + ext ;
            cb( null, saveFileName );
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
};
const upload = multer( options );


router.post('/img', 
    isLoggedIn,
    upload.single('img'),
    (req, res) => {
        console.log( req.file );
        res.json({ url: `/img/${req.file.filename}` });
    }
);

/** 포스트 삭제 */
router.delete('/:id',
    isLoggedIn,
    async(req, res, next) =>{
        try {
            const loginId = req.user.id;
            /** 삭제할 포스트 아이디 */
            const postId = parseInt( req.params.id, 0 );
    
            const post =  await Post.findOne({ 
                                                attributes: ['userId'],
                                                where: { userId: loginId } 
                                            });
            if( !post || post.userId != loginId  ){
               return res.status(403).send('Forbidden');
            }
    
            Post.destroy({ where: { id : postId } });
            res.send('success');
        } catch (error) {
            console.error(error);
            next(error);
        }

    }
);

const upload2 = multer();
router.post('/',
    isLoggedIn,
    upload2.none(),
    async (req, res, next) => {
        try {
            const post = await Post.create({
                                    content: req.body.content,
                                    img: req.body.url,
                                    userId: req.user.id,
                                });

            const hashtags = req.body.content.match(/#[^\s#]+/g);
            if(hashtags){
                const result = await Promise.all(
                                        hashtags.map( tag => {
                                            const naturalTag = tag.slice(1).toLowerCase();
                                            return Hashtag.findOrCreate({
                                                where : { title : naturalTag }
                                            });
                                        })
                                    );
               
               console.log('############################################');                         
               console.log( result );                     
               console.log('############################################');  

               post.addHashtags( result.map( r => r[0] ) );

            }                            
            
            res.redirect('/');
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
);



module.exports = router;