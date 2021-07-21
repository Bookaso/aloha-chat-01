import { useState, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import firestore from "../database/firebase";

const Login = () => {
  const [isExisted, setIsExisted] = useState(false);
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const userRef = firestore.collection("users");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userpin = userRef.where("pin", "==", pin);
    userpin.get().then((querySnapshotPin) => {
      querySnapshotPin.forEach((resPin) => {
        if (resPin.exists) {
          console.log("success");
        }
      });
    });
  };

  useEffect(() => {
    const user = userRef.where("userName", "==", _.capitalize(name));
    user.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          setIsExisted(true);
        }
      });
    });
    return setIsExisted(false);
  }, [name]);

  return (
    <LoginPage>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={(e) =>setName(e.target.value)}
          placeholder="Username"
          required
        />
       {!isExisted ? null :
       <>
        <Input
        type="text"
        name="pin"
        value={pin === 0 ? "" : pin}
        maxLength="4"
        onChange={(e) => setPin(e.target.value)}
        placeholder="PIN"
        required
      />
        <Button type="submit">LOG IN</Button>
        </>
      } 
      </Form>
    </LoginPage>
  );
};

const LoginPage = styled.div`
  min-height: 80vh;
  min-width: 80vw;
  background-color: rgba(215, 177, 157, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  align-items: center;
`;
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

const Input = styled.input`
  height: 2rem;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-family: 'Ubuntu';
  margin-bottom: 1rem;
`;

export default Login;
