import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../Context/usercontext";

import CreateForm from "../components/Form/form";
import SelectAvatar from "../components/Form/selectavatar";

const CreateAccout = (props) => {
  const [state, dispath] = useContext(UserContext);

  function handleEnter() {
    props.isEnter((prev) => !prev);
  }

  function handleLogout() {
    dispath({
      type: "Logout",
    });
    props.isEnter((prev) => !prev);
  }

  return (
        <CreatePage>
          <SelectAvatar />
          <CreateForm />
          <EnterBtn>BACK</EnterBtn>
        </CreatePage>
  );
};

const CreatePage = styled.div`
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

const EnterBtn = styled.button`
  width: 8rem;
  height: 2rem;
  border: none;
  font-family: "Ubuntu";
  background: #c68b59;
  color: #fff;
  border-radius: 20px;
  letter-spacing: 1.4px;
  margin-top: 2rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  &:hover {
    background: rgba(198, 139, 89, 0.8);
  }
`;

export default CreateAccout;
