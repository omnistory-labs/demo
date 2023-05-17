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

export const StyledWrap = styled.section`
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.03);
  article {
    ${defaultFlexCenter}
  }
  .list_wrap {
    width: 400px;
    margin: 0 auto;
    display: flex;
    ${defaultFlexCenter};
    flex-direction: column;
    position: relative;
    .refresh_button {
      position: absolute;
      top: -50px;
      right: 30px;
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      border: 0;
      background-color: rgba(0, 0, 0, 0);
    }
  }
  .no_room {
    margin: 0 auto;
    text-align: center;
    color: ${palette.text.light};
  }
  @media screen and (max-width: 580px) and (min-width: 230px) {
    .list_wrap {
      width: 100%;
      padding: 0 5%;
      justify-content: center;
    }
  }
`;

export const StyledCreateRoom = styled.article`
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  margin-bottom: 80px;
  border-top: 1px solid ${palette.gray.middle};
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  ${defaultFlexCenter}
  flex-wrap: wrap;
  flex-direction: column;
  background-color: #fff;
  h2 {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
    margin-bottom: 50px;
    border-bottom: 1px solid ${palette.gray.middle};
  }
  p {
    font-size: 1rem;
    color: #222;
    font-weight: ${fontWeight.medium};
  }
  .input_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    input {
      ${defaultInput}
      width: 400px;
      margin: 0 auto;
      margin-bottom: 20px;
    }
    .locked {
      width: 400px;
      margin: 0 auto;
      dl {
        display: flex;
        justify-content: space-between;
        dt {
          p:nth-child(2) {
            font-size: 0.9rem;
            font-weight: 400;
            color: ${palette.text.light};
          }
        }
        dd {
          padding-top: 40px;
        }
      }
    }
    .secret_wrap {
      display: flex;
      justify-content: space-between;
      input {
        width: 220px;
        margin: 0;
      }
      button {
        width: 150px;
        height: 48px;
        font-size: ${fontSize.small};
        color: ${palette.white};
        border: 0;
        border-radius: 5px;
        background-color: ${palette.main.default};
        /* background-color: #ccc; */
        :hover {
          cursor: pointer;
          background-color: ${palette.main.default};
          -webkit-transition: 0.5s;
          transition: 0.5s;
        }
        &:disabled {
          background-color: #ccc;
        }
      }
    }
  }
  @media screen and (max-width: 480px) and (min-width: 230px) {
    width: 100%;
    padding-left: 5%;
    padding-right: 5%;
    .input_container {
      input {
        width: 100%;
        height: 36px;
      }
      .locked {
        width: 100%;
      }
      .secret_wrap {
        button {
          height: 36px;
          margin-left: 10px;
          font-size: 0.9rem;
        }
      }
    }
  }
`;

export const StyledRoomList = styled.div`
  padding-bottom: 30px;
  margin: 0 auto;
  /* border-radius: 5px; */
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
`;
export const StyledRoomCard = styled.div`
  width: 100%;
  height: 80px;
  background-color: ${palette.white};
  border-bottom: 1px solid ${palette.gray.formBorder};
  :hover {
    cursor: pointer;
  }
  :first-child {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  :last-child {
    margin-bottom: 80px;
    border: 0;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .room_card {
    height: 90%;
    padding: 0 5%;
    display: flex;
    align-items: center;
    h3 {
      width: 50%;
      display: flex;
      justify-content: flex-start;
      span {
        margin-left: 6px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
      }
      .roomIcon {
        color: ${palette.main.disabled};
      }
      .room_subject {
      }
      .room_user {
        font-size: 16px;
        margin-left: 10px;
      }
    }
    .room_date {
      width: 50%;
      font-size: 14px;
      color: ${palette.text.disabled};
    }
    .join {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.7);
      .join_modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 120px;
        background-color: #fff;
        border-radius: 10px;
        .locked_title {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pw_input_container {
          text-align: center;
          input {
            width: 70%;
            height: 25px;
            padding-left: 6px;
            border: 1px solid #c4c4c4;
            border-radius: 3px;
            ::placeholder {
              color: #c4c4c4;
            }
          }
        }
        .join_secret {
          padding: 10px 5%;
          ${defaultFlexCenter}
        }
        button {
          width: 60px;
          height: 25px;
          margin-right: 10px;
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
  }
  @media screen and (max-width: 579px) and (min-width: 230px) {
    .room_card {
      flex-direction: column;
      h3 {
        width: 100%;
        display: flex;
        margin: 0;
        padding: 5%;
        span {
          font-size: 14px;
        }
      }
      .room_date {
        width: 100%;
        font-size: 12px;
        margin: 0;
        text-align: center;
        color: ${palette.text.disabled};
      }
      .join {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.7);
        .join_modal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 120px;
          background-color: #fff;
          border-radius: 10px;
          .locked_title {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .pw_input_container {
            text-align: center;
            input {
              width: 70%;
              height: 25px;
              padding-left: 6px;
              border: 1px solid #c4c4c4;
              border-radius: 3px;
              ::placeholder {
                color: #c4c4c4;
              }
            }
          }
          .join_secret {
            padding: 10px 5%;
            ${defaultFlexCenter}
          }
          button {
            width: 60px;
            height: 25px;
            margin-right: 10px;
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
    }
  }
`;

export const StyledModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  .user_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: #222;
    border-radius: 10px;
    .modal_header {
      width: 100%;
      padding: 0 5%;
      margin: 0 auto;
      margin-bottom: 80px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: rgba(255, 255, 255, 0.05);
      h3 {
        width: 50%;
        font-size: ${fontSize.medium};
        font-weight: ${fontWeight.medium};
        display: flex;
        justify-content: flex-start;
        span {
          line-height: 28px;
          padding-left: 20px;
          font-size: 18px;
          font-weight: ${fontWeight.regular};
          color: rgba(255, 255, 255, 0.5);
        }
      }
      .mobile_wrap {
        display: none;
      }
      .button_wrap {
        width: 50%;
        display: flex;
        justify-content: flex-end;
        .menu_wrap {
          margin-right: 3%;
          position: relative;
          .roomIcon {
            width: 34px;
            height: 34px;
            background-color: rgba(0, 0, 0, 0);
            border: 0;
            color: #999;
            font-size: 24px;
            :hover {
              cursor: pointer;
              color: mediumpurple;
            }
          }
          .close_btn {
            width: 100px;
            height: 34px;
            ${defaultFlexCenter}
            background-color: ${palette.main.vivid};
            border-radius: 5px;
            border: 0;
            color: #fff;
            font-size: 18px;
            span {
              color: #fff;
              font-size: 14px;
              font-weight: 600;
              line-height: 40px;
              margin-left: 8px;
            }
          }
        }
        .select_wrap {
          width: 200px;
          /* height: 100%; */
          border: 1px solid lightgray;
          position: absolute;
          top: 46px;
          left: 50%;
          text-align: center;
          transform: translateX(-50%);
          background-color: #fff;
          z-index: 200;
        }
        .select {
          width: 100%;
          height: 34px;
          border: 0;
          background-color: #fff;
          border-bottom: 1px solid lightgray;
        }
      }
    }
  }
  .user_wrap {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    /* height: 800px; */
    margin: 0 auto;
    overflow: auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    /* align-items: flex-start; */
    ::-webkit-scrollbar {
      display: none;
    }
    .user_form {
      position: relative;
      width: 380px;
      height: 254px;
      margin: 5px;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0);
      /* box-shadow: ${palette.shadow}; */
      overflow: hidden;
      .userId {
        display: inline-block;
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        padding: 6px;
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 5px;
        font-size: 14px;
        color: #fff;
      }
      .audio_mute {
        display: inline-block;
        position: absolute;
        top: 10px;
        left: 10px;
        /* opacity: 0; */
        transition: opacity 0.3s ease-in-out;
        z-index: 300;
      }
      .audio_unmuted {
        display: none;
      }
      video {
        width: 100%;
        /* background-color: rgba(0, 0, 0, 0); */
      }
      .video_mute {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        .video_mute_icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50, -50%);
          color: red;
          font-size: 28px;
        }
      }
    }
  }

  @media screen and (max-width: 780px) and (min-width: 520px) {
    .user_box {
      .modal_header {
        h3 {
          width: 30%;
          span {
            padding-left: 5%;
            font-size: 1rem;
          }
        }
        .mobile_wrap {
          display: none;
        }
        .button_wrap {
          width: 60%;
          display: flex;
          justify-content: flex-end;
          .menu_wrap {
            margin-right: 3%;
            position: relative;
            .roomIcon {
              width: 34px;
              height: 34px;
              background-color: rgba(0, 0, 0, 0);
              border: 0;
              color: #999;
              font-size: 18px;
              :hover {
                cursor: pointer;
                color: mediumpurple;
              }
            }
            .close_btn {
              width: 80px;
              height: 30px;
              ${defaultFlexCenter}
              background-color: ${palette.main.vivid};
              border-radius: 5px;
              border: 0;
              font-size: 16px;
              span {
                color: #fff;
                font-size: 14px;
                font-weight: 600;
                line-height: 40px;
              }
            }
          }
          .select_wrap {
            width: 200px;
            /* height: 100%; */
            border: 1px solid lightgray;
            position: absolute;
            top: 46px;
            left: 50%;
            text-align: center;
            transform: translateX(-50%);
            background-color: #fff;
            z-index: 200;
          }
          .select {
            width: 100%;
            height: 34px;
            border: 0;
            background-color: #fff;
            border-bottom: 1px solid lightgray;
          }
        }
      }
    }
    .user_wrap {
      width: 100%;
      height: 80%;
      overflow: auto;
      ::-webkit-scrollbar {
        display: none;
      }
      .user_form {
        position: relative;
        width: 380px;
        height: 254px;
        margin: 5px;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0);
        /* box-shadow: ${palette.shadow}; */
        overflow: hidden;
        .userId {
          display: inline-block;
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          padding: 6px;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 5px;
          font-size: 14px;
          color: #fff;
        }
        .audio_mute {
          display: inline-block;
          position: absolute;
          top: 10px;
          left: 10px;
          /* opacity: 0; */
          transition: opacity 0.3s ease-in-out;
          z-index: 300;
        }
        .audio_unmuted {
          display: none;
        }
        video {
          width: 100%;
          /* background-color: rgba(0, 0, 0, 0); */
        }
        .video_mute {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #000;
          .video_mute_icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50, -50%);
            color: red;
            font-size: 28px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 519px) and (min-width: 230px) {
    .user_box {
      .modal_header {
        h3 {
          width: 20px;
          overflow: hidden;
          span {
            padding-left: 5%;
            font-size: 1rem;
          }
          img {
            width: 100%;
          }
        }
        .button_wrap {
          display: none;
        }
        .mobile_wrap {
          display: flex;
          justify-content: flex-end;
          .menu_wrap {
            margin-left: 3%;
            .roomIcon {
              width: 34px;
              height: 34px;
              background-color: rgba(0, 0, 0, 0);
              border: 0;
              color: #999;
              font-size: 18px;
              :hover {
                cursor: pointer;
                color: mediumpurple;
              }
            }
            .close_btn {
              width: 80px;
              height: 30px;
              ${defaultFlexCenter}
              background-color: ${palette.main.vivid};
              border-radius: 5px;
              border: 0;
              font-size: 16px;
              color: #fff;
              span {
                color: #fff;
                font-size: 14px;
                font-weight: 600;
                line-height: 40px;
                margin-left: 6px;
              }
            }
          }
          .select_wrap {
            width: 100%;
            padding: 5%;
            position: absolute;
            top: 0;
            right: 0;
            background-color: ${palette.gray.boxColor};
            z-index: 100;
            .top {
              float: right;
              button {
                font-size: 18px;
                border: 0;
                background-color: rgba(0, 0, 0, 0);
              }
            }
            .center {
              clear: both;
              .setting_menu_wrap {
                width: 100%;
                display: flex;
                justify-content: space-between;
                .bnt_container {
                  width: 100px;
                  display: flex;
                  flex-direction: column;
                  :hover {
                    cursor: pointer;
                  }
                  .roomIcon {
                    width: 100%;
                    height: 36px;
                    border: 0;
                    background-color: rgba(0, 0, 0, 0);
                    color: #999;
                    font-size: 16px;
                    border: 1px solid lightgray;
                    border-bottom: 0;
                    border-right: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    span {
                      font-size: 12px;
                      margin-left: 6px;
                    }
                  }
                  .roomIcon:last-child,
                  .roomIcon_active:last-child {
                    border-bottom: 1px solid lightgray;
                  }
                  .roomIcon_active {
                    width: 100%;
                    height: 36px;
                    border: 0;
                    background-color: rgba(0, 0, 0, 0);
                    font-size: 16px;
                    border: 1px solid lightgray;
                    border-bottom: 0;
                    border-right: 0;
                    color: mediumpurple;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    span {
                      font-size: 12px;
                      margin-left: 6px;
                    }
                  }
                }
                .select_container {
                  width: 80%;
                  border: 1px solid lightgray;
                  .select {
                    width: 100%;
                    height: 36px;
                    border: 0;
                    font-size: 12px;
                    color: #333;
                    border-bottom: 1px solid lightgray;
                    background-color: rgba(0, 0, 0, 0);
                  }
                  .select:last-child {
                    border-bottom: 0;
                  }
                }
              }
            }
          }
        }
      }
    }
    .user_wrap {
      width: 100%;
      height: 80%;
      padding-bottom: 20px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      overflow: auto;
      ::-webkit-scrollbar {
        display: none;
      }
      .user_form {
        position: relative;
        width: 280px;
        height: 180px;
        margin: 0;
        overflow: hidden;
        .userId {
          width: 120px;
          height: 26px;
          display: inline-block;
          position: absolute;
          top: 10px;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 5px;
          font-size: 14px;
          line-height: 20px;
          ${defaultFlexCenter}
          color: #fff;
        }
        video {
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
    }
  }
`;
