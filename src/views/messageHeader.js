import React, { useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { Image, Dropdown } from "semantic-ui-react";
import { UserContext } from "../Context/usercontext";
const MessageHeader = () => {
  let history = useHistory();
  const [state, dispath] = useContext(UserContext);
  function goBack() {
    history.goBack();
  }

  return (
    <HeaderContainer>
      <Logo>
        <Image src={state.user.photoURL} avatar /> 
        {state.user.userName} CHAT
        <Dropdown item >
        <Dropdown.Menu>
        <Dropdown.Item>
          Test
        </Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
      </Logo>
      <Back onClick={goBack}>
        <Icon icon="arrow-circle-left" />
        BACK
      </Back>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  height: 5vh;
  width: 80vw;
  border-radius: 20px 20px 0 0;
  background: rgba(134, 84, 57, 0.5);
  overflow: hidden;
  display: flex;
  justify-content: space-between;
`;
const Back = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  margin-right: 2rem;
  cursor: pointer;
`;
const Logo = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  margin: 10px;
  color: #fff;
`;
export default MessageHeader;
