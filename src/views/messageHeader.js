import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { Image, Popup, Icon, Card } from "semantic-ui-react";
import { UserContext } from "../Context/usercontext";
const MessageHeader = () => {
  let history = useHistory();
  const [state, dispath] = useContext(UserContext);
  const [isClick, setIsClick] = useState(false);
  function goBack() {
    history.goBack();
  }
  const InfoCard = () => {
    return (
      <Card fluid>
        <Card.Content>
          <Image src={state.user.photoURL} avatar floated="right" size="big" />
          <Card.Header>{state.user.userName}</Card.Header>
          <Card.Description>User Name: {state.user.userName}</Card.Description>
          <Card.Description>Invitation PIN: {state.user.pin}</Card.Description>
        </Card.Content>
      </Card>
    );
  };

  function getIconChange() {
    setIsClick((prev) => !prev);
  }
  return (
    <HeaderContainer>
      <Popup
        content={InfoCard()}
        on="click"
        pinned
        onClose={getIconChange}
        onOpen={getIconChange}
        position="bottom center"
        trigger={
          <Logo>
            <Image src={state.user.photoURL} avatar />
            {state.user.userName} CHAT
            <Icon name={isClick ? "chevron up" : "chevron down"} />
          </Logo>
        }
      />
      <Back onClick={goBack}>
        <BackIcon icon="arrow-circle-left" />
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
  position: relative;
  z-index: 1000;
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
  justify-content: space-evenly;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
`;

const BackIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  margin: 10px;
  color: #fff;
`;
export default MessageHeader;
