import React,{useState} from "react";
import styled from "styled-components";
import { Sidebar } from "semantic-ui-react";
import { useIdleTimer } from 'react-idle-timer'

//import database
import firestore from "../database/firebase";
import firebase from "firebase/app";

//import components
import MessageView from "./message-view";
import MessageText from "../components/message-field";
import MessageHeader from "./messageHeader";
import Userlist from "../components/userlists";

function Chat(props) {
  const { user } = props;
  const [isShow, setIsShow] = useState(false);
  const [time, setTime] = useState(1000*60*30);

  function IsShow() {
    setIsShow((prev) => !prev)
  }

  function handleInput(text) {
    const messageRef = firestore.collection("message");
    messageRef
      .add({
        user: user,
        text: text,
        time: firebase.firestore.Timestamp.now().toMillis(),
      })
      .then(() => {
        console.log("send");
      });
  }

  function handleIdle() {
    props.handleEnter()
    props.handleLogout()
  }

  function resetTime() {
    setTime(1000*60*30)
  }
  useIdleTimer({
    timeout: time,
    onIdle:handleIdle,
    onAction:resetTime,
    onActive:resetTime,
  })
  return (
    <Chatbase>
      <Userlist isShow={isShow}/>
      <Sidebar.Pusher>
      <MessageHeader handleEnter={props.handleEnter} isShow={IsShow}/>
      <MessageView currentUser={user} />
      <MessageText handleInput={handleInput} />
      </Sidebar.Pusher>
    </Chatbase>
  );
}

const Chatbase = styled(Sidebar.Pushable)`
  min-height: 80vh;
  min-width: 80vw;
  background-color: rgba(215, 177, 157, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  align-items: center;
  overflow: hidden;
`;


export default Chat;
