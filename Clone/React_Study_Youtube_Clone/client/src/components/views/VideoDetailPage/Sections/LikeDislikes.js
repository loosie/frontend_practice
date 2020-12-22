import React, { useEffect, useState } from 'react'
import Icon, { LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled} from '@ant-design/icons';
import Axios from 'axios';
import { Tooltip } from 'antd';

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable = { }

    console.log(props.videoId);
    if(props.videoId){
        variable = {videoId: props.videoId , userId: props.userId }
    }else{
        variable = {commentId: props.commentId, userId: props.userId }
    }

    useEffect(() => {
       Axios.post('/api/like/getLikes', variable)
        .then(res=>{
            if(res.data.success){
                //좋아요 받은 갯수
                setLikes(res.data.likes.length)

                //유저가 해당 좋아요를 누른 상태인지
                res.data.likes.map(like =>{
                    if(like.userId === props.userId){
                        setLikeAction('liked')
                    }
                })

            }else{
                alert('Likes에 정보를 가져오지 못했습니다.')
            }
        })

        Axios.post('/api/like/getDislikes', variable)
        .then(res=>{
            if(res.data.success){
                //싫어요 받은 갯수
                setDislikes(res.data.dislikes.length)

                //유저가 해당 싫어요 누른 상태인지
                res.data.dislikes.map(like =>{
                    if(like.userId === props.userId){
                        setDislikeAction('disliked')
                    }
                })

            }else{
                alert('Dislikes에 정보를 가져오지 못했습니다.')
            }
        })
    }, [])

    const onLike = () =>{
        if(LikeAction === null ){
            Axios.post('/api/like/upLike', variable)
                .then(res =>{
                    if(res.data.success){
                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        if(DislikeAction !== null ){
                            setDislikeAction(null)
                            setDislikes(Dislikes -1 )
                        }
                    }else{
                        alert('Like를 올리지 못하였습니다.')
                    }
                })
        }else{
            Axios.post('/api/like/unLike', variable)
                .then(res =>{
                    if(res.data.success){
                        setLikes(Likes -1)
                        setLikeAction(null)
                        
                    }else{
                        alert('Like를 내리지 못하였습니다.')
                    }
                })
        }
    }

    const onDislike = () =>{
        if(DislikeAction !== null ){

            // 싫어요 취소
            Axios.post('/api/like/unDislike', variable)
                .then(res =>{
                    if(res.data.success){
                        setDislikes(Dislikes -1)
                        setDislikeAction(null)
                    }else{
                        alert('dislike를 지우지 못하였습니다.')
                    }
                })
        }else{
            // 싫어요 
            Axios.post('/api/like/upDislike', variable)
                .then(res =>{
                    if(res.data.success){
                        setDislikes(Dislikes +1)
                        setDislikeAction('disliked')

                        if(LikeAction !== null){
                            setLikeAction(null)
                            setLikes(Likes -1)
                        }

                    }else{
                        alert('Like를 내리지 못하였습니다.')
                    }
                })
        }
    }



    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                {/* <LikeOutlined 
                    theme='filled'
                    onClick={onLike}/> */}
                    {LikeAction===null &&
                        <LikeOutlined onClick={onLike} />
                    }
                    {LikeAction==='liked' &&
                        <LikeFilled onClick={onLike} />    
                    }
                    
                    
                </Tooltip>
                <span style={{ paddingLeft:'8px', cursor:'auto'}}> {Likes} </span>
            </span>
            
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    {DislikeAction===null &&
                        <DislikeOutlined onClick={onDislike}/>                    
                    }
                    {DislikeAction==='disliked' &&
                        <DislikeFilled onClick={onDislike}/>
                    }
            
                </Tooltip>
                <span style={{ paddingLeft:'8px', cursor:'auto'}}> {Dislikes} </span>
            </span>
        </div>
    )
}

export default LikeDislikes
