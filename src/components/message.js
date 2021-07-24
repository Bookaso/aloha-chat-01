import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
const Msg = (props) => {
  const data = props.data;

  return (
    <>
      <Msgcontainer key={data.id}>
        <Msginfo float={data.float}>
          <Info float={data.float}>
            <Avatar src={data.avatar} style={{ margin: "5px" }} />
            <p>{data.userName}</p>
          </Info>
          <Body float={data.float}>
            <p>{data.text}</p>
          </Body>
          <Time float={data.float}>
          <p>{data.time}</p>
        </Time>
        </Msginfo>
        
      </Msgcontainer>
    </>
  );
};

const Msgcontainer = styled.div`
  width: 100%;
  height: fit-content;
  font-family: "Ubuntu";
  /* color: #fff; */
`;

const Msginfo = styled.div`
  width: 70%;
  height: fit-content;
  padding: 4px 0;
  /* background: green; */
  float: ${(props) => props.float};
`;

const Info = styled.div`
  font-size: 1rem;
  line-height: 0%.4;
  display: flex;
  font-family: "Ubuntu";
  color: black;
  align-items: center;
  flex-direction: ${(props) =>
    props.float === "right" ? "row-reverse" : "row"};
`;

const Body = styled.div`
  background: rgba(134, 84, 57, 0.7);
  float: ${(props) => props.float};
  width: fit-content;
  font-size: 0.9rem;
  font-family: "Ubuntu";
  line-height: 0.4;
  color: black;
  display: flex;
  text-align: left;
  align-items: center;
  border-radius: 1rem;
  padding: 1.125em 1.5em;
  ${(props) =>
    props.float === "right"
      ? `
    flex-direction: row-reverse;
    margin-right: 50px;
    `
      : `
     "flex-direction: row";
      margin-left: 50px;
    `}
`;
const Time = styled.div`
  float: ${(props) => props.float};
  width: fit-content;
  font-size: 0.5rem;
  font-family: "Ubuntu";
  line-height: 0.4;
  color: black;
  position: relative;
`;

export default Msg;
