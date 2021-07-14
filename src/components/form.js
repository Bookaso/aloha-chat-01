import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from 'lodash'
import firestore from '../database/firebase'

const CreationForm = (props) => {
  const [isExisted, setIsExisted] = useState(false);

  useEffect(()=>{
    const userRef = firestore.collection("users");
      const user = userRef.where("userName","==",_.capitalize(props.name))
      user.get()
      .then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          if (doc.exists) {
            setIsExisted(true)
          }
        })
      })
      return(
        setIsExisted(false)
      )
  },[props.name])

  return (
    <Form onSubmit={props.handleSubmit}>
      <Input
        type="text"
        name="name"
        value={props.name}
        onChange={(e) => props.setName(e.target.value)}
        placeholder="Please enter your name"
        required
      />
      {!isExisted ? null :
      <Alert>Name already existed.</Alert>
      } 
      <Button type="submit" disabled={isExisted} >Create Avatar</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input`
  height: 2rem;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-family: 'Ubuntu';
  margin: 1.25rem;
`;
const Alert = styled.h4`
  height: 2rem;
  border: none;
  color: red;
  font-family: 'Ubuntu';
  border-radius: 5px;
  text-align: center;
  position: absolute;
  bottom: 14rem;
  right: 27vw;
`;
const Button = styled.button`
  background: rgba(64, 34, 24, 1);
  border: none;
  font-family: 'Ubuntu';
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
