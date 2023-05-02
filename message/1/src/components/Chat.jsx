import moment from "moment";
import Omnitalk from "omnitalk-npm-sdk";
import React, { useEffect, useRef, useState } from "react";
import ChatRoom from "./chatRoom/ChatRoom";
import { FiUsers } from "react-icons/fi";
import { RiTimerLine } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";
import styled from "styled-components";
import {
  defaultFlexCenter,
  defaultInput,
  fontSize,
  fontWeight,
  palette,
} from "../style";

// SERVICE ID for WEB
// SERVICE ID, SERVICE KEY for APP
const omnitalk = new Omnitalk(
  "SERVICE ID를 입력하세요",
  "SERVICE KEY를 입력하세요"
);

function Chat() {
  const [session, setSession] = useState({});
  const [roomTitle, setRoomTitle] = useState("");
  const [roomPw, setRoomPw] = useState("");
  const [userId, setUserID] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [password, setPassword] = useState(roomList.map(() => "")); // roomList.secret => 사용자 입력
  // const [password, setPassword] = useState(""); // roomList.secret => 사용자 입력
  const pwValue = useRef();

  const [publishToggle, setPublishToggle] = useState(false);
  const [roomName, setRoomName] = useState(null);
  omnitalk.onmessage = async (e) => {
    console.log(`Event Message : ${JSON.stringify(e)}`); // 이벤트 발생시마다 확인되는 onmessage
    switch (e.cmd) {
      case "SESSION_EVENT":
        console.log(`Create session, ${e.user_id}, ${e.result}`);
        setSession(e.session);
        setUserID(e.user_id);

        await omnitalk.roomList("dataroom").then((res) => {
          console.log("session=>roomList", res);
          setRoomList(res);
        });
        break;
      case "LEAVE_EVENT":
        console.log("leave");
        break;
      case "ERROR":
        console.log("error");
        if (e.reason === "4202, ERR_INVALID_SECRET") {
          alert("비밀번호를 확인하세요!");
          await omnitalk.leave(session);
          window.location.reload();
        }
        break;

      default:
        break;
    }
  };

  const handleCreateRoom = async () => {
    setRoomPw("");
    setRoomTitle("");
    await omnitalk.createRoom("dataroom", roomTitle, roomPw);
    if (roomTitle !== undefined) {
      if (roomList !== undefined) {
        await omnitalk.roomList("dataroom").then((res) => {
          setRoomList(res);
          console.log("dataroom", res);
        });
      }
    }
  };

  const handleLeave = async () => {
    await omnitalk.leave(session);
    window.location.reload();
  };

  useEffect(() => {
    console.log("creact session");
    async function createSession() {
      await omnitalk.createSession();
    }
    createSession();
  }, []);

  return (
    <>
      <StyledWrap>
        <StyledCreateRoom>
          <input
            type="text"
            placeholder="Room Title"
            value={roomTitle}
            onChange={(e) => setRoomTitle(e.target.value)}
          />
          <div className="btn-wrap">
            <input
              type="password"
              placeholder="secret"
              value={roomPw}
              onChange={(e) => setRoomPw(e.target.value)}
            />
            <button
              type="button"
              onClick={async () => {
                handleCreateRoom();
              }}
            >
              채팅방 생성
            </button>
          </div>
        </StyledCreateRoom>

        <div className="list_wrap">
          {/* 룸 배열 렌더링 */}
          {roomList &&
            roomList.map((room, i) => {
              return (
                <StyledRoomCard key={`room-${i}`}>
                  <div className="room_card">
                    <h3>{room.subject}</h3>
                    <p>
                      <RiTimerLine style={{ fontSize: "18px" }} />
                      <span>
                        {moment(room.start_date * 1000).format("MM.DD h:mm")}
                      </span>{" "}
                      <span>
                        {moment(room.end_date * 1000).format("MM.DD h:mm")}
                      </span>
                    </p>
                    <p>
                      <FiUsers style={{ fontSize: "18px" }} />
                      <span>{room.count}</span>
                    </p>
                    <div className="join">
                      <label htmlFor={`room${i}-pw`}> </label>
                      <input
                        type="password"
                        id={`room${i}-pw`}
                        value={password[i]}
                        placeholder="password"
                        ref={pwValue}
                        onChange={(ev) => {
                          const value = ev.target.value; // 각 룸의 패스워드 인풋 값
                          setPassword((prevState) =>
                            prevState.map((pw, index) => {
                              return index === i ? value : pw;
                            })
                          );
                        }}
                      />
                      <div>{password[i]}</div>
                      <button
                        type="button"
                        onClick={async (ev) => {
                          ev.preventDefault();
                          if (room.password === password[i]) {
                            setPublishToggle(true);
                            setRoomName(room.subject);
                            await omnitalk.joinRoom(
                              room.room_id,
                              pwValue.current.value
                            );
                          }
                        }}
                      >
                        {" "}
                        join
                      </button>
                    </div>
                  </div>
                  {publishToggle && (
                    <StyledModalWrap>
                      <div className="modal_container">
                        <div className="user_box">
                          <div className="modal_header">
                            <h3>{roomName}</h3>
                            <div className="select_wrap">
                              <button
                                type="button"
                                onClick={() => {
                                  setPublishToggle(false);
                                  handleLeave();
                                  window.location.reload();
                                }}
                              >
                                {" "}
                                <VscChromeClose
                                  style={{ fontSize: "20px", color: "#333" }}
                                />
                              </button>
                            </div>
                          </div>

                          <div className="user_wrap">
                            <ChatRoom omnitalk={omnitalk} />
                          </div>
                        </div>
                      </div>
                    </StyledModalWrap>
                  )}
                </StyledRoomCard>
              );
            })}
        </div>
      </StyledWrap>
    </>
  );
}

export default Chat;

const StyledWrap = styled.section`
  padding: 0 3%;
  article {
    ${defaultFlexCenter};
  }
  .list_wrap {
    display: flex;
    justify-content: center;
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

const StyledCreateRoom = styled.article`
  width: 100%;
  padding-top: 50px;
  margin-bottom: 65px;
  ${defaultFlexCenter}
  flex-wrap: wrap;
  input {
    ${defaultInput}
    width: 200px;
    margin-right: 14px;
  }
  input:nth-child(2) {
    width: 100px;
  }
  button {
    width: 100px;
    height: 48px;
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

  @media screen and (max-width: 565px) and (min-width: 230px) {
    display: flex;
    justify-content: center;
    input {
      ${defaultInput}
      width: 80%;
      margin-bottom: 20px;
      margin-right: 0;
    }
    .btn-wrap {
      display: flex;
      width: 80%;
      button {
        margin-left: 6px;
        font-size: 14px;
      }
    }
    input:nth-child(2) {
      width: 57%;
      position: absolute;
      top: 100px;
      left: 0;
      display: flex;
    }
    cp button {
      width: 38%;
      position: absolute;
      top: 100px;
      right: 0;
      margin-left: 5px;
    }
  }
`;

const StyledRoomCard = styled.article`
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
    padding-bottom: 20px;
  }
`;

const StyledModalWrap = styled.div`
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
        /* height: 240px; */
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
