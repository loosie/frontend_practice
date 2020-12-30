const { User } = require('../models/User');

//인증 처리를 하는 곳
let auth = (req, res, next) => {

    //클라이언트 쿠키에서 토큰 가져옴
    let token = req.cookies.x_auth;

    //토큰 복호화 후 userId 꺼내기
    User.findByToken(token , (err, user)=> {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true});

        req.token = token;
        req.user = user;
        next(); 
    })

    //user가 존재하면 인증 OK / 없으면 인증 NO
}


module.exports = { auth };