import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { defaultFlexCenter, fontWeight } from "./style/style";

function UserName({ user_id }) {
  const firstLetter = user_id.charAt(0);

  const colors = [
    "pink",
    "#32DBC6",
    "#FF502F",
    "#FF9D76",
    "mediumpurple",
    "#77ACF1",
    "green",
  ];
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  }, []);

  return (
    <StyledUser style={{ backgroundColor }}>
      <span>{firstLetter}</span>
    </StyledUser>
  );
}

export default UserName;
const StyledUser = styled.div`
  width: 50px;
  height: 50px;
  margin-left: 5%;
  ${defaultFlexCenter}
  border-radius: 5px;
  span {
    font-size: 24px;
    font-weight: ${fontWeight.bold};
    color: #fff;
  }
`;
