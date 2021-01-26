const express = require('express')
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const app = express();
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);

// ---router보다 위에 설정----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// -----------------------

app.get('/', (req, res) =>{
    res.send('hello express');
});

// router
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, ()=>{
    console.log("서버 실행 중");
});