import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Sidebar } from "semantic-ui-react";
import { useHistory,useLocation , Switch, Route } from "react-router";

//context
import { UserContext } from "../Context/usercontext";
//import components
import MessageSection from './messagesection'
import MessageHeader from "./messageHeader";
import Userlist from "../components/userlists";
import MessageFooter from "./messagefooter";
import Adduser from './adduser'

const Chat = () => {
  let history = useHistory();
  let location = useLocation();

  const [state, dispath] = useContext(UserContext);
  const [user, setUser] = useState("");


  function handleItemClick(name) {
    if (location.pathname.includes("chat")) {
        history.push(`${location.pathname.replace("chat",name)}`)
    } else if(location.pathname.includes("contacts")) {
        history.push(`${location.pathname.replace("contacts",name)}`)
    } else if (location.pathname.includes("adduser")){
      history.push(`${location.pathname.replace("adduser",name)}`)
    }else{
      history.push(`${location.pathname}/${name}`)
    }
}

const ShowFooter = () =>{
  if (location.pathname.includes("chat")) {
    return null
  }
  return  <MessageFooter handleItemClick={handleItemClick} />
}

function getToChat(chatuser) {
  console.log(chatuser);
  setUser(chatuser)
  history.push(`${location.pathname.replace("contacts","chat")}`)
}
  return (
    <Chatbase>
      <MessageHeader />
      <Switch>
        <Route path="/:userName/chat">
          <MessageSection chatUser={user} />
        </Route>
        <Route path="/:userName/contacts">
          <Userlist  handleItemClick={handleItemClick} getToChat={getToChat}/>
        </Route>
        <Route path="/:userName/adduser">
          <Adduser />
        </Route>
      </Switch>
      {ShowFooter()}
    </Chatbase>
  );
}

const Chatbase = styled(Sidebar.Pushable)`
  min-height: 80vh;
  min-width: 80vw;
  background-color: rgba(215, 177, 157, 1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  align-items: center;
  overflow: hidden;
`;

export default Chat;
