const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/** 
 * * 비디오 컬렉션 (Table)
 */
const videoSchema = mongoose.Schema({

    writer: {
        //* User 스키마 정보 불러오기
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    privacy: {
        type: Number
    },
    filePath: {
        type: String
    },
    category: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }


}, { timestamps: true })


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }