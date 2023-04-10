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

export const StyledWrap = styled.section`
  padding: 5%;
  article {
    ${defaultFlexCenter}
  }
  h2 {
    text-align: center;
  }
  .list_wrap {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  @media screen and (max-width: 580px) and (min-width: 230px) {
    .list_wrap {
      justify-content: center;
    }
  }
`;

export const StyledCreateRoom = styled.article`
  width: 100%;
  padding-top: 50px;
  margin-bottom: 65px;
  border-top: 1px solid ${palette.gray.middle};
  ${defaultFlexCenter}
  flex-wrap: wrap;
  input {
    ${defaultInput}
    width: 300px;
    margin-right: 14px;
  }
  input:nth-child(2) {
    width: 150px;
  }
  button {
    width: 150px;
    height: 40px;
    margin-top: 5px;
    font-size: ${fontSize.small};
    color: ${palette.white};
    border: 0;
    border-radius: 5px;
    background-color: ${palette.main.default};
    :hover {
      cursor: pointer;
    }
  }
  @media screen and (max-width: 680px) and (min-width: 230px) {
    position: relative;
    input {
      ${defaultInput}
      width: 100%;
      margin-bottom: 20px;
      margin-right: 0;
    }
    input:nth-child(2) {
      width: 60%;
      position: absolute;
      top: 100px;
      left: 0;
    }
    button {
      margin-top: 5px;
      width: 38%;
      position: absolute;
      top: 100px;
      right: 0;
    }
  }
`;

export const StyledRoomCard = styled.article`
  width: 240px;
  height: 170px;
  margin: 16px;
  background-color: ${palette.white};
  box-shadow: ${palette.shadow};
  border-radius: 10px;
  :last-child {
    margin-bottom: 80px;
  }
  .room_card {
    h3 {
      margin: 0;
      margin-bottom: 10px;
      font-size: 20px;
      text-align: center;
    }
    p {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 0;
      margin-bottom: 10px;
      font-size: 14px;
      span {
        margin-left: 10px;
      }
    }
    .join {
      padding-top: 8px;
      position: relative;
      input {
        position: absolute;
        bottom: -16px;
        left: -5px;
        width: 120px;
        height: 25px;
        margin-right: 8px;
        padding-left: 6px;
        border: 1px solid #c4c4c4;
        border-radius: 3px;
        ::placeholder {
          color: #c4c4c4;
        }
      }
      button {
        position: absolute;
        bottom: -16px;
        right: -6px;
        width: 60px;
        height: 25px;
        color: ${palette.main.default};
        border: 0;
        border-radius: 3px;
        background-color: ${palette.white};
        box-shadow: ${palette.btnShadow};
        :hover {
          cursor: pointer;
        }
      }
    }
  }
`;

export const StyledModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  z-index: 100;
  .user_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 560px;
    height: 800px;
    background-color: #f8f8f8;
    border-radius: 10px;
    .modal_header {
      padding: 20px;
      margin-bottom: 80px;
      position: relative;
      h3 {
        width: 100%;
        text-align: center;
        font-size: ${fontSize.medium};
      }
      .select_wrap {
        position: absolute;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        select {
          width: 480px;
          height: 38px;
          border: 0;
        }
      }
      button {
        position: absolute;
        top: -60px;
        right: 0;
        background-color: #f8f8f8;
        border: 0;
        :hover {
          cursor: pointer;
        }
      }
      .audio_mute {
        position: absolute;
        top: 20px;
        right: 80px;
        width: 40px;
        :hover {
          cursor: pointer;
        }
      }
    }
    .user_wrap {
      width: 500px;
      height: 520px;
      padding-top: 100px;
      margin: 0 auto;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      overflow: auto;
      ::-webkit-scrollbar {
        display: none;
      }
      .user_form {
        position: relative;
        width: 140px;
        height: 140px;
        margin: 10px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: ${palette.shadow};
        .mute_icon {
          position: absolute;
          top: 0;
          right: 0;
          border: 1px solid red;
        }
        .remoteMute_icon {
          position: absolute;
          top: 0;
          left: 0;
          border: 1px solid rebeccapurple;
        }
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 110px;
        }
        img:first-child {
          position: absolute;
          top: 20px;
          left: 20px;
          width: 16px;
        }
        .mute {
          position: absolute;
          top: 12px;
          right: 12px;
          background-color: #fff;
        }
        h4 {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 15px;
          font-weight: ${fontWeight.regular};
          color: #666;
        }
      }
    }
  }

  @media screen and (max-width: 580px) and (min-width: 230px) {
    .user_box {
      position: absolute;
      width: 100%;
      height: 100%;
      .modal_header {
        width: 100%;
        padding: 20px;
        margin-bottom: 80px;
        position: relative;
        h3 {
          width: 100%;
          text-align: center;
          font-size: ${fontSize.medium};
        }
        .select_wrap {
          position: absolute;
          top: 100px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          padding: 0 5%;
          select {
            width: 100%;
            height: 38px;
            border: 0;
          }
        }
        button {
          position: absolute;
          right: 30px;
          background-color: #f8f8f8;
          border: 0;
          :hover {
            cursor: pointer;
          }
        }
        .audio_mute {
          position: absolute;
          top: 20px;
          right: 80px;
          width: 40px;
          :hover {
            cursor: pointer;
          }
        }
      }
      .user_wrap {
        width: 100%;
        padding-top: 100px;
        margin: 0 auto;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        overflow: auto;
        ::-webkit-scrollbar {
          display: none;
        }
        .user_form {
          position: relative;
          width: 140px;
          height: 140px;
          margin: 10px;
          border-radius: 10px;
          background-color: #fff;
          box-shadow: ${palette.shadow};
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 110px;
          }
          img:first-child {
            position: absolute;
            top: 20px;
            left: 20px;
            width: 16px;
          }
          h4 {
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 15px;
            font-weight: ${fontWeight.regular};
            color: #666;
          }
        }
      }
    }
  }
`;
