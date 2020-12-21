import React, { useState, useEffect} from 'react'
import { Row, Col, List, Avatar } from 'antd';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId;
    const variable = { videoId: videoId };

    const [VideoDetail, setVideoDetail] = useState([]);
    const [Comments, setComments] = useState([])
    
    useEffect(() => {
        axios.post('/api/video/getVideoDetail', variable) // post : variable (videoId) > 서버에게 전송
        .then(res=> {
            if(res.data.success){
                console.log(res.data);
                setVideoDetail(res.data.videoDetail);
            }else{
                alert('비디오 정보 가져오기를 실패하였습니다')
            }
        })

        //해당 비디오 모든 Comment정보 가져오기
        axios.post('/api/comment/getComments', variable)
        .then(res =>{
            if(res.data.success){
                console.log(res.data);
                setComments(res.data.comments)
            }else{
                alert('코멘트 정보를 가져오는 것을 실패하였습니다')
            }
        })
        


    }, [])
    
    const refreshFunction = (newComment) =>{
        setComments(Comments.concat(newComment))
    }

    if(VideoDetail.writer){

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />

        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding:'3rem 4rem'}}>
                        <video style={{ width: '100%'}}  src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>

                        {/* 구독정보 받기 위해 writer._id가져오기
                         구독하기 위해 userId 가져오기 */}
                        <List.Item
                            actions={[subscribeButton]} 
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                                />

                        </List.Item>

                        {/* Comments */}
                        <Comment refreshFunction={refreshFunction} commentLists={Comments} videoId={VideoDetail._id}/>
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    }else{
        return(
        <div> loading... </div>
        )
    }
}

export default VideoDetailPage
