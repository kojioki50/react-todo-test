import { useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../button/Button";

export const Parameter = () => {
  const navigate = useNavigate();
  const onClickBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  const { id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  console.log(query);
  return (
    <SDiv>
      <SH1>パラメーターページです</SH1>
      <SP>
        id:
        {id}
      </SP>
      <SP>
        name:
        {query.get("name")}
      </SP>
      <br />
      <Button onClick={onClickBack}>戻る</Button>
    </SDiv>
  );
};
const SDiv = styled.div`
  background: #52bedf;
`;

const SH1 = styled.h1`
  margin: 0;
  color: #237254;
`;

const SP = styled.p`
  color: #2f56c0;
  margin: 20px 20px 0;
`;
