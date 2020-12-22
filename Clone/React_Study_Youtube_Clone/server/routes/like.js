const express = require('express');
const router = express.Router();

const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");



//=================================
//             Like
//=================================


//* MongoDB에 like 정보 가져오기
//* req: videoId ? video좋아요 : comment좋아요
router.post('/getLikes', (req, res) =>{

    let variable = {}

    if(req.body.videoId){
        variable = {videoId: req.body.videoId}
    }else{
        variable = {commentId: req.body.commentId}
    }

    Like.find(variable)
        .exec((err, likes)=>{
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, likes})
        })

});

//* 좋아요 클릭시 개수 올리기
//* req: videoId ? video좋아요 : comment좋아요
router.post('/upLike', (req, res) =>{
    
    let variable = {}

    if(req.body.videoId){
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    }else{
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    // Like collection에 정보 업데이트
    const like = new Like(variable)
    like.save((err, likeResult)=>{
        if(err) return res.json({success : false, err})

        // 만약 dislike이 클릭되어있을 때, dislike의 1을 줄여준다
        Dislike.findOneAndDelete(variable)
            .exec((err, disLikeResult)=>{
                if(err) return res.status(400).json({ success: false, err})
                res.status(200).json({ success: true })
            })

    })
})


//* 클릭된 좋아요 취소하기 (좋아요 삭제)
//* req: videoId ? video좋아요 : comment좋아요
router.post('/unLike', (req, res) =>{
    
    let variable = {}

    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId: req.body.userId }
    }else{
        variable = {commentId: req.body.commentId, userId: req.body.userId }
    }


    // Like collection에 정보 삭제
    Like.findOneAndDelete(variable)    
        .exec((err, result) => {
            if(err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })


});


//* MongoDB에 dislike 정보 가져오기
//* req: videoId ? video싫어요 : comment싫어요
router.post('/getDislikes', (req, res) =>{

    let variable = {}

    if(req.body.videoId){
        variable = {videoId: req.body.videoId}
    }else{
        variable = {commentId: req.body.commentId}
    }

    Dislike.find(variable)
        .exec((err, dislikes)=>{
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, dislikes})
        })

});


//* 클릭된 싫어요 취소하기 (싫어요 개수 내리기)
//* req: videoId ? video싫어요 : comment싫어요
router.post('/unDislike', (req, res) =>{
    
    let variable = {}

    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId: req.body.userId }
    }else{
        variable = {commentId: req.body.commentId, userId: req.body.userId }
    }


    // Dislike collection에 정보 삭제
    Dislike.findOneAndDelete(variable)    
        .exec((err, result) => {
            if(err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })

        
});


//* 싫어요 클릭시 개수 올리기
//* req: videoId ? video싫어요 : comment싫어요
router.post('/upDislike', (req, res) =>{
    
    let variable = {}

    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId: req.body.userId }
    }else{
        variable = {commentId: req.body.commentId, userId: req.body.userId }
    }


    // Disike collection에 정보 업데이트
    const dislike = new Dislike(variable)
    dislike.save((err, dislikeResult)=>{
        if(err) return res.json({success : false, err})

        // 만약 like이 클릭되어있을 때, like의 1을 줄여준다
        Like.findOneAndDelete(variable)
            .exec((err, likeResult)=>{
                if(err) return res.status(400).json({ success: false, err})
                res.status(200).json({ success: true })
            })
    })    
});

module.exports = router;