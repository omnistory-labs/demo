import React from "react";
import styled from "styled-components";
import {
  defaultFlexCenter,
  defaultInput,
  fontSize,
  fontWeight,
  palette,
} from "../style/style";
import { CreateSessionBtn, DisabledBtn } from "../style/DemoBtn";

export default function CreateSession({
  handleCreateSession,
  handleChange,
  isValid,
}) {
  return (
    <StyledContents>
      <form className="call_form">
        <h3>Video Call</h3>
        <div className="dot_wrap">
          <span className="dot_active"> </span>{" "}
          <span className="hyphen"> </span>
          <span className="dot"> </span> <span className="hyphen"> </span>
          <span className="dot"> </span> <span className="hyphen"> </span>
          <span className="dot"> </span>
        </div>
        <label htmlFor="createSession">번호 등록</label>
        <input
          type="text"
          name="createSession"
          placeholder="번호를 등록해 주세요."
          onChange={handleChange}
        />
        <p>
          {" "}
          <span>* </span>특수문자를 제외한 숫자, 문자, 이메일 주소 등을
          입력하세요.
        </p>
        <div className="camera_icon">
          <video />
          <img
            src="https://user-images.githubusercontent.com/120351058/217710092-49584d9b-0798-427f-bc5c-6e0ce1285625.png"
            alt="camera"
          />
        </div>
        {!isValid ? (
          <DisabledBtn text="번호등록" disabled />
        ) : (
          <CreateSessionBtn
            text="번호등록"
            handleCreateSession={handleCreateSession}
          />
        )}
      </form>
    </StyledContents>
  );
}
const StyledContents = styled.div`
  width: 100%;
  .call_form {
    width: 800px;
    height: 800px;
    margin: 0 auto;
    padding: 40px;
    border-radius: 15px;
    background-color: ${palette.white};
    box-shadow: ${palette.shadow};
    position: relative;
    overflow: hidden;
    h3 {
      text-align: center;
      margin-bottom: 20px;
      font-size: 1.5rem;
      font-weight: ${fontWeight.medium};
    }
    .dot_wrap {
      margin-bottom: 40px;
      ${defaultFlexCenter}
      .dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin: 0;
        border-radius: 100px;
        background-color: ${palette.gray.bright};
      }
      .dot_active {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin: 0;
        border-radius: 100px;
        background-color: ${palette.main.default};
      }
      .hyphen {
        display: inline-block;
        width: 20px;
        height: 2px;
        margin: 0;
        background-color: ${palette.gray.bright};
      }
      .hyphen_active {
        display: inline-block;
        width: 20px;
        height: 2px;
        margin: 0;
        background-color: ${palette.main.default};
      }
    }
    label,
    h4 {
      display: inline-block;
      width: 100%;
      margin: 0;
      margin-bottom: 20px;
      text-align: start;
      font-weight: ${fontWeight.regular};
      font-size: ${fontSize.regular};
    }
    input {
      ${defaultInput}
      width: 100%;
      padding-left: 10px;
      border: 0;
      background-color: ${palette.gray.boxColor};
      ::placeholder {
        font-size: ${fontSize.micro};
      }
    }
    p {
      padding-left: 14px;
      position: relative;
      color: ${palette.text.default};
      text-align: start;
      span {
        position: absolute;
        top: 0;
        left: 0;
        font-size: ${fontSize.medium};
        color: ${palette.main.default};
      }
    }
    .camera_icon {
      position: relative;
      video {
        width: 100%;
        background-color: #d9d9d9;
      }
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  @media screen and (max-width: 980px) and (min-width: 230px) {
    width: 100%;
    .call_form {
      width: 100%;
      padding: 30px;
      label,
      h4 {
        font-size: 1.1rem;
      }
      p {
        padding-left: 14px;
        position: relative;
        color: ${palette.text.default};
        text-align: start;
        span {
          position: absolute;
          top: 0;
          left: 0;
          font-size: ${fontSize.medium};
          color: ${palette.main.default};
        }
      }
      .camera_icon {
        position: relative;
        video {
          width: 100%;
          height: 400px;
          background-color: #d9d9d9;
        }
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
`;
