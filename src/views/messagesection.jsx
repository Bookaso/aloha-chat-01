import React, { useContext } from "react";
import MessageView from "./message-view";
import MessageText from "../components/message-field";
//import database
import firestore from "../database/firebase";
import firebase from "firebase/app";
//context
import { UserContext } from "../Context/usercontext";

const Messagesection = (props) => {
  const [state, dispath] = useContext(UserContext);

  function handleInput(text) {
    const messageRef = firestore.collection(
      `users/${state.user.userId}/friends/${props.chatUser.userId}/message`
    );
    messageRef
      .add({
        user: state.user,
        text: text,
        time: firebase.firestore.Timestamp.now().toMillis(),
      })
      .then(() => {
        console.log("send");
        const resMessageRef = firestore.collection(
          `users/${props.chatUser.userId}/friends/${state.user.userId}/message`
        );
        resMessageRef.add({
          user: state.user,
          text: text,
          time: firebase.firestore.Timestamp.now().toMillis(),
        });
      });
  }

  return (
    <>
      <MessageView currentUser={state.user} chatUser={props.chatUser} />
      <MessageText handleInput={handleInput} />
    </>
  );
};
export default Messagesection;
