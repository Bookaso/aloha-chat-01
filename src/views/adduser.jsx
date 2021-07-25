import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Context/usercontext";
import firestore from "../database/firebase";
import { Card, Button, Image } from "semantic-ui-react";

const Adduser = () => {
  const [state, dispath] = useContext(UserContext);
  let history = useHistory();
  const [user, setUser] = useState(null);
  const [pin, setPin] = useState(Number);

  function search(e) {
    e.preventDefault();
    setUser(null);
    const userRef = firestore.collection("users");
    const queryuser = userRef
      .where("pin", "==", pin);
    queryuser.get().then((querysnapshot) => {
      querysnapshot.forEach((doc) => {
        console.log(doc.data());
        if (doc.exists) {
          setUser(() => doc.data());
        }
      });
    });
    setPin("");
  }

  function handleAdd() {
    console.log(state.user.userId);
    const userRef = firestore.collection("users").doc(state.user.userId);
    const query = userRef.collection("friends");
    query
      .doc(user.userId)
      .set(user)
      .then(() => {
        console.log("Added");
        const foundRef = firestore.collection("users").doc(user.userId);
        const query1 = foundRef.collection("friends");
        query1
          .doc(state.user.userId)
          .set(state.user)
          .then(() => {
            console.log("Added to founded");
            history.goBack();
          });
      });
  }

  function handleDelte() {
    setUser(null);
  }
  return (
    <AddContainer>
      <Form onSubmit={search}>
        <label>Search by PIN</label>
        <Input
          type="text"
          name="pin"
          value={pin === 0 ? "" : pin}
          maxLength="4"
          onChange={(e) => setPin(e.target.value)}
          placeholder="PIN"
          required
        />
        <EnterBtn type="submit">SEARCH</EnterBtn>
      </Form>
      {user ? (
        <Card>
          <Card.Content>
            <Image size="tiny" src={user.photoURL} />
            <Card.Header>{user.userName}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <Button basic color="red" onClick={handleDelte}>
              DELETE
            </Button>
            <Button basic color="green" onClick={handleAdd}>
              ADD
            </Button>
          </Card.Content>
        </Card>
      ) : null}
    </AddContainer>
  );
};
const AddContainer = styled.div`
  /* width: 70vw; */
  height: 70vh;
  display: flex;
  flex-direction: column;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  height: 2rem;
  width: 20rem;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-family: "Ubuntu";
  margin-bottom: 1rem;
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

export default Adduser;
