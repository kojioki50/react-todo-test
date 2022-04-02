import React, { useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";

export const Page1 = () => {
  const navigate = useNavigate();
  const onClickBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  return (
    <SDiv>
      <SH1>Page1です</SH1>
      <SLink as="a" href="page1/detailA">
        カレンダー
      </SLink>
      <SLink as="a" href="page1/detailB">
        ドラッグ&ドロップ
      </SLink>
      <Button inputColor="blue" onClick={onClickBack}>
        戻る
      </Button>
    </SDiv>
  );
};

const SDiv = styled.div`
  background: #77c49a;
  margin: 0;
`;
const SH1 = styled.h1`
  margin: 0;
  color: blue;
`;

const SLink = styled.a`
  color: yellow;
  text-decoration: none;
  padding: 0 20px;
  margin: 20px 0;
  cursor: pointer;
`;
