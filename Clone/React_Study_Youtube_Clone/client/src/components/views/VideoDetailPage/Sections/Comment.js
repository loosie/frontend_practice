import Axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props){
    
    console.log(props.refreshFunction);
    //redux에 있는 user정보
    const user = useSelector(state => state.user); 

    const [commentValue, setcommentValue] = useState("")

    const handleClick = (event) =>{
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) =>{
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            videoId: props.videoId
        }

        Axios.post('/api/comment/saveComment', variables)
        .then(res =>{
            if(res.data.success){
                console.log(res.data);
                setcommentValue("")
                props.refreshFunction(res.data.result)
            } else{
                alert('커멘트를 저장하지 못했습니다.')
            }
        })
    }

    return (
        <div>
            <br />
            <p> Replies</p>
            <hr />

            {/* Comment Lists */}
            {props.commentLists && props.commentLists.map((comment, index)=>(
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} videoId={props.videoId} />
                        <ReplyComment parentCommentId={comment._id} commentLists={props.commentLists} videoId={props.videoId} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}
            

            {/* Root Comment Form */}

            <form style={{ display: 'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%', borderRadius: '5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해주세요"
                />        
                    
                <br />
                <button style={{ width: '20%', height: '52px'}} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment
