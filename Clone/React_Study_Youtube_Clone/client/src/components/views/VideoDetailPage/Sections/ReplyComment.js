import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    //Dom이 load될 때 실행

    useEffect(() => {
        
        let commentNumber = 0;

        props.commentLists.map((comment) =>{
            if(comment.responseTo === props.parentCommentId){
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.commentLists]) // commentNumber값이 바뀔 때마다 실행 (commentLists(videodettail.comment)바뀔 떄마다 작동)
    
    const renderReplyComment = (parentCommentId) =>
        props.commentLists.map((comment, index) => (

            
            <React.Fragment>
                {
                    comment.responseTo === parentCommentId &&
                    <div style={{width : '80%', marginLeft: '40px'}}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} videoId={props.videoId} />
                        <ReplyComment commentLists={props.commentLists} videoId={props.videoId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </div>
                }
                
            </React.Fragment>
        ))
    
        const onHandleChange = () =>{
            setOpenReplyComments(!OpenReplyComments)

        }

    return (
        <div>

            {ChildCommentNumber >0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray'}} onClick={onHandleChange}>
                    View {ChildCommentNumber} more comment(s)
                </p>
            }


            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }
            
        </div>
    )
}

export default ReplyComment
