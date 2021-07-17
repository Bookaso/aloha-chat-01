import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import firestore from "../database/firebase";

const MessageHeader = (props) => {
  const [onlineUser, setOnlineUser] = useState(0);

  function IsShow() {
    props.isShow();
  }

  useEffect(() => {
    const userRef = firestore.collection("users");
    userRef.onSnapshot((querySanpshot) => {
      let length = querySanpshot.docs.length;
      setOnlineUser(length);
    });
  }, []);

  return (
    <HeaderContainer>
      <Logo>CHAT</Logo>
        <BTN onlineUser={onlineUser} onClick={IsShow}>
          Online {onlineUser} users
        </BTN>
      <Back onClick={props.handleEnter}>
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
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
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

const BTN = styled.button`
  height: 50%;
  color: #fff;
  border: none;
  background: ${(props) => (props.onlineUser > 1 ? "rgb(0,100,0)": "red")};
  font-size: 1.2rem;
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
