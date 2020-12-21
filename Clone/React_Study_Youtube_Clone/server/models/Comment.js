const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/** 
 * * 댓글 컬렉션 (Table)
 */
const commentSchema = mongoose.Schema({

   writer: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   postId: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   responseTo: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   content: {
       type: String
   }


}, { timestamps: true })


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }