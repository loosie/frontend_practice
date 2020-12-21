const express = require('express');
const router = express.Router();
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");

const { Comment } = require("../models/Comment");
const { response } = require('express');


//=================================
//             Comment
//=================================


//* MongoDB에 댓글정보 저장하기
//* req: {content,writer,videoId} -> DB 저장(저장한 comment 칼럼 반환)
router.post('/saveComment', (req, res) =>{

    const comment = new Comment(req.body)

    comment.save((err, comment)=>{
        if(err) return res.json({success: false, err})

        Comment.find({'_id': comment._id})
            .populate('writer')
            .exec((err, result)=>{
                if(err) return res.json({ success: false, err })
                res.status(200).json({ success: true, result})
            })
    })
});



//* MongoDB에서 비디오에 달린 댓글 모두 가져오기
//* req: {videoId} -> 해당 videoId에 달린 댓글 모두 가져오기
router.post('/getComments', (req, res) =>{

    Comment.find({ "videoId" : req.body.videoId })
        .populate('writer')
        .exec((err, comments)=>{
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })
 
});



module.exports = router;