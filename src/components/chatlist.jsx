import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { List, Image, Button } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../Context/usercontext";
import firestore from "../database/firebase";

const Chatlist = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoadind] = useState(true);
  const [state, dispath] = useContext(UserContext);
  const { userName } = useParams();

  function getToChat(user) {
    props.getToChat(user);
  }

  useEffect(() => {
    let tempLists = [];
    let tempObj = {};
    const userRef = firestore.collection(`users/${state.user.userId}/friends`);
    userRef
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          console.log(doc.data());
          console.log(doc.id);

          const msgRef = firestore.collection(
            `users/${state.user.userId}/friends/${doc.id}/message`
          );
          const msgQuery = msgRef.orderBy("time", "desc");
          msgQuery
            .limit(1)
            .get()
            .then((msgquerysnapshot) => {
              msgquerysnapshot.forEach((msg) => {
                console.log("chatlist", msg.data());
                tempObj = { user: doc.data(), message: msg.data() };
                tempLists = [...tempLists, tempObj];
                setUsers(tempLists);
              });
            });
        });
      })
      .then(() => {
        setLoadind(false);
      });
    console.log(users);
  }, [loading]);

  function getLocalTime(milli) {
    return new Date(milli).toLocaleTimeString();
  }

  function getSubString(msg) {
    console.log("sunstring called");
    if (msg.length > 13) {
      return `${msg.substring(0, 13)}...`;
    }
    return msg;
  }
  return (
    <UserContainer>
      <Topsection>
        <Input size="mini" placeholder="Search..." />
      </Topsection>
      <ListConstainer selection divided size="big">
        {!loading
          ? users.map((user) => {
              return (
                <ListConstainer.Item
                  key={user.user.userId}
                  onClick={() => getToChat(user)}
                >
                  <ListConstainer.Content floated="right">
                    <ListConstainer.Description>
                      {getLocalTime(user.message.time)}
                    </ListConstainer.Description>
                  </ListConstainer.Content>
                  <ListConstainer.Content floated="left">
                    <Image avatar src={user.user.photoURL} />
                    <ListConstainer.Header>
                      {user.user.userName}
                    </ListConstainer.Header>
                  </ListConstainer.Content>
                  <ListConstainer.Content>
                    <ListConstainer.Description>
                      {getSubString(user.message.text)}
                    </ListConstainer.Description>
                  </ListConstainer.Content>
                </ListConstainer.Item>
              );
            })
          : null}
      </ListConstainer>
    </UserContainer>
  );
};

const ListConstainer = styled(List)`
  width: 70vw;
`;
const UserContainer = styled.div`
  height: 70vh;
`;
const Topsection = styled.div`
  /* height: 5vh; */
  font-size: 1.5rem;
`;
const Input = styled.input`
  height: 2rem;
  width: 150px;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-family: "Ubuntu";
  margin: 1rem;
`;

export default Chatlist;
