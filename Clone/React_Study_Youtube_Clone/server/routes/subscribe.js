const express = require('express');
const router = express.Router();
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");

const { Subscriber } = require("../models/Subscriber");


//=================================
//             Subscribe
//=================================


//* MongoDB에 구독자 수 정보 가져오기
//* (userTo) -> 해당 구독자 수(subscribe.length)
router.post('/subscribeNumber', (req, res) =>{
    
    //* Subscriber테이블에서 userTo를 구독하는 모든 구독자 정보 가져오기
    Subscriber.find({ 'userTo': req.body.userTo})
        .exec((err, subscribe) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true, subscribeNumber: subscribe.length })
        }) 
   
});

//* MongoDB에 해당 유저가 구독되어있는지 정보 가져오기 
// * (userTo, userFrom) -> result (0: 구독x, 1: 구독o )
router.post('/subscirbed', (req, res) =>{
   
    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
        .exec((err, subscribe)=>{
            if(err) return res.status(400).send(err);
            let result = false
            if(subscribe.length !== 0){
                result = true
            }
            res.status(200).json({ success: true, subscribed : result})
        })
   
});



module.exports = router;