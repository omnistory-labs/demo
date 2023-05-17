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
    text-align: center;
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
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      input {
        width: 220px;
        margin: 0;
      }
      button {
        width: 150px;
        height: 48px;
        margin: 0;
        font-size: ${fontSize.small};
        color: ${palette.white};
        border: 0;
        border-radius: 5px;
        background-color: ${palette.main.default};
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

export const StyledRoomCard = styled.article`
  width: 100%;
  height: 80px;
  background-color: ${palette.white};
  border-bottom: 1px solid ${palette.gray.formBorder};
  :hover {
    cursor: pointer;
  }
  :first-child {
  }
  :last-child {
    margin-bottom: 80px;
    border: 0;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .room_card {
    width: 100%;
    height: 100%;
    padding: 0 5%;
    display: flex;
    align-items: center;
    :first-child {
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
    }
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
  background-color: #222;
  .modal_container {
    .modal_header {
      width: 100%;
      /* height: 80px; */
      padding: 0 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.05);
      h3 {
        img {
          margin-right: 10px;
        }
        span {
          color: rgba(255, 255, 255, 0.5);
        }
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
              }
              button {
                border: 0;
                background-color: rgba(0, 0, 0, 0);
              }
            }
          }
          .select {
            width: 100%;
            height: 38px;
            border: 0;
            font-size: 12px;
            color: #333;
            background-color: #fff;
            border-bottom: 1px solid lightgray;
          }
        }
      }
    }
    .user_wrap {
      width: 400px;
      padding-top: 20px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-wrap: wrap;
      overflow: auto;
      ::-webkit-scrollbar {
        display: none;
      }
      .user_form {
        width: 180px;
        height: 80px;
        margin: 0 auto;
        margin-bottom: 10px;
        margin-right: 10px;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        h4 {
          padding: 0 5%;
          span {
            font-size: 14px;
            font-weight: 400;
            color: #333;
            :first-child {
              margin-right: 10px;
            }
          }
          .mute_icon {
            position: absolute;
            top: 6px;
            right: 6px;
            display: inline-block;
            width: 24px;
            height: 24px;
            .audio_mute {
              display: inline-block;
              /* opacity: 0; */
              transition: opacity 0.3s ease-in-out;
              z-index: 300;
            }
            .audio_unmuted {
              display: none;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 580px) and (min-width: 230px) {
    .modal_container {
      .modal_header {
        h3 {
          img {
            display: block;
            margin-bottom: 10px;
          }
          span {
            width: 100%;
          }
        }
        .button_wrap {
          .menu_wrap {
            width: 100%;
            position: relative;
            .roomIcon {
              width: 24px;
              height: 24px;
              font-size: 20px;
            }
            .close_btn {
              span {
              }
            }
            .select_wrap {
              width: 200px;
              /* height: 100%; */
              border: 1px solid lightgray;
              position: absolute;
              top: 46px;
              left: 0;
              text-align: center;
              transform: translateX(-50%);
              background-color: #fff;
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
                }
                button {
                  border: 0;
                  background-color: rgba(0, 0, 0, 0);
                }
              }
            }
            .select {
              width: 100%;
              height: 38px;
              border: 0;
              font-size: 12px;
              color: #333;
              background-color: #fff;
              border-bottom: 1px solid lightgray;
            }
          }
        }
      }
      .user_wrap {
        width: 100%;
        padding: 0 5%;
        padding-top: 20px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        overflow: auto;
        ::-webkit-scrollbar {
          display: none;
        }
        .user_form {
          width: 90%;
          height: 80px;
          margin: 0 auto;
          margin-bottom: 10px;
          margin-right: 10px;
          background-color: #fff;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          h4 {
            padding: 0 5%;
            span {
              font-size: 14px;
              font-weight: 400;
              color: #333;
              :first-child {
                margin-right: 10px;
              }
            }
            .mute_icon {
              position: absolute;
              top: 6px;
              right: 6px;
              display: inline-block;
              width: 24px;
              height: 24px;
              .audio_mute {
                display: inline-block;
                /* opacity: 0; */
                transition: opacity 0.3s ease-in-out;
                z-index: 300;
              }
              .audio_unmuted {
                display: none;
              }
            }
          }
        }
      }
    }
  }
`;
