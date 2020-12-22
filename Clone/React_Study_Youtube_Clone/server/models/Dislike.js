const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/** 
 * * 싫아어 컬렉션 (Table)
 */
const dislikeSchema = mongoose.Schema({

    userId: {
        type : Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type : Schema.Types.ObjectId,
        ref: 'Comment'
    },
    videoId: {
        type : Schema.Types.ObjectId,
        ref: 'Video'
    }
  

}, { timestamps: true })


const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = { Dislike }