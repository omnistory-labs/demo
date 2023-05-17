import React from "react";
import styled from "styled-components";
import { fontSize, palette } from "./style";

export const CallListBtn = ({
  text,
  handleOfferCall,
  setRingingToggle,
  setOfferCallToggle,
}) => {
  return (
    <StyledButton
      type="button"
      onClick={() => {
        handleOfferCall();
        setRingingToggle(true);
        setOfferCallToggle(false);
      }}
    >
      {text}
    </StyledButton>
  );
};

export const CreateSessionBtn = ({ text, handleCreateSession }) => {
  return (
    <StyledButton type="button" onClick={handleCreateSession}>
      {text}
    </StyledButton>
  );
};

export const DisabledBtn = ({ text }) => {
  return <StyledDisabled>{text}</StyledDisabled>;
};

const StyledButton = styled.button`
  position: absolute;
  bottom: 30px;
  right: 40px;
  width: 100px;
  height: 36px;
  color: ${palette.white};
  font-size: ${fontSize.small};
  cursor: pointer;
  border: 0;
  border-radius: 5px;
  background-color: ${palette.main.default};
`;

const StyledDisabled = styled.button`
  position: absolute;
  bottom: 30px;
  right: 40px;
  width: 100px;
  height: 36px;
  color: ${palette.gray.middle};
  font-size: ${fontSize.small};
  border: 0;
  border-radius: 5px;
`;
