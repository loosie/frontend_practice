import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Row, Typography } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

    //* Video정보 state에 저장
    const [Video, setVideo] = useState([])

    //* React Hooks : useEffect === class component : componetDidMount
    useEffect(() =>{

        axios.get('/api/video/getVideos')
            .then(res=>{
                if(res.data.success){
                    console.log(res.data);
                    setVideo(res.data.videos)
                }else{
                    alert('비디오 가져오기를 실패 했습니다.')
                }
            })
    }, [])

    

    //* 몽고 DB에서 비디오 가져오기
    const renderCards = Video.map((video, index)=>{

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes *60));

        return <Col lg={6} md={8} xs={24}>
                    <div style={{ position: 'relative'}}>
                        <a href={`/video/${video._id}`}>
                            <img style={{ width: '100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                            <div className="duration">
                                {/*  style={{  bottom: 0, right: 0, position: 'absolute', margin: '4px',
                                 color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8,
                                 padding: '2px 4px', borderRadius: '2px', letterSpacing: '0.5px',
                                 fontSize: '12px', fontWeight: '500', lineHeight: '12px'}}> */}
                                    <span>{minutes} : {seconds}</span>
                            </div>
                        </a>
                    </div>
                    <br />
                    <Meta
                        avatar={
                        <Avatar src={video.writer.image} />
                        }
                        title={video.title}
                        description=""
                    />
                    <span>{video.writer.name} </span><br />
                    <span style={{ marginLeft: '3rem' }}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span><br />
                </Col>

    })

    return (
        <div style ={{ width: '85%', margin: '3rem auto'}}>
            <Title level={2}> Recommended </Title>
            <hr />

           {/* antdesing Row, Col */}
            <Row gutter={[32, 16]}>

                {renderCards}
          


            </Row>

        </div>
    )
}

export default LandingPage
