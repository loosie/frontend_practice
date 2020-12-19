const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const { ffprobe } = require('fluent-ffmpeg');

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    //* 파일 저장할 위치 
    destination: (req, file, cb)=> {
        cb(null, "uploads/");
    },
    //* 저장할 때 파일 이름 설정
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    //* 받을 수 있는 파일을 mp4만 가능하게 설정
    fileFilter: (req, file, cb) =>{
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4'){
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage : storage }).single("file");

//=================================
//             Video
//=================================


//* 비디오를 서버에 저장
//* req를 통해 비디오 파일을 받는다
router.post('/uploadfiles', (req, res) =>{

    upload(req, res, err => {
        if(err){
            return res.json({ success : false, err})
        }
        //* VideoUploadPage.js line 57로 이동 if(res.data.success)
        //* url : uploads폴더에 저장한 경로 보내줌
        //* fileName : uploads폴더에 저장한 파일 이름 보내줌
        return res.json({ success : true, url: res.req.file.path, fileName: res.req.file.filename }) 
        
    })
    
});


//* MongoDB에 비디오 저장
//* req: VideoUploadPage.onSumbit.variables
router.post('/uploadVideo', (req, res) =>{

    //* client에서 보내준 비디오 정보를 저장
    const video =  new Video(req.body)

    //* MongoDB에 저장
    video.save((err, doc) =>{
        if(err) return res.json({ success: false, err})
        res.status(200).json({ success: true})
    }) 
    
});


//* MongoDB에서 비디오 가져와서 클라이언트에 보내기
router.get('/getVideos', (req, res) =>{
    
    console.log(req.body);
    //* video collection안에 있는 모든 비디오 가져옴
    Video.find()
        .populate('writer')
        .exec((err, videos) =>{
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos})
        })

    
});

//* MongoDB에서 videoDetail에 보여줄 비디오 정보 클라이언트에 보내기
//* post인 이유 /getVideoDetail : {id} -> videoDetail정보 get
router.post('/getVideoDetail', (req, res) =>{

    console.log(req.body);

    //* video Id에 맞는 video정보 가져오기
    Video.findOne({ "_id" : req.body.videoId})
        .populate('writer') // objectId로 되어있는 해당 객체 정보 펼쳐보기
        .exec((err, videoDetail) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, videoDetail })
        })

    
});

//* 썸네일 생성하고 비디오 러닝타임 가져오기
router.post('/thumbnail', (req, res) =>{

    //* 썸네일 생성하고 비디오 러닝타임도 가져오기
    let filePath = ""
    let fileDuration = ""


    //* upload폴더에서 비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        console.dir(metadata); // all metadata
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    });

    //* 썸네일 생성
    ffmpeg(req.body.url)
        //* 비디오 썸네일 파일이름 생성
        .on('filenames', function(filenames){
            console.log('Will generate' + filenames.join(', '));
            console.log(filenames);

            filePath = "uploads/thumbnails/" + filenames[0]
        })
        //* 성공. 비디오 썸네일 생성 완료 (파일경로 ,러닝타임)
        .on('end', function(){
            console.log('Screenshots taken');
            return res.json({ success: true, url: filePath, fileDuration: fileDuration})
        })
        //* 에러 발생
        .on('error', function(err){
            console.log(err);
            return res.json({ success: false, err});
        })
        //* count : 썸네일 갯수 , folder : 썸네일 폴더 생성, size: 썸네일 크기, filename: 파일 이름 설정
        .screenshot({
            //? Will take screenshots at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            //? '%b' : input basename (filename w/o extension)
            filename: 'thumbnail-%b.png'
        })
    
});


module.exports = router;