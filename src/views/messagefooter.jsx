import React,{useState } from "react";
import { useParams, useLocation } from 'react-router-dom'
import styled from "styled-components";
import { Menu } from 'semantic-ui-react'

const MessageFooter = (props) =>{
    let activeName = useParams();
    let location = useLocation();
    let menuName = location.pathname.replace(`/${activeName.userName}/`,"")
    const [activeItem, setActiveItem] = useState(menuName);

    function handleItemClick(e,{ name }) {
        setActiveItem(name);
        props.handleItemClick(name);
    }
    return(
        <FooterContainer>
        <Menu secondary>
        <Menu.Item 
        name="contacts" 
        active={ activeItem === "contacts" }
        onClick={handleItemClick}
        >
        CONTACTS
        </Menu.Item>
        <Menu.Item 
        name="historylist"
        active={ activeItem === "historylist"}
        onClick={handleItemClick}
        >
        CHAT
        </Menu.Item>
        </Menu>
        </FooterContainer>
    )
}

const FooterContainer = styled.div`
  height: 5vh;
  width: 80vw;
  border-radius: 0 0 20px 20px;
  background: rgba(134, 84, 57, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MessageFooter;