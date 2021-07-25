import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Image } from "semantic-ui-react";
import { UserContext } from "../Context/usercontext";
import firestore from "../database/firebase";

const Chatlist = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoadind] = useState(true);
  const [state, dispath] = useContext(UserContext);

  function getToChat(user) {
    props.getToChat(user);
  }

  useEffect(() => {
    let tempLists = [];
    let tempObj = {};
    const userRef = firestore.collection(`users/${state.user.userId}/friends`);
    userRef.onSnapshot((querysnapshot) => {
      querysnapshot.forEach((doc) => {
        const msgRef = firestore.collection(
          `users/${state.user.userId}/friends/${doc.id}/message`
        );
        const msgQuery = msgRef.orderBy("time", "desc");
        msgQuery
          .limit(1)
          .get()
          .then((msgquerysnapshot) => {
            msgquerysnapshot.forEach((msg) => {
              tempObj = { user: doc.data(), message: msg.data() };
              tempLists = [...tempLists, tempObj];
            });
            setUsers(tempLists);
            setLoadind(false);
          });
      });
    });
  }, [loading]);

  function getLocalTime(milli) {
    return new Date(milli).toLocaleTimeString();
  }

  function getSubString(msg) {
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
      {!loading
        ? users.map(({ user, message }) => {
            return (
              <ListItem key={user.userId} onClick={() => getToChat(user)}>
                <div>
                  <Image avatar src={user.photoURL} />
                  {user.userName}
                </div>
                <div>
                  <p>{getSubString(message.text)}</p>
                </div>
                <div>
                  <p>{getLocalTime(message.time)}</p>
                </div>
              </ListItem>
            );
          })
        : null}
    </UserContainer>
  );
};

const UserContainer = styled.div`
  height: 70vh;
`;

const ListItem = styled.div`
  display: flex;
  width: 60vw;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  margin: 8px;
  padding: 3px;
  cursor: pointer;
  border-bottom: 0.5px solid rgba(149, 149, 149, 0.5);
  &:hover {
    position: relative;
    transform: scale(1.1);
  }
`;
const Topsection = styled.div`
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
