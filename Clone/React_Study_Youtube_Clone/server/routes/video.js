const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");

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
    
})


module.exports = router;