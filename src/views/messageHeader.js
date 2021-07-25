import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useLocation } from "react-router-dom";
import { Image, Popup, Icon, Card, Button } from "semantic-ui-react";
import { UserContext } from "../Context/usercontext";

const MessageHeader = () => {
  let history = useHistory();
  let location = useLocation();
  const [state, dispath] = useContext(UserContext);
  const [isClick, setIsClick] = useState(false);

  function goBack() {
    history.goBack();
  }

  function logout() {
    dispath({
      type: "Logout",
    });
    history.replace("/login");
  }

  function showBackIcon() {
    if (location.pathname.includes("chat")) {
      return (
        <Back onClick={goBack}>
          <BackIcon icon="arrow-circle-left" />
          BACK
        </Back>
      );
    }
    return null;
  }
  const InfoCard = () => {
    return (
      <Card fluid>
        <Card.Content>
          <Image src={state.user.photoURL} avatar floated="right" size="big" />
          <Card.Header>{state.user.userName}</Card.Header>
          <Card.Description>User Name: {state.user.userName}</Card.Description>
          <Card.Description>Invitation PIN: {state.user.pin}</Card.Description>
          <Button color="red" size="mini" onClick={logout}>
            Log Out
          </Button>
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
      {showBackIcon()}
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
  padding: 5px;
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
  width: 45%;
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
