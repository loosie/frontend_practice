import React from 'react'
import { SidebarWrapper, CloseIcon, Icon,
    SidebarContainer, SideBtnWrap, SidebarMenu,
    SidebarLink, SidebarRoute} from "./SidebarElements";

const Sidebar = ( {isOpen, toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon /> 
            </Icon>

            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="about" onClick={toggle}>
                        About
                    </SidebarLink>
                    <SidebarLink to="communication" onClick={toggle}>
                        Discover
                    </SidebarLink>
                    <SidebarLink to="freedom" onClick={toggle}>
                        Services
                    </SidebarLink>
                    <SidebarLink to="signup" onClick={toggle}>
                        Sign Up
                    </SidebarLink>
                </SidebarMenu>

                <SideBtnWrap>
                    <SidebarRoute to="/signin">
                        Sign In
                    </SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar;
