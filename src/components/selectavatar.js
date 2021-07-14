import React, { useState } from "react";
import styled from "styled-components";
import { Image } from "semantic-ui-react";

const SelectionAvatar = (props) => {
  const [show, setShow] = useState(false);

  function popup() {
    setShow((prevState) => !prevState);
  }

  function onSelect(index) {
    props.onSelect(index);
    setShow((prevState) => !prevState);
  }

  return (
    <>
      <Avatar circular src={props.image} />
      <ListAvatar show={show}>
        <CloseBtn onClick={popup}>Close</CloseBtn>
        {props.images.map((avatar, index) => {
          return (
            <Avatars
              key={index}
              circular
              src={avatar}
              onClick={() => onSelect(index)}
            />
          );
        })}
      </ListAvatar>
      <OpenBtn onClick={popup}>Select</OpenBtn>
    </>
  );
};

const Avatar = styled(Image)`
  width: 10rem;
  height: 10rem;
  border: 0.4rem solid rgba(233, 133, 128, 0.5);
`;
const Avatars = styled(Image)`
  width: 5rem;
  height: 5rem;
  margin: 0.5rem;
  border: 0.1rem solid rgba(255, 255, 255, 0.5);
  &:hover {
    border: 0.2rem solid rgba(139, 0, 0, 1);
  }
`;
const ListAvatar = styled.div`
  width: 60vw;
  height: 50vh;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 20px;
  overflow: auto;
  position: absolute;
  z-index: 10;
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  flex-wrap: wrap;
  scroll-behavior: smooth;
  scroll-snap-type: none;
`;
const CloseBtn = styled.button`
  position: relative;
  left: 0.2rem;
  top: 0.2rem;
  width: 4rem;
  height: 2rem;
  border: none;
  font-size: 1rem;
  background: red;
  color: #fff;
  border-radius: 20px;
  margin-bottom: 2rem;
  position: sticky;
  z-index: 500;
  font-family: 'Ubuntu';
`;
const OpenBtn = styled.button`
  position: relative;
  font-family: 'Ubuntu';
  left: 5rem;
  bottom: 3rem;
  width: 4rem;
  height: 2rem;
  border: none;
  font-size: 1em;
  background: rgba(233, 133, 128, 1);
  color: #fff;
  border-radius: 20px;
  &:hover {
    background: rgba(233, 153, 148, 1);
  }
`;
export default SelectionAvatar;
