import React, { useState, useEffect} from 'react'
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId;
    const variable = { videoId: videoId };

    const [VideoDetail, setVideoDetail] = useState([]);
    
    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable) // post : variable (videoId) > 서버에게 전송
        .then(res=> {
            if(res.data.success){
                console.log(res.data);
                setVideoDetail(res.data.videoDetail);
            }else{
                alert('비디오 정보 가져오기를 실패하였습니다')
            }
        })
    }, [])
    

    if(VideoDetail.writer){
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding:'3rem 4rem'}}>
                        <video style={{ width: '100%'}}  src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>

                        {/* 구독정보 받기 위해 writer._id가져오기
                         구독하기 위해 userId 가져오기 */}
                        <List.Item
                            actions={[<Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />]} 
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                                />

                        </List.Item>

                        {/* Comments */}
                        <Comment />
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
