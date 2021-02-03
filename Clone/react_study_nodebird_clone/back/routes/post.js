const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try{
    fs.accessSync('uploads');
} catch(error){
    console.log('uploads폴더가 없으므로 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({ // scaleup 할 때 storage위치를 S3로 바꾸면 됨
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads');
        },
        filename(req, file, done){ // loosie.png
            const ext = path.extname(file.originalname);  // 확장자 추출(.png)
            const basename = path.basename(file.originalname, ext); // loosie
            done(null, basename + '_' + new Date().getTime() + ext ); // looise2412412.png
        },
    }),
    limits: { fileSize: 20* 1024* 1024}, // 용량 제한 20MB
    // 동영상 업로드 같은 경우는 서버를 거치지 않는게 좋음 
    // 서버 CPU나 메모리를 잡아먹어 부담을 많이줌 (돈 많이 듬)
    // 그래서 프론트에서 바로 클라우드로 올릴 수 있게 하는게 좋음
});


router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { //POST /post
    try{ 
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });

        if(req.body.image){
            if(Array.isArray(req.body.image)){ // 이미지를 여러 개 올리면 image: [루지.png, 루우지.png]
                const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
                await post.addImages(images);
            }else{ // 하나만 올리면 image: loosie.png
                const image =await Image.create({ src: req.body.image });
                await post.addImages(image);
            }
        }

        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User, // 댓글 작성자
                    attributes: ['id', 'nickname'],
                }]
            }, {
                model: User, // 게시글 작성자
                attributes: ['id', 'nickname'],
            },{
                model: User, // 좋아요 누른 사람
                as: 'Likers',
                attributes: ['id'],
            }]
        })

        res.status(201).json(fullPost);

        } catch (error){
            console.error(error);
            next(error);
        }
});



// 이미지 업로드
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => { // POST /post/images
    console.log(req.files);
    
    res.json(req.files.map((v) => v.filename));
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { // POST /post/1/comment
    try{ 
        const post = await Post.findOne({
            where: { id: req.params.postId }
        });
        if(!post){
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id,
        })
        const fullComment = await Comment.findOne({
            where: { id : comment.id },
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }],
        })
    
        res.status(201).json(fullComment);

    }catch(error){
        console.error(error);
        next(error);
    }
});


// 좋아요 등록
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { //PATCH /post/1/like
    try{
        const post = await Post.findOne({ where : { id: req.params.postId }});
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }

        await post.addLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });

    } catch(error){
        console.error(error);
        next(error);
    }

});


// 좋아요 해제
router.delete('/:postId/like', isLoggedIn, async(req, res, next) => { //DELETE /post/1/like
    try{
        const post = await Post.findOne({ where : { id: req.params.postId }});
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }

        await post.removeLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });

    } catch(error){
        console.error(error);
        next(error);
    }
});

// 게시글 삭제
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
    try{
        await Post.destroy({
            where: { 
                id : req.params.postId,
                UserId: req.user.id,
            },
        });
        res.json({ PostId: parseInt(req.params.postId, 10) });
    }
    catch(error){
        console.error(error);
        next(error);
    }
})

router.delete('/', (req, res) => {
    res.json({ id : 1 });
});

module.exports = router;