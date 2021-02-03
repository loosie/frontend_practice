const express = require('express');

const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { //GET /posts
    try{
        const posts = await Post.findAll({
            // where: { id : lastId },
            limit: 10,
            // offset: 0, // 1~10 offset은 로드하는 중에 새로운 게시글을 업로드할 때 에러가 발생하기 때문에 실무에서 사용 잘 안함  -> lastId방식으로 대체
            
            order: [
                ['createdAt', 'DESC'], //최신 게시글부터 업로드 
                [Comment, 'createdAt', 'DESC'] // 댓글 내림차순 (2차배열인 이유)
                
            ], //정렬 배열

            include: [{
                model: User,
                attributes: ['id', 'nickname']
            },{
                model: Image,
            },{
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname']
                }]
            },{
                model: User, // 좋아요 누른 사람
                as: 'Likers',
                attributes: ['id'],
            },{
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                },{
                    model: Image,
                }]
            }],
        });
        
        res.status(200).json(posts);
    } catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;