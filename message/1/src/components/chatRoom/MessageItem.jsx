import React from "react";
import styled from "styled-components";

function MessageItem({ message }) {
  const { content, time, from } = message;

  return (
    <StyledMessageItem>
      <span>
        {from}: {content}
      </span>
      <span className="time">{time}</span>
    </StyledMessageItem>
  );
}

export default React.memo(MessageItem);

const StyledMessageItem = styled.div`
  display: flex;
`;
