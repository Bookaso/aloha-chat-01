import React, { useState, useEffect,useRef } from "react";
import styled from "styled-components";
//import database
import firestore from "../database/firebase";

import Msg from "../components/message";

const MessageView = (props) => {
  const { currentUser } = props;
  console.log(currentUser.time);
  const [data, setData] = useState([]);
  const ref = useRef()
  useEffect(() => {
    const messageRef = firestore.collection("message")
    const query1 = messageRef.orderBy("time", "asc");
    const query =  query1.where("time",">",currentUser.time)
    query.onSnapshot((snapShot) => {
      let tempData = [];
      snapShot.forEach((doc) => {
        tempData = [
          ...tempData,
          {
            id: doc.data().user.id,
            userName: doc.data().user.userName,
            avatar: doc.data().user.Avatar,
            text: doc.data().text,
            float: currentUser.id === doc.data().user.id ? "right" : "left",
          },
        ];
      });
      setData([...data,...tempData]);
      scrollToCurrent();
    });
  }, []);

  function scrollToCurrent() {
    ref.current.scrollIntoView();
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
  width: 70vw;
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
