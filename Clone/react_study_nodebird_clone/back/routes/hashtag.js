const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Post, Hashtag, Image, Comment, User } = require('../models');

router.get('/:hashtag', async (req, res, next) => { //GET /hashtag/해쉬태그명
    try{
        const where = {};
        if (parseInt(req.query.lastId, 10)){ // 초기 로딩이 아닐 때
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}; // id가 lastId보다 작은 것만 불러와라 (Op.lt = 작은 것)
        }

        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [
                ['createdAt', 'DESC'], //최신 게시글부터 업로드 
                [Comment, 'createdAt', 'DESC'] // 댓글 내림차순 (2차배열인 이유)
                
            ], //정렬 배열

            include: [{
                model: Hashtag,
                where: { name: decodeURIComponent(req.params.hashtag) },
            }, {
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

module.exports =router;