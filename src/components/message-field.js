import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const MessageText = (props) => {
  const [text, setText] = useState("");
  const [isFocus, setIsFocus] = useState(true);
  const inputBox = useRef();

  function handleInput(e) {
    if (text) {
      e.preventDefault();
      props.handleInput(text);
      setText("");
    }
  }

  useEffect(() => {
    inputBox.current.addEventListener("keydown", (e) => {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
      }
    });
  }, []);
  return (
    <InputContainer>
      {isFocus ? (
        <>
          <Icon icon="plus" />
          <Icon icon="smile" />
        </>
      ) : (
        <Icon icon="angle-right" />
      )}
      <InputText
        ref={inputBox}
        placeholder="Say somthing"
        value={text}
        onChange={(e) => {
          e.preventDefault();
          setText(e.target.value);
        }}
        onFocus={() => setIsFocus(false)}
        onBlur={() => setIsFocus(true)}
      />
      <Icon
        id="send"
        icon="paper-plane"
        style={{ color: text ? "RGB(73, 251, 53)" : "white" }}
        onClick={handleInput}
      />
    </InputContainer>
  );
};

const InputText = styled.textarea`
  height: 70%;
  width: 70%;
  resize: none;
  outline: none;
  font-family: "Ubuntu";
  border: none;
  overflow: auto;
  font-size: 1.2em;
`;

const InputContainer = styled.div`
  height: 5vh;
  width: 80vw;
  border-radius: 0 0 20px 20px;
  background: rgba(134, 84, 57, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Icon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  margin: 10px;
  color: #fff;
  &:hover {
    color: #d2d2d2;
  }
`;

export default MessageText;
