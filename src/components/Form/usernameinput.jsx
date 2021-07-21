import { useState,useEffect } from "react";
import styled from "styled-components";
import _ from 'lodash'
import firestore from '../../database/firebase'

export const Usernameinput = (props) => {
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
    return(
        <>
        <label>USER NAME</label>
        <Input
        type="text"
        name="name"
        value={props.name}
        onChange={(e) => props.setName(e.target.value)}
        placeholder="Username"
        required
      />
      {!isExisted ? null :
      <Alert>Name already existed.</Alert>
      } 
      </>
      )
}

const Input = styled.input`
  height: 2rem;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-family: 'Ubuntu';
  margin-bottom: 1rem;
`;

const Alert = styled.h4`
  height: 2rem;
  border: none;
  color: red;
  font-family: 'Ubuntu';
  border-radius: 5px;
  text-align: center;
  margin: 0;
`;