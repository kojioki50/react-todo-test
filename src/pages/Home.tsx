import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Home = () => {
  const linkStyle = {
    display: "block",
    marginTop: "20px",
    marginLeft: "20px",
    color: "yellow",
    fontSize: "20px",
    textDecoration: "none",
  };
  const linkStyle2 = {
    display: "block",
    marginTop: "20px",
    marginLeft: "20px",
    paddingBottom: "20px",
    color: "yellow",
    fontSize: "20px",
    textDecoration: "none",
  };

  return (
    <SDiv>
      <SH1>Homeです</SH1>
      <Link to="/page1" style={linkStyle}>
        Page1
      </Link>
      <br />
      <Link to="/page2" style={linkStyle2}>
        Page2
      </Link>
    </SDiv>
  );
};

const SH1 = styled.h1`
  margin: 0;
  color: blue;
`;

const SDiv = styled.div`
  background: #77c49a;
  margin: 0;
  height: auto;
`;
