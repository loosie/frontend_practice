const express = require('express');
const bcrypt = require('bcrypt');

const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const passport = require('passport');

const router = express.Router();

// 항상 새로고침할때마다 보낼 요청 
router.get('/', async (req, res, next) => { // GET /user
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