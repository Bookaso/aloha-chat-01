import React,{useState,useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom'
import styled from "styled-components";
import { Menu } from 'semantic-ui-react'

const MessageFooter = (props) =>{
    const [activeItem, setActiveItem] = useState("contacts");
    let location = useLocation();
    let history = useHistory();

    function handleItemClick(e,{ name }) {
        console.log(name);
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