const express = require('express')
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const passportConfig = require('./passport');
const passport = require('passport');


dotenv.config();
const app = express();
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);

passportConfig();

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3060',
    credentials: true,
}));
// ---router보다 위에 설정----
app.use('/', express.static(path.join(__dirname, 'uploads'))); // 폴더명 합쳐줌 __dirname + /uploads (OS에 따라 경로구분자가 다르기 때문에 path.join사용)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// -----------------------
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) =>{
    res.send('hello express');
});

// router
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(3065, ()=>{
    console.log("서버 실행 중");
});