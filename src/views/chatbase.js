import React from "react";
import styled from "styled-components";

//import database
import firestore from "../database/firebase";
import firebase from "firebase/app";

//import components
import MessageView from "./message-view";
import MessageText from "../components/message-field";
import MessageHeader from "./messageHeader";

function Chat(props) {
  const { user } = props;
  console.log(user.id);

  function handleInput(text) {
    const messageRef = firestore.collection("message");
    messageRef.add({
          user: user,
          text: text,
          time: firebase.firestore.Timestamp.now().toMillis(),
        })
        .then(()=>{
          console.log("send");
        })
  }

  return (
    <Chatbase>
      <MessageHeader handleEnter={props.handleEnter} />
      <MessageView currentUser = {user}/>
      <MessageText handleInput={handleInput} />
    </Chatbase>
  );
}

const Chatbase = styled.div`
  min-height: 80vh;
  min-width: 80vw;
  background-color: rgba(215, 177, 157, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  align-items: center;
`;

export default Chat;
