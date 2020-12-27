import React, {useState} from 'react'
import { HeroBg, HeroContainer, VideoBg,
        HeroContent, HeroH1, HeroP, HeroBtnWrapper,
        ArrowForward, ArrowRight } from './HeroElements'
import { Button } from "../ButtonElement";
import Video from '../../videos/video.mp4'

const HeroSection = () => {
    const [hover, setHover] = useState(false);

    const onHover = () =>{
        setHover(!hover)
    }

    return (
        <HeroContainer id="home">
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </HeroBg>
            <HeroContent>
                <HeroH1>
                    Paint your own dot on the world
                </HeroH1>
                <HeroP>
                    아티스트 브랜딩 콘텐츠 커뮤니티 블루닷에 오신 것을 환영합니다!
                </HeroP>
                <HeroBtnWrapper>
                    <Button to="signup" 
                    onMouseEnter={onHover}
                    onMouseLeave={onHover}
                    primary='true'
                    white='true'
                    >
                    Get Started {hover? <ArrowForward /> : <ArrowRight />}
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection
