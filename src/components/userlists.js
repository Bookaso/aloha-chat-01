import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { List, Image, Button } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../Context/usercontext";
import firestore from "../database/firebase";

const Userlist = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoadind] = useState(true);
  const [state, dispath] = useContext(UserContext);

  function handleItemClick() {
    props.handleItemClick("adduser");
  }

  function getToChat(user) {
    props.getToChat(user);
  }

  useEffect(() => {
    let tempLists = [];
    setUsers([]);
    const userRef = firestore.collection(`users/${state.user.userId}/friends`);
    userRef.onSnapshot((querysnapshot) => {
      querysnapshot.forEach((doc) => {
        tempLists = [...tempLists, doc.data()];
      });
      setUsers(tempLists);
      setLoadind(false);
    });
  }, [loading]);
  return (
    <UserContainer>
      <Topsection>
        <Input size="mini" placeholder="Search..." />
        <AddIcon icon="user-plus" onClick={handleItemClick} />
      </Topsection>
      <ListConstainer selection divided verticalAlign="middle" size="massive">
        {!loading
          ? users.map((user) => {
              return (
                <ListConstainer.Item
                  key={user.userId}
                  onClick={() => getToChat(user)}
                >
                  <ListConstainer.Content floated="right">
                    <Button>Friend</Button>
                  </ListConstainer.Content>
                  <Image avatar src={user.photoURL} />
                  <ListConstainer.Content>
                    <ListConstainer.Header>
                      {user.userName}
                    </ListConstainer.Header>
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
const AddIcon = styled(FontAwesomeIcon)`
  &:hover {
    color: #50cb93;
  }
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

export default Userlist;
