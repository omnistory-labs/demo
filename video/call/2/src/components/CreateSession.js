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
  regiNum,
}) {
  return (
    <StyledContents>
      <form className="call_form">
        <h2>Video Call</h2>
        <div className="createSession_wrap">
          <label htmlFor="createSession">{/* Step 1. 내 번호 등록 */}</label>
          <input
            type="text"
            name="createSession"
            placeholder="Please register the number."
            onChange={handleChange}
          />
          <p>
            <span>* </span>특수문자를 제외한 숫자, 문자, 이메일 주소 등을
            입력하세요.
          </p>
          <div className="create_button">
            <CreateSessionBtn
              text="번호등록"
              regiNum={regiNum}
              handleCreateSession={handleCreateSession}
            />
          </div>
        </div>
      </form>
    </StyledContents>
  );
}
const StyledContents = styled.div`
  width: 100%;
  .call_form {
    margin: 0 auto;
    background-color: ${palette.white};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    position: relative;
    overflow: hidden;
    h2 {
      text-align: center;
      padding-top: 50px;
      padding-bottom: 30px;
      margin-bottom: 20px;
      font-size: 1.5rem;
      border-bottom: 1px solid ${palette.gray.middle};
    }
    .createSession_wrap {
      width: 400px;
      margin: 0 auto;
      input {
        ${defaultInput}
        width: 100%;
        padding-left: 10px;
        margin-top: 30px;
        ::placeholder {
          font-size: 16px;
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
    }
    .create_button {
      width: 400px;
    }
  }

  @media screen and (max-width: 580px) and (min-width: 230px) {
    width: 100%;
    .call_form {
      h2 {
        padding-top: 30px;
      }
      .createSession_wrap {
        width: 100%;
        padding: 0 5%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .create_button {
        width: 100%;
      }
    }
  }
`;
