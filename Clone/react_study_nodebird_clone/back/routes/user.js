const express = require('express');
const bcrypt = require('bcrypt');

const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const passport = require('passport');

const router = express.Router();

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

module.exports = router;