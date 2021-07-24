import React, { useState, useEffect,useRef } from "react";
import styled from "styled-components";
//import database
import firestore from "../database/firebase";

import Msg from "../components/message";

const MessageView = (props) => {
  const { currentUser,chatUser } = props;
  console.log("current",currentUser);
  console.log("chat",chatUser);
  const [data, setData] = useState([]);
  const ref = useRef()
  useEffect(() => {
    const messageRef = firestore.collection(`users/${currentUser.userId}/friends/${chatUser.userId}/message`);
    const query1 = messageRef.orderBy("time","asc");
    query1.onSnapshot((snapShot) => {
      let tempData = [];
      snapShot.forEach((doc) => {
        console.log(doc.data());
        tempData = [
          ...tempData,
          {
            id: doc.data().user.userId,
            userName: doc.data().user.userName,
            avatar: doc.data().user.photoURL,
            text: doc.data().text,
            time: new Date(doc.data().time).toLocaleTimeString(),
            float: currentUser.userId === doc.data().user.userId ? "right" : "left",
          },
        ];
      });
      setData([...data,...tempData]);
      scrollToCurrent();
    });
  }, []);

  function scrollToCurrent() {
    ref.current.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <MsgField id="MsgField">
      <Msgbox>
        {data.map((item) => (
          <Msg kye={item.id} data={item} />
        ))}
        <p ref={ref}></p>
      </Msgbox>
    </MsgField>
  );
};

const MsgField = styled.div`
  background: #fff;
  height: 70vh;
  width: 80vw;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: auto;
`;
const Msgbox = styled.div`
  width: 100%;
  max-height: 100%;
  /* background: #000; */
  display: flex;
  flex-direction: column;
`;

export default MessageView;
