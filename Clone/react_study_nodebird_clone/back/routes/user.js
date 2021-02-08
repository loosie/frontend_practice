const express = require('express');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User, Post, Comment, Image} = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const passport = require('passport');

const router = express.Router();

// 항상 새로고침할때마다 보낼 요청 
router.get('/', async (req, res, next) => { // GET /user (myinfo)
    try{
        if(req.user){
            const fullUserWithoutPassword = await User.findOne({
                where: { id: req.user.id },
                // attributes: ['id', 'nickname', 'email'] //원하는 정보만 get
                attributes: {
                    exclude: ['password'] //password만 제외하고 모든 정보 get
                },
                include: [{
                    model: Post,
                    attributes: ['id']
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id']
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id']
                }]
            })
            res.status(200).json(fullUserWithoutPassword);
        }else{
            res.status(200).json(null);
        }
    }catch(error){
        console.error(error);
        next(error);
    }
});

// 다른 유저정보 가져오기
router.get('/:userId', async (req, res, next) => { // GET /user/1
    try{
        const fullUserWithoutPassword = await User.findOne({
            where: { id: req.params.userId },
            // attributes: ['id', 'nickname', 'email'] //원하는 정보만 get
            attributes: {
                exclude: ['password'] //password만 제외하고 모든 정보 get
            },
            include: [{
                model: Post,
                attributes: ['id']
            }, {
                model: User,
                as: 'Followings',
                attributes: ['id']
            }, {
                model: User,
                as: 'Followers',
                attributes: ['id']
            }]
        })

        if(fullUserWithoutPassword){
            const data = fullUserWithoutPassword.toJSON(); //sequelize data -> Json data로 변경
            
            // 개인정보 침해 예방
            data.Posts = data.Posts.length;  
            data.Followers = data.Followers.length;
            data.Followings = data.Followings.length;

            res.status(200).json(data);
        }else{
            res.status(404).json('존재하지 않는 사용자입니다.');
        }
    }catch(error){
        console.error(error);
        next(error);
    }
});



// 해당유저 사용자 게시글
router.get('/:userId/posts', async (req, res, next) => { //GET /user/1/posts
    try{
        // const user = await User.findOne({ where: { id: req.params.userId }});

        // if (user) {
            // const where = {};
            const where = { UserId : req.params.userId };
            if (parseInt(req.query.lastId, 10)){ // 초기 로딩이 아닐 때
                where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}; // id가 lastId보다 작은 것만 불러와라 (Op.lt = 작은 것)
            }

            // const posts = await user.getPosts({
            const posts = await Post.findAll({
                where,
                limit: 10,
                // offset: 0, // 1~10 offset은 로드하는 중에 새로운 게시글을 업로드할 때 에러가 발생하기 때문에 실무에서 사용 잘 안함  -> lastId방식으로 대체
                
                order: [
                    ['createdAt', 'DESC'], //최신 게시글부터 업로드 
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
                        attributes: ['id', 'nickname'],
                        order: [['createdAt', 'DESC']],
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
                // console.log(posts);
                res.status(200).json(posts);
            // }else{
            //     res.status(404).send('존재하지 않는 사용자입니다.');
            // }
        } catch(error){
            console.error(error);
            next(error);
        }
    
});



router.post('/login', isNotLoggedIn, (req,res, next)=> {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        
        // passport.login
        return req.login(user, async(loginErr) => {
            if(loginErr){
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                // attributes: ['id', 'nickname', 'email'] //원하는 정보만 get
                attributes: {
                    exclude: ['password'] //password만 제외하고 모든 정보 get
                },
                include: [{
                    model: Post,
                }, {
                    model: User,
                    as: 'Followings',
                }, {
                    model: User,
                    as: 'Followers',
                }]
            })
            return res.status(200).json(fullUserWithoutPassword);
        })
    })(req, res, next);
});


router.post('/', isNotLoggedIn, async(req, res) => { // POST /user/
    
    try{
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });

        if(exUser){
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3060'); // npm i cors로 처리해도 됨
        res.status(201).send('ok');

    } catch(error){
        console.error(error);
        next(error);
    }  
});

router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
});


// 닉네임 수정
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try{
        await User.update({
            nickname: req.body.nickname,
        }, {
            where: { id : req.user.id },
        });
        res.status(200).json({ nickname: req.body.nickname });
    }catch(error){
        console.error(error);
        next(error);
    }
})

// 팔로우
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => { // PATCH /user/1/follow
    try{
        const user = await User.findOne({ where: { id: req.params.userId } });
        if(!user){
            res.status(403).send("팔로우하는 대상이 존재하지 않습니다.");
        }
        await user.addFollowers(req.user.id);
        
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });

    }catch(error){
        console.error(error);
        next(error);
    }
})

// 언팔로우
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => { // DELETE /user/1/follow
    try{
        const user = await User.findOne({ where: { id: req.params.userId } });
        if(!user){
            res.status(403).send("언팔로우하는 대상이 존재하지 않습니다.");
        }
        
        await user.removeFollowers(req.user.id);
        
        res.status(200).json({ UserId:  parseInt(req.params.userId, 10) }); // -> reducer action.data

    }catch(error){
        console.error(error);
        next(error);
    }
})

// 팔로워 목록 불러오기
router.get('/followers', isLoggedIn, async (req, res, next) => { // GET /user/followers
    try{
        const user = await User.findOne({ where: { id: req.user.id } });
        if(!user){
            res.status(403).send("사용자를 찾을 수 없습니다.");
        }
        
        const followers = await user.getFollowers();
        res.status(200).json(followers); 

    }catch(error){
        console.error(error);
        next(error);
    }
})

// 팔로잉 목록 불러오기
router.get('/followings', isLoggedIn, async (req, res, next) => { // GET /user/followings
    try{
        const user = await User.findOne({ where: { id: req.user.id } });
        if(!user){
            res.status(403).send("사용자를 찾을 수 없습니다.");
        }
        
        const followings = await user.getFollowings();
        res.status(200).json(followings); 

    }catch(error){
        console.error(error);
        next(error);
    }
})

// 팔로워 삭제하기
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => { // DELETE /user/follower/2
    try{
        const user = await User.findOne({ where: { id: req.params.userId } });
        if(!user){
            res.status(403).send("차단하려는 사용자를 찾을 수 없습니다.");
        }
        
        await user.removeFollowings(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10)}); 

    }catch(error){
        console.error(error);
        next(error);
    }
})




module.exports = router;