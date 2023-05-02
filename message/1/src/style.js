import styled, { css } from "styled-components";

export const signinUpBtn = css`
  width: 410px;
  height: 48px;
  border: 0;
  border-radius: 5px;
  background-color: #fa5734;
  font-size: 1.125rem;
  color: white;
`;

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

export const bannerBackground = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.78);
  /* z-index: 1; */
`;
export const bannerBackgroundCode = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  /* z-index: 1; */
`;
export const defaultButton = css`
  border: 0;
  border-radius: 10px;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.08);
  background-color: #fff;
`;

export const hoverScale = css`
  scale: calc(1.05);
`;

export const pagePaddingTop = css`
  padding-top: 225px;
  @media screen and (max-width: 579px) and (min-width: 230px) {
    padding-top: 120px;
  }
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

// solution style

export const solutionCardImg = css`
  width: 50%;
  img {
    width: 100%;
  }
`;

export const solutionCardContents = css`
  width: 50%;
  h4 {
    font-size: 1.25rem;
    line-height: 30px;
    font-weight: 400;
    display: flex;
    align-items: center;
    img {
      width: 36px;
      margin-right: 10px;
    }
  }
  strong {
    display: block;
    font-size: 1.125rem;
    font-weight: 400;
  }
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
    // default: '#E86B3A',
    default: "#FA5734",
    bright: "#E86B3A",
    // default: '#3182F6',
    light: "#FFAB8F",
    vivid: "#FF531D",
    // vivid: '#0a68eb',
    disabled: "rgba(255,83,29,0.5)",
    // disabled: 'rgba(49, 130, 246, 0.46)'
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
export const LoadingBackground = styled.div`
  position: absolute;
  /* width: 100vw; */
  /* height: 100vh; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: #ffffffb7;   */
  /* background-color: rgba(0, 0, 0, .7); */
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PopupLoadingBackground = styled.div`
  position: absolute;
  top: 40%;
  left: 40%;
  /* background: #ffffffb7;  
   */
  background-color: transparent;
  z-index: 999;
`;
export const DualPopupLoadingBackground = styled.div`
  position: absolute;
  top: 35%;
  left: 35%;
  /* background: #ffffffb7;  
   */
  background-color: transparent;
  z-index: 999;
`;

export const LoadingText = styled.div`
  font: 1rem "Pretendard";
  text-align: center;
`;
export const StyledPagination = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 30px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }

  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }

  ul.pagination li a {
    text-decoration: none;
    color: #e86b3a;
    font-size: 1rem;
  }

  ul.pagination li.active a {
    color: white;
  }

  ul.pagination li.active {
    background-color: #e86b3a;
  }

  ul.pagination li:hover,
  ul.pagination li a.active {
    background-color: ${palette.main.disabled};
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7;
  }
`;

export const breakpoint = {
  lg: "740px",
  md: "480px",
  sm: "320px",
};

export const zIndex = {
  headerMenu: 20,
  leftMenu: 10,
  popup: 100,
};

export const StyledDiv = styled.div`
  width: 100%;
  min-height: 70vh;
  padding-top: 120px;
  section {
    padding-left: 240px;
    .title {
      width: 100%;
      margin-bottom: 50px;
      border-bottom: 1px solid ${palette.gray.middle};
      h3 {
        margin-bottom: 20px;
        font-size: 1.75rem;
        font-weight: ${fontWeight.semiBold};
      }
    }
    article {
      margin-bottom: 50px;
      ${defaultFlexCenter}
      justify-content: flex-start;
      flex-wrap: wrap;
      button {
        font-size: 1.25rem;
        background-color: ${palette.opacity};
        border: 0;
        color: #333;
        :hover {
          cursor: pointer;
        }
      }
      .card {
        width: 100%;
        ${defaultFlexCenter}
        justify-content: flex-start;
        flex-wrap: wrap;
      }
    }
  }

  @media screen and (max-width: 979px) and (min-width: 580px) {
    section {
      padding: 0 5%;
      article {
        ${defaultFlexCenter}
        margin-right: 0;
      }
    }
  }

  @media screen and (max-width: 579px) and (min-width: 230px) {
    padding-top: 80px;
    section {
      padding: 0 5%;
      .title {
        h3 {
          margin-bottom: 30px;
          font-size: 1.5rem;
          font-weight: ${fontWeight.medium};
        }
      }
      article {
        margin-bottom: 20px;
        ${defaultFlexCenter}
        justify-content: flex-start;
        flex-wrap: wrap;
        .card {
          width: 100%;
          ${defaultFlexCenter}
          justify-content: center;
          flex-wrap: wrap;
        }
      }
    }
  }
`;

export const StyledWrap = styled.section`
  padding: 0 3%;
  article {
    ${defaultFlexCenter}/* ${pagePaddingTop} */
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
  .nickname {
    color: red;
    text-align: center;
    display: flex;
    justify-content: center;
    border: 1px solid white;
  }
`;

export const StyledCreateRoom = styled.article`
  width: 100%;
  padding-top: 50px;
  margin-bottom: 65px;
  /* border-top: 1px solid ${palette.gray.middle}; */
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
    font-size: ${fontSize.small};
    color: ${palette.white};
    border: 0;
    border-radius: 5px;
    background-color: ${palette.main.default};
    :hover {
      cursor: pointer;
    }
  }
  button.disabled {
    background-color: ${palette.main.disabled};
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
    cp button {
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
    position: absolute;
    top: 290px;
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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  .user_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 560px;
    height: 700px;
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
        top: 80px;
        right: 5%;
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
    }
    .user_wrap {
      position: absolute;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
      width: 500px;
      height: 600px;
      margin: 0 auto;
      overflow: auto;
      ::-webkit-scrollbar {
        display: none;
      }
      .user_form {
        position: relative;
        width: 49%;
        height: 180px;
        margin-left: 5px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: ${palette.shadow};
        overflow: hidden;
        h4 {
          position: absolute;
          top: -10px;
          right: -20px;
          transform: translateX(-50%);
          font-size: 12px;
          font-weight: ${fontWeight.regular};
          color: #222;
        }
        video {
          width: 100%;
        }
      }
    }
    .partilist_user_form {
      position: relative;
      top: 190px;
      width: 500px;
      height: 360px;
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
        width: 48%;
        height: 180px;
        margin: 5px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: ${palette.shadow};
        overflow: hidden;
        video {
          width: 100%;
        }
        h4 {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 15px;
          font-weight: ${fontWeight.regular};
          color: #222;
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
        position: absolute;
        top: 180px;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 240px;
        margin: 0 auto;
        overflow: auto;
        ::-webkit-scrollbar {
          display: none;
        }
        .user_form {
          position: relative;
          width: 90%;
          height: 230px;
          margin: 0 auto;
          border-radius: 10px;
          background-color: #fff;
          box-shadow: ${palette.shadow};
          overflow: hidden;
          h4 {
            position: absolute;
            top: -10px;
            right: -20px;
            transform: translateX(-50%);
            font-size: 12px;
            font-weight: ${fontWeight.regular};
            color: #222;
          }
          video {
            width: 100%;
          }
        }
      }
      .partilist_user_form {
        position: relative;
        top: 240px;
        width: 90%;
        height: 1180px;
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
          width: 100%;
          height: 230px;
          margin: 0 auto;
          margin-bottom: 8px;
          border-radius: 10px;
          background-color: #fff;
          box-shadow: ${palette.shadow};
          overflow: hidden;
          video {
            width: 100%;
          }
          h4 {
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 15px;
            font-weight: ${fontWeight.regular};
            color: #222;
          }
        }
      }
    }
  }
`;

export const StyledUserList = styled.div`
  position: absolute;
  top: 36px;
  right: 80px;
  height: 400px;
  border-left: 1px solid rgba(0, 0, 0, 0.125);
`;

export const StyledNickname = styled.div`
  text-align: center;
  border: none;
  h2 {
    margin-bottom: 20px;
    border: none;
    font-size: 18px;
    margin-top: 60px;
  }
`;
