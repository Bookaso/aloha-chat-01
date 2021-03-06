import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Image, Progress } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Context/usercontext";

const SelectionAvatar = () => {
  const [state, dispath] = useContext(UserContext);
  let history = useHistory();
  const [isGet, setIsGet] = useState(true);
  const [percentage, setPercentage] = useState(20);

  function handleLogout() {
    dispath({
      type: "Logout",
    });
    history.replace("/login");
  }

  function enterChat() {
    history.replace(`/${state.user.userName}`);
  }
  useEffect(() => {
    const load = setInterval(() => {
      setPercentage((prev) => prev + 1);
    }, 30);

    if (state.user) {
      setPercentage(100);
      clearInterval(load);
    }

    setTimeout(() => {
      setIsGet(false);
      setPercentage(20);
    }, 500);
  }, [state.user]);
  return (
    <UserInfo>
      {isGet ? (
        <ProcessBar percent={percentage} inverted progress success />
      ) : (
        <>
          <Avatar src={state.user.photoURL} />
          <Namebox>{state.user.userName}</Namebox>
          <Namebox>Invitation PIN:{state.user.pin}</Namebox>
          <Button onClick={enterChat}>Enter Chat Room</Button>
          <EnterBtn onClick={handleLogout}>Log Out</EnterBtn>
        </>
      )}
    </UserInfo>
  );
};
const UserInfo = styled.div`
  min-height: 80vh;
  min-width: 80vw;
  font-family: "Ubuntu";
  background-color: rgba(215, 177, 157, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  align-items: center;
`;
const Avatar = styled(Image)`
  width: 10rem;
  height: 10rem;
`;

const ProcessBar = styled(Progress)`
  width: 200px;
`;
const Namebox = styled.div`
  height: 2rem;
  border: none;
  border-radius: 5px;
  text-align: center;
  margin: 1.25rem;
  font-size: 2rem;
  font-weight: 500;
`;

const Button = styled.button`
  background: #402218;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 0.75rem;
  letter-spacing: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  &:hover {
    background: rgba(64, 34, 24, 0.8);
  }
`;
const EnterBtn = styled.button`
  width: 8rem;
  height: 2rem;
  border: none;
  background: #c68b59;
  color: #fff;
  border-radius: 20px;
  letter-spacing: 1.4px;
  margin-top: 2rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  &:hover {
    background: rgba(198, 139, 89, 0.8);
  }
`;

export default SelectionAvatar;
