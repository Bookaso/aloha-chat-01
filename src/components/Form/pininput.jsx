import { useState, useEffect } from "react";
import styled from "styled-components";
import firestore from "../../database/firebase";

export const Pininput = (props) => {
  const [isExisted, setIsExisted] = useState(false);

  useEffect(() => {
    const userRef = firestore.collection("users");
    const userpin = userRef.where("pin", "==", props.pin);
    userpin.get().then((querySnapshotPin) => {
      querySnapshotPin.forEach((pin) => {
        if (pin.exists) {
          setIsExisted(true);
        }
      });
    });
    return setIsExisted(false);
  }, [props.pin]);
  return (
    <>
      <label>Create invitation PIN 4 digits</label>
      <Input
        type="text"
        name="pin"
        value={props.pin === 0 ? "" : props.pin}
        maxLength="4"
        onChange={(e) => props.setPin(e.target.value)}
        placeholder="PIN"
        required
      />
      {!isExisted ? null : <Alert>PIN already existed.</Alert>}
    </>
  );
};

const Input = styled.input`
  height: 2rem;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-family: "Ubuntu";
  margin-bottom: 1rem;
`;

const Alert = styled.h4`
  height: 2rem;
  border: none;
  color: red;
  margin: 0;
  font-family: "Ubuntu";
  border-radius: 5px;
  text-align: center;
`;
