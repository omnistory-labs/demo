import styled, { css } from "styled-components";

export const disabledBtn = css`
  width: 410px;
  height: 48px;
  border-radius: 5px;
  background-color: rgba(255, 83, 29, 0.5);
  font-size: 1rem;
  color: white;
`;

export const defaultInput = css`
  width: 408px;
  height: 48px;
  padding: 10px;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  ::placeholder {
    font-size: 0.95rem;
    color: #d1d1d1;
    padding-left: 10px;
  }
  outline: none;
`;

export const defaultFlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const transformXCenter = css`
  left: 50%;
  transform: translateX(-50%);
`;

export const absoluteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const defaultButton = css`
  border: 0;
  border-radius: 10px;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.08);
  background-color: #fff;
`;

export const fontBox = css`
  width: 120px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebebeb;
  border-radius: 5px;
`;

export const size = {
  width: "1200px",
  footer: "150px",
  left: "250px",
};

export const fontSize = {
  large: "2.75rem",
  medium: "1.5rem",
  regular: "1.125rem",
  small: "1rem",
  micro: "0.875rem",
  space: "0.75rem",
  devDocTitle: "40px",
  devDocSecTitle: "36px",
  devDocSubTitle: "28px",
  devDocText: "16px",
  devDocStrong: "15px",
};

export const fontWeight = {
  bold: 700,
  semiBold: 600,
  medium: 500,
  regular: 400,
  light: 300,
};

export const palette = {
  white: "#FFF",
  black: "#000",
  gray: {
    light: "#f9f9f9",
    bright: "#EBEBEB",
    middle: "#C4C4C4",
    dark: "#9D9D9D",
    boxColor: "#fafafa",
    camera: "#d9d9d9",
    normal: "#A4A3A3",
    formBorder: "#D1D1D1",
    consoleBar: "#D7D7D7",
    main: "#6b7684",
  },
  main: {
    default: "#FA5734",
    bright: "#E86B3A",
    light: "#FFAB8F",
    vivid: "#FF531D",
    disabled: "rgba(255,83,29,0.5)",
    darker: "#de4917",
  },
  opacity: "rgba(0,0,0,0)",
  text: {
    default: "#333",
    light: "#666",
    disabled: "#999",
    gray: "#A4A3A3",
  },
  blue: {
    default: "#FA5734",
    dark: "#ED571D",
    lighten: "rgba(255, 140, 140, 0.2)",
  },
  red: {
    default: "#07BF72",
    dark: "#06AD67",
  },
  shadow: "-2px 0 10px rgba(0,0,0,0.08)",
  btnShadow: "3px 2px 2px rgba(0,0,0,0.1)",
};
export const StyledAudioCall = styled.div`
  width: 100vw;
  /* height: 100vh; */
  background-color: rgba(0, 0, 0, 0.03);
  .list_container {
    width: 400px;
    margin: 0 auto;
    display: flex;
    ${defaultFlexCenter};
    flex-direction: column;
    position: relative;
    .user_id {
      width: 100%;
      padding: 0 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      margin-bottom: 10px;
      font-size: 16px;
      span {
        font-size: 14px;
        color: #666;
      }
      .refresh_button {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        border: 0;
        background-color: rgba(0, 0, 0, 0);
      }
    }
    .call_list_wrap {
      width: 100%;
      height: 300px;
      padding: 0 5%;
      margin-bottom: 30px;
      overflow: auto;
      border-radius: 10px;
      ::-webkit-scrollbar {
        display: none;
      }
      span {
        ${defaultFlexCenter}
        font-size: 14px;
        color: #666;
      }
      .state {
        position: absolute;
        top: 10px;
        left: 20px;
        font-size: 12px;
        color: #999;
      }
    }
    .bottom {
      width: 400px;
      margin: 0 auto;
      margin-bottom: 50px;
      padding-top: 30px;
      position: relative;
      button {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100px;
        height: 36px;
        color: ${palette.white};
        font-size: ${fontSize.small};
        cursor: pointer;
        border: 0;
        border-radius: 5px;
        background-color: ${palette.main.default};
        &:disabled {
          background-color: #ccc;
        }
      }
    }
  }
  @media screen and (max-width: 579px) and (min-width: 230px) {
    .list_container {
      width: 100%;
      .user_id {
        flex-direction: column-reverse;
        margin-bottom: 10px;
        font-size: 16px;
        .refresh_button {
          display: flex;
          align-items: center;
          margin-bottom: 0;
          border: 0;
          background-color: rgba(0, 0, 0, 0);
        }
      }
      .call_list_wrap {
      }
      .bottom {
        width: 90%;
        position: relative;
        button {
          font-size: 0.9rem;
        }
      }
    }
  }
`;
export const StyledContents = styled.div`
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  margin-bottom: 20px;
  border-top: 1px solid ${palette.gray.middle};
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  ${defaultFlexCenter}
  flex-wrap: wrap;
  flex-direction: column;
  background-color: #fff;
  h2 {
    text-align: center;
  }
  .input_container {
    width: 100%;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    border-top: 1px solid lightgray;
    input {
      ${defaultInput}
      width: 400px;
      margin: 0 auto;
      margin-bottom: 20px;
      ::placeholder {
        font-size: ${fontSize.micro};
      }
    }
    p {
      width: 400px;
      margin: 0 auto;
      margin-bottom: 80px;
      padding-left: 14px;
      position: relative;
      color: ${palette.text.default};
      text-align: start;
      font-size: 14px;
      span {
        position: absolute;
        top: 0;
        left: 0;
        font-size: ${fontSize.medium};
        color: ${palette.main.default};
      }
    }
    .bottom {
      width: 400px;
      margin: 0 auto;
      position: relative;
      button {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100px;
        height: 36px;
        color: ${palette.white};
        font-size: ${fontSize.small};
        cursor: pointer;
        border: 0;
        border-radius: 5px;
        background-color: ${palette.main.default};
        &:disabled {
          background-color: #ccc;
        }
      }
    }
  }

  @media screen and (max-width: 579px) and (min-width: 230px) {
    width: 100%;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 30px;
    .input_container {
      input {
        width: 100%;
        height: 36px;
      }
      p {
        width: 100%;
        margin-bottom: 60px;
      }
      .bottom {
        width: 100%;
        button {
          font-size: 0.9rem;
        }
      }
    }
  }
`;

export const StyledListBtn = styled.button`
  width: 100%;
  height: 42px;
  padding: 0 5%;
  margin-bottom: 6px;
  ${defaultFlexCenter}
  border: 0;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 4px 0px;
  position: relative;
  font-size: 14px;
  text-align: center;
  color: #666;
  :hover {
    cursor: pointer;
    color: #222;
    font-weight: 500;
    border: 1px solid ${palette.main.disabled};
    background-color: #fff;
  }
  &:disabled {
    background-color: rgba(0, 0, 0, 0.06);
    p {
      color: #999;
    }
    :hover {
      cursor: default;
      font-weight: 500;
      border: 0;
    }
  }
  &.active {
    color: #222;
    font-weight: 500;
    border: 1px solid ${palette.main.disabled};
    background-color: #fff;
  }
`;

export const StyledAudioCallForm = styled.div`
  width: 100%;
  height: 100vh;
  box-shadow: ${palette.shadow};
  background-color: rgba(0, 0, 0, 0.9);
  h3 {
    width: 100%;
    height: 60px;
    margin: 0;
    ${defaultFlexCenter}
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.7);
    font-weight: ${fontWeight.medium};
    background-color: rgba(0, 0, 0, 0.4);
  }
  .name,
  .calling {
    text-align: center;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
  }
  .name {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: ${fontWeight.medium};
  }
  .calling_spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .spinner {
    opacity: 0.2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
  .btn_wrap {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    ${defaultFlexCenter}
    justify-content: space-around;
    .roomIcon {
      width: 50px;
      height: 50px;
      ${defaultFlexCenter}
      background-color: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 8px 0px;
      border-radius: 50%;
      color: rgba(255, 255, 255, 0.6);
      font-size: 24px;
      :hover {
        cursor: pointer;
        color: mediumpurple;
      }
    }
  }
  .menu_wrap {
    height: 40px;
    position: absolute;
    top: 20px;
    right: 20px;
    ${defaultFlexCenter}
    justify-content: flex-end;
    .roomIcon {
      margin-bottom: 10px;
      background-color: rgba(255, 255, 255, 0);
      border: 0;
      color: rgba(255, 255, 255, 0.6);
      font-size: 24px;
      :hover {
        cursor: pointer;
        color: mediumpurple;
      }
    }
  }
  .select_wrap {
    width: 200px;
    position: absolute;
    top: 46px;
    right: -90px;
    text-align: center;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 10px;
    z-index: 200;
    .top {
      width: 100%;
      padding: 0 5%;
      ${defaultFlexCenter}
      justify-content: space-between;
      border-bottom: 1px solid lightgray;
      h3 {
        height: 38px;
        margin: 0;
        font-size: 14px;
        font-weight: 400;
        color: #333;
        ${defaultFlexCenter}
        background-color: #fff;
      }
      button {
        border: 0;
        background-color: rgba(0, 0, 0, 0);
      }
    }
    .center {
      border-radius: 10px;
      button {
        height: 38px;
        font-size: 13px;
        color: #666;
        border: 0;
        background-color: #fff;
        border-bottom: 1px solid lightgray;
        :last-child {
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
    }
  }
  .name {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: ${fontWeight.medium};
    span {
      position: static;
      font-size: 16px;
      color: #666;
      :last-child {
        position: absolute;
        top: 0;
        right: -80px;
        color: red;
      }
    }
  }

  @media screen and (max-width: 579px) and (min-width: 230px) {
    width: 100%;
    height: 100vh;
    box-shadow: ${palette.shadow};
    background-color: rgba(0, 0, 0, 0.9);
    h3 {
      width: 100%;
      height: 60px;
      margin: 0;
      ${defaultFlexCenter}
      margin-bottom: 20px;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.7);
      font-weight: ${fontWeight.medium};
      background-color: rgba(0, 0, 0, 0.4);
    }
    .name,
    .calling {
      text-align: center;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
    }

    .calling_spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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
    .name {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.6);
      font-weight: ${fontWeight.medium};
      span {
        position: static;
        font-size: 16px;
        color: #666;
        :last-child {
          position: absolute;
          top: 0;
          right: -80px;
          color: red;
        }
      }
    }
    .btn_wrap {
      position: absolute;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      ${defaultFlexCenter}
      justify-content: space-around;
      .roomIcon {
        width: 50px;
        height: 50px;
        ${defaultFlexCenter}
        background-color: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 8px 0px;
        border-radius: 50%;
        color: rgba(255, 255, 255, 0.6);
        font-size: 24px;
        :hover {
          cursor: pointer;
          color: mediumpurple;
        }
      }
    }
    .menu_wrap {
      height: 40px;
      position: absolute;
      top: 20px;
      right: 20px;
      ${defaultFlexCenter}
      justify-content: flex-end;
      .roomIcon {
        margin-bottom: 10px;
        background-color: rgba(255, 255, 255, 0);
        border: 0;
        color: rgba(255, 255, 255, 0.6);
        font-size: 24px;
        :hover {
          cursor: pointer;
          color: mediumpurple;
        }
      }
    }
    .select_wrap {
      width: 200px;
      position: absolute;
      top: 46px;
      right: -90px;
      text-align: center;
      transform: translateX(-50%);
      background-color: #fff;
      border-radius: 10px;
      z-index: 200;
      .top {
        width: 100%;
        padding: 0 5%;
        ${defaultFlexCenter}
        justify-content: space-between;
        border-bottom: 1px solid lightgray;
        h3 {
          height: 38px;
          margin: 0;
          font-size: 14px;
          font-weight: 400;
          color: #333;
          ${defaultFlexCenter}
          background-color: #fff;
        }
        button {
          border: 0;
          background-color: rgba(0, 0, 0, 0);
        }
      }
      .center {
        border-radius: 10px;
        button {
          height: 38px;
          font-size: 13px;
          color: #666;
          border: 0;
          background-color: #fff;
          border-bottom: 1px solid lightgray;
          :last-child {
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
        }
      }
    }
  }
`;
