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

export const StyledContents = styled.div`
  width: 100%;
  padding-top: 40px;
  padding-bottom: 120px;
  .call_form {
    width: 360px;
    height: 530px;
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
    .refresh_button {
      position: absolute;
      top: 154px;
      right: 40px;
      color: ${palette.text.light};
      border: 0;
      background-color: ${palette.opacity};
      :hover {
        cursor: pointer;
        color: #469bf8;
      }
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
    .call_list_container {
      width: 100%;
      max-height: 260px;
      overflow: auto;
      background-color: ${palette.white};
      border-radius: 5px;
      ::-webkit-scrollbar {
        display: none;
      }
      .call_list_btn {
        height: 46px;
        button {
          display: inline-block;
          width: 100%;
          padding: 0 5%;
          border: 0;
          background-color: ${palette.opacity};
          color: ${palette.text.default};
          strong {
            ${defaultFlexCenter}
            justify-content: space-between;
            span {
              padding-top: 6px;
              font-weight: ${fontWeight.regular};
              font-size: ${fontSize.small};
              line-height: 24px;
              color: ${palette.text.default};
            }
            span:nth-child(2) {
              font-size: ${fontSize.micro};
            }
          }
          .border_bottom {
            display: inline-block;
            width: 90%;
            height: 1px;
            background-color: ${palette.gray.bright};
          }
        }
        .disabled_btn {
          color: ${palette.text.disabled};
          strong {
            span {
              color: ${palette.text.disabled};
            }
          }
        }
      }
      .call_list_btn:first-child {
        padding-top: 6px;
        background-color: ${palette.gray.bright};
        strong {
          span {
            color: ${palette.text.light};
          }
        }
        .border_bottom {
          display: none;
        }
      }
      .call_list_btn:last-child {
        .border_bottom {
          display: none;
        }
      }
    }
  }

  @media screen and (max-width: 579px) and (min-width: 230px) {
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
    }
  }
`;

export const StyledCallForm = styled.div`
  width: 800px;
  height: 800px;
  margin: 0 auto;
  padding: 40px;
  border-radius: 15px;
  background-color: ${palette.gray.boxColor};
  box-shadow: ${palette.shadow};
  position: relative;
  overflow: hidden;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 10;
  }
  h3 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.5rem;
    font-weight: ${fontWeight.medium};
  }
  .dot_wrap {
    margin-bottom: 30px;
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
  button {
    position: relative;
    .device_change_icon {
      position: absolute;
      bottom: 0;
      right: -8px;
    }
  }
  .camera_icon {
    width: 720px;
    height: 560px;
    padding-top: 60px;
    position: absolute;
    top: 85px;
    left: 40px;
    z-index: 22;
    video {
      width: 100%;
      height: 100%;
      background-color: #0b0a20;
    }
    img {
      position: absolute;
      width: 50%;
      bottom: 3px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .device_modal {
    position: absolute;
    top: 74px;
    left: 10px;
    .select_wrap {
      width: 280px;
      z-index: 50;
      select {
        width: 100%;
        height: 38px;
      }
    }
  }
  h4 {
    display: inline-block;
    width: 100%;
    margin: 0;
    margin-bottom: 20px;
    text-align: start;
    font-weight: ${fontWeight.regular};
    font-size: ${fontSize.regular};
  }
  .name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${fontSize.medium};
    color: #fff;
    z-index: 10;
  }
  .video_wrap {
    width: 100%;
    height: 540px;
    background-color: #0b0a20;
    position: relative;
    border: 1px solid;
    video:first-child {
      position: absolute;
      width: 100%;
      height: auto;
      right: 0;
      top: 0;
    }
    video:last-child {
      width: 240px;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 25;
    }
    img {
      display: block;
      width: 242px;
      height: 182px;
      padding-top: 20px;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 30;
      background-color: #0b0a20;
    }
  }
  .btn_wrap {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: 720px;
    height: 80px;
    ${defaultFlexCenter}
    justify-content: space-around;
    background-color: #1b1b1b;
    border-top: 1px solid #666;
    z-index: 21;
    .mobile {
      display: none;
    }
    button {
      background-color: ${palette.opacity};
      border: 0;
      :hover {
        cursor: pointer;
      }
      img {
        width: 46px;
      }
    }
  }
  @media screen and (max-width: 980px) and (min-width: 580px) {
    width: 100%;
    padding: 40px 5%;
    .camera_icon {
      width: 100%;
      /* height: 560px; */
      padding: 0 5%;
      position: absolute;
      top: 144px;
      left: 0;
      z-index: 22;
      video {
        width: 100%;
        height: 100%;
        background-color: #0b0a20;
      }
      img {
        position: absolute;
        width: 45%;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .video_wrap {
      width: 100%;
      background-color: #0b0a20;
      border: 1px solid #fff;
      position: relative;
      overflow: hidden;
      video:first-child {
        position: absolute;
        /* left: -200px; */
        /* max-width: 210%; */
        width: 100%;
        height: auto;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
      }
      video:last-child {
        position: absolute;
        top: 0;
        right: 0;
        width: 240px;
        z-index: 25;
      }
    }
    .btn_wrap {
      width: 100%;
      padding: 0 5%;
      height: 80px;
      bottom: 80px;
      ${defaultFlexCenter}
      justify-content: space-around;
      background-color: ${palette.gray.boxColor};
      border-top: 0;
      z-index: 28;
      .web {
        display: none;
      }
      .mobile {
        display: block;
      }
      button {
        padding-top: 50px;
        background-color: ${palette.opacity};
        border: 0;
        :hover {
          cursor: pointer;
        }
        img {
          width: 46px;
        }
      }
    }
    .device_modal {
      position: absolute;
      top: -40px;
      left: 10px;
      .select_wrap {
        width: 280px;
        z-index: 50;
        select {
          display: block;
          width: 100%;
          height: 38px;
        }
      }
    }
  }
  @media screen and (max-width: 579px) and (min-width: 230px) {
    width: 100%;
    padding: 40px 5%;
    .camera_icon {
      width: 100%;
      height: 560px;
      padding: 0 5%;
      position: absolute;
      top: 144px;
      left: 0;
      z-index: 22;
      video {
        width: 100%;
        height: 100%;
        background-color: #0b0a20;
      }
      img {
        position: absolute;
        width: 45%;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .device_modal {
      position: absolute;
      top: 74px;
      left: 10px;
      .select_wrap {
        width: 100%;
        z-index: 50;
        select {
          width: 100%;
          height: 38px;
        }
      }
    }
    .name {
      width: 100%;
      text-align: center;
      font-size: ${fontSize.small};
    }
    .video_wrap {
      width: 100%;
      height: 540px;
      background-color: #0b0a20;
      border: 1px solid #fff;
      position: relative;
      overflow: hidden;
      video:first-child {
        position: absolute;
        /* left: -200px; */
        width: 210%;
        height: auto;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
      }
      video:last-child {
        position: absolute;
        top: 0;
        right: 0;
        width: 160px;
        z-index: 25;
      }
      img {
        display: block;
        width: 160px;
        height: 120px;
        padding-top: 0;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 30;
        background-color: #0b0a20;
      }
    }
    .btn_wrap {
      width: 100%;
      padding: 0 5%;
      height: 80px;
      ${defaultFlexCenter}
      justify-content: space-around;
      background-color: ${palette.gray.boxColor};
      border-top: 0;
      z-index: 28;
      .web {
        display: none;
      }
      .mobile {
        display: block;
      }
      .device_change {
        display: none;
      }
      button {
        padding-top: 50px;
        background-color: ${palette.opacity};
        border: 0;
        :hover {
          cursor: pointer;
        }
        img {
          width: 46px;
        }
      }
    }
  }
`;
