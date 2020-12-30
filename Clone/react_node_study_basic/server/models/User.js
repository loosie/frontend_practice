const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//next()하면 index.js : user.save()로 이동
userSchema.pre('save', function (next){ 
    var user = this;

    // 비밀번호 변경할 떄만 암호화(첫 생성, 수정)
    if(user.isModified('password')){
        //비밀번호를 암호화 시킨다
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }
})


// 비밀번호 일치하는지 검사하기
userSchema.methods.comparePassword = function(plainPassword, cb){

    // plainPassword 12341234 , DB에 있는 암호화 비번 $2b$10$i/m3LIa0Aoe83R.RLl9.ROdxyqMBLIgbFSgxMk/j5nBvx5GFf.wbO
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch) // '/login' isMatch로 이동
    })
}

//인증후 토큰 생성하기
userSchema.methods.generateToken = function(cb){

    var user = this;
    // console.log("tohex :" + user._id.toHexString() +", aw: " + user._id);
    
    //jsonwebtoken을 이용하여 token생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken');

    // user._id + 'secretToken' => token 생성
    // 나중에 인증 과정 'secretToken' => user._id 확인하게 됨

    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user)
    })
}

// token으로 user정보 꺼내기
userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //토큰을 decode한다
    jwt.verify(token, 'secretToken', function(err, decoded){
        // 유저 아이디를 이용해서 유저를 찾은 다음에 
        // 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id" : decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }