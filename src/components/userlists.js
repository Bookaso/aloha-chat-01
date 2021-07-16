import React, { useEffect, useState } from "react";
import { Sidebar, Menu, Image } from "semantic-ui-react";

import firestore from "../database/firebase";

const Userlist = (props) => {
  const { isShow } = props;
  const [users, setUsers] = useState();
  useEffect(() => {
    const userRef = firestore.collection("users");
    const query = userRef.orderBy("time", "asc");
    query.onSnapshot((querySanpshot) => {
      let tempLists = [];
      querySanpshot.forEach((snapshot) => {
        tempLists = [...tempLists, snapshot.data()];
      });
      setUsers(tempLists);
    });
  }, []);
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      vertical
      direction="left"
      visible={isShow}
      width="thin"
    >
      {users
        ? users.map((user,index) => {
            return(
            <Menu.Item key={index} >
              <Image src={user.photoURL} avatar />
              {user.userName}
            </Menu.Item>
            )
          })
        : null}
    </Sidebar>
  );
};

export default Userlist;
