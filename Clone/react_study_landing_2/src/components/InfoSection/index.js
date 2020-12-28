import React from 'react'
import { InfoContainer, InfoWrapper, InfoRow,
    Column1, Column2, TextWrapper, TopLine, Heading,
    Subtitle, BtnWrap, ImgWrap, Img} from './InfoElements'
import { Button } from "../ButtonElement";




const InfoSection = ({lightBg, id, imgStart, topLine, lightText,
headLine, lightTextDesc, description, buttonLabel, img, pic, alt, primary, dark, dark2, btn}) => {
    return (
        <>
            <InfoContainer lightBg={lightBg} id={id}>
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1>
                        <TextWrapper>
                            <TopLine>{topLine}</TopLine>
                            <Heading lightText={lightText}>{headLine}</Heading>
                            <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
                            <BtnWrap>
                                <Button to='home'
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact="true"
                                offset={-80}
                                primary={primary ? 1 : 0}
                                dark={dark ? 1 : 0}
                                dark2={dark2 ? 1 : 0}
                                btn='true'
                                >
                                {buttonLabel}
                                </Button>
                            </BtnWrap>
                        </TextWrapper>
                        </Column1>

                        <Column2>
                            <ImgWrap>
                                <Img src={pic} alt={alt}/>
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>    
        </>
    )
}

export default InfoSection
