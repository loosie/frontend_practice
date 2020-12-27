import React, {useState} from 'react'
import HeroSection from '../components/HeroSection'
import InfoSection from '../components/InfoSection'
import { HomeObjOne, HomeObjTwo, HomeObjThree } from '../components/InfoSection/Data'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

import pic1 from '../images/svg-1.svg'
import pic2 from '../images/svg-2.svg'
import pic3 from '../images/svg-3.svg'

const Home = () => {

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    };


    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <HeroSection />
            <InfoSection {...HomeObjOne} pic={pic1} />
            <InfoSection {...HomeObjTwo} pic={pic2} />
            <InfoSection {...HomeObjThree} pic={pic3} />


        </>
    )
}

export default Home;
