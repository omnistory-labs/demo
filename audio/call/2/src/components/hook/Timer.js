import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { defaultFlexCenter, fontSize } from "../../style/style";

export default function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds < 59) {
        setSeconds((prevSeconds) => prevSeconds + 1);
      } else {
        if (minutes < 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
        } else {
          setMinutes(0);
        }
        setSeconds(0);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <StyledTimer>
      <div>
        <h2>
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </h2>
      </div>
    </StyledTimer>
  );
}

const StyledTimer = styled.div`
  position: absolute;
  top: 54%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  ${defaultFlexCenter}
  div {
    h2 {
      font-size: ${fontSize.large};
      color: rgba(255, 255, 255, 0.6);
    }
  }
`;
