import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Image } from "semantic-ui-react";
import { UserContext } from "../Context/usercontext";
import styled from "styled-components";
import _ from "lodash";
import firestore from "../database/firebase";
import logo from "../images/logo/logo-chat.png";

const Login = () => {
  const [state, dispath] = useContext(UserContext);
  const [isExisted, setIsExisted] = useState(false);
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const userRef = firestore.collection("users");
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userpin = userRef
      .where("userName", "==", _.capitalize(name))
      .where("pin", "==", pin);
    userpin.get().then((querySnapshotPin) => {
      querySnapshotPin.forEach((user) => {
        if (user.exists) {
          console.log("success");
          dispath({
            type: "Login",
            payload: {
              userId: user.id,
              userName: user.data().userName,
              pin: user.data().pin,
              photoURL: user.data().photoURL,
              time: user.data().time,
              addedusers: user.data().addedusers,
            },
          });
          history.push("/user");
        }
      });
    });
  };

  function goToHome() {
    history.replace("/");
  }

  function goToSignUp() {
    history.push("/signup");
  }

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
      <Image src={logo} size="tiny" />
      <h2>LOG IN</h2>
      <Form onSubmit={handleSubmit}>
        <label>Enter User Name</label>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
          required
        />
        {!isExisted ? null : (
          <>
            <label>Enter your PIN</label>
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
        )}
      </Form>
      <BtnGroup>
      <EnterBtn onClick={goToHome}>Home</EnterBtn>
      <EnterBtn onClick={goToSignUp}>Sign Up</EnterBtn>
      </BtnGroup>
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
  font-family: "Ubuntu";
  margin-bottom: 1rem;
`;

const BtnGroup = styled.div`
  display: flex;
`;
const EnterBtn = styled.button`
  width: 8rem;
  height: 2rem;
  border: none;
  font-family: "Ubuntu";
  background: #c68b59;
  color: #fff;
  border-radius: 20px;
  letter-spacing: 1.4px;
  margin: 1rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  &:hover {
    background: rgba(198, 139, 89, 0.8);
  }
`;
export default Login;
