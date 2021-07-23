import { useState, useContext } from "react";
import styled from "styled-components";
import _ from "lodash";
import {useHistory} from 'react-router-dom'
import { Confirm } from 'semantic-ui-react'
//DB
import firestore from '../../database/firebase'
import firebase from "firebase/app";
//components
import { Pininput } from "../Form/pininput";
import { Usernameinput } from "../Form/usernameinput";
//context
import { UserContext } from "../../Context/usercontext";

const CreationForm = () => {
  let history = useHistory();
  const [show, setshow] = useState(false);
  const [name, setName] = useState("");
  const [pin, setPin] = useState(Number);
  const [state, dispath] = useContext(UserContext);

  const handleSubmit = () => {
    const userRef = firestore.collection("users");
    userRef.add(state.user).then((resId) => {
      console.log(resId.id);
      const userUpdate = firestore.collection("users");
      userUpdate.doc(resId.id).update({userId:resId.id})
      .then(()=>{
        history.replace('/login');
      })
    });
  };

  function handleShow(e) {
    e.preventDefault();
    dispath({
      type: "CREATEUSER",
      payload: {
        userName: _.capitalize(name),
        pin: pin,
        time: firebase.firestore.Timestamp.now().toMillis(),
      },
    });
    setshow((prev)=> !prev)
  }

  return (
    <Form onSubmit={handleShow}>
      <Usernameinput name={name} setName={setName} />
      <Pininput pin={pin} setPin={setPin} />
      <Button type="submit">Create Account</Button>
      <Confirm 
        open={show}
        header="Please remember your information"
        content={`User name : ${name} PIN:${pin}`}
        cancelButton="Cancel"
        confirmButton="Create Account"
        onCancel={handleShow}
        onConfirm={handleSubmit}
      />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Button = styled.button`
  background: rgba(64, 34, 24, 1);
  border: none;
  font-family: "Ubuntu";
  border-radius: 5px;
  color: #fff;
  padding: 0.75rem;
  letter-spacing: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  &:hover {
    background: rgba(64, 44, 24, 1);
  }
`;

export default CreationForm;
