import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";

import CreateForm from "../components/form";
import SelectAvatar from "../components/selectavatar";
import UserInfo from "./userinfo";

import firestore from "../database/firebase";
import firebase from "firebase/app";

const CreateAvatar = (props) => {
  const [images, setImages] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(true);
  const [userId, setUserId] = useState({});
  const [name, setName] = useState("");

  useEffect(() => {
    const lists = listImages();
    const num = Math.floor(Math.random() * 20);
    setAvatar(images[num]);
    setImages(lists);
    setLoading(false);
  }, [isLoading]);

  function listImages() {
    let temp = [];
    for (let i = 0; i <= 20; i++) {
      temp.push(`/Avatars/avatar_${i}.png`);
    }
    return temp;
  }
  function selectedAvatar(index) {
    setAvatar(images[index]);
  }

  function handleEnter() {
    props.isEnter((prev) => !prev);
  }

  function handleLogout(Id) {
    const userRef = firestore.collection("users");
    userRef
      .doc(Id)
      .delete()
      .then(() => {
        setIsAdded((prev) => !prev);
        setName("");
      });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userRef = firestore.collection("users");
    userRef
      .add({
        userName: _.capitalize(name),
        photoURL: avatar,
        time: firebase.firestore.Timestamp.now().toMillis(),
      })
      .then((resId) => {
        setUserId(resId.id);
        setTimeout(() => {
          setIsAdded(false);
        }, 300);
      });
  };

  return (
    <>
      {isAdded ? (
        <CreatePage>
          {isLoading ? null : (
            <>
              <SelectAvatar
                image={avatar}
                images={images}
                onSelect={selectedAvatar}
              />
              <CreateForm
                avatar={avatar}
                setName={setName}
                name={name}
                handleSubmit={handleSubmit}
              />
            </>
          )}
          <EnterBtn onClick={handleEnter}>BACK</EnterBtn>
        </CreatePage>
      ) : (
        <UserInfo userId={userId} logout={handleLogout} />
      )}
    </>
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

export default CreateAvatar;
