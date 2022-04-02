/* eslint-disable no-unused-vars */
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";

export const Calender = () => {
  const navigate = useNavigate();
  return (
    <SDiv>
      <SH1>カレンダーです</SH1>
      <DayPicker />
      <br />
      <Button onClick={() => navigate(-1)}>戻る</Button>
    </SDiv>
  );
};

const SDiv = styled.div`
  background: black;
  margin: 0;
`;

const SH1 = styled.h1`
  margin: 0;
  color: #9393f0;
`;
