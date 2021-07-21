import styled from "styled-components";

import { Image } from "semantic-ui-react";
import logo from "../images/logo/logo-chat.png";

import CreateAvatar from "./createaccout";
//import usercontextprovider
import { UserContextProvider } from "../Context/usercontext"

const Welcome = () => {
  return (
    <UserContextProvider>
        <WelcomePage>
          <Image src={logo} size="small" />
          <h2>ALOHA CHAT</h2>
          <BtnGroup>
            <EnterBtn>Log In</EnterBtn>
            <EnterBtn>Sign Up</EnterBtn>
          </BtnGroup>
        </WelcomePage>
    </UserContextProvider>
  );
};

const WelcomePage = styled.div`
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
const BtnGroup = styled.div`
  display: flex;
`;
const EnterBtn = styled.button`
  width: auto;
  border: none;
  padding: 10px;
  margin: 5px;
  font-family: "Ubuntu";
  text-align: center;
  background: #c68b59;
  color: #fff;
  border-radius: 20px;
  font-size: 1rem;
  letter-spacing: 1.4px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  &:hover {
    background: rgba(198, 139, 89, 0.8);
  }
`;

export default Welcome;
