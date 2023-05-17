import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "./style/style";

function LockedButton({ setLocked }) {
  const [active, setActive] = useState(false);
  return (
    <StyledLocked>
      <label className="switch">
        <input
          className={active ? "active" : ""}
          type="checkbox"
          onClick={() => {
            setLocked((prev) => !prev);
            setActive((prev) => !prev);
          }}
        />
        <span className="slider round"></span>
      </label>
    </StyledLocked>
  );
}

export default LockedButton;

const StyledLocked = styled.div`
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 2px;
    left: 6px;
    right: 2px;
    bottom: 2px;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked.active + .slider {
    background-color: ${palette.main.vivid};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(22px);
    -ms-transform: translateX(22px);
    transform: translateX(22px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
  @media screen and (max-width: 480px) and (min-width: 230px) {
    .switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 30px;
    }
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 2px;
      left: 6px;
      right: 2px;
      bottom: 2px;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 22px;
      width: 22px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
    input:checked.active + .slider {
      background-color: ${palette.main.vivid};
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(16px);
      -ms-transform: translateX(16px);
      transform: translateX(16px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  }
`;
