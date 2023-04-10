import React, { useEffect, useRef, useState } from "react";
import { RiTimerLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import Omnitalk from "omnitalk-npm-sdk";
import moment from "moment";
import { VscChromeClose } from "react-icons/vsc";
import {
  StyledCreateRoom,
  StyledModalWrap,
  StyledRoomCard,
  StyledWrap,
} from "./style/style";

// SERVICE ID for WEB
// SERVICE ID, SERVICE KEY for APP
const omnitalk = new Omnitalk(
  "SERVICE ID를 입력하세요",
  "SERVICE KEY를 입력하세요"
);
export default function AudioConference() {
  const [roomTitle, setRoomTitle] = useState(""); // subject
  const [roomPw, setRoomPw] = useState("");
  const [partilist, setPartilist] = useState([]); // get partiList
  const [userId, setUserID] = useState("");
  const [session, setSession] = useState("");
  const [audioinput, setAudioinput] = useState([]);
  const [audioinputSelect, setAudioinputSelect] = useState(0);

  // 룸 데이터 상태 관리
  const [roomList, setRoomList] = useState([]); // get roomList
  const [password, setPassword] = useState(roomList.map(() => "")); // roomList.secret => 사용자 입력
  const pwValue = useRef();

  // ui
  const [broadcastingToggle, setBroadcastingToggle] = useState(false);
  const [partiTitle, setPartiTitle] = useState("");

  omnitalk.onmessage = async (e) => {
    console.log(`Event Message : ${JSON.stringify(e)}`); // 이벤트 발생시마다 확인되는 onmessage
    switch (e.cmd) {
      case "SESSION_EVENT":
        console.log(`Create session, ${e.user_id}, ${e.result}`);
        setSession(e.session);
        await omnitalk.roomList("audioroom").then((res) => {
          console.log("result", res);
          setRoomList(res);
        });
        console.log("local user_id :", e.user_id);
        setUserID(e.user_id);
        console.log(userId);
        break;
      case "BROADCASTING_EVENT":
        console.log("caller", e.caller); // === user_id
        setPartilist(await omnitalk.partiList());
        await omnitalk.getDeviceList().then((device) => {
          setAudioinput(device.audioinput);
        });
        break;
      case "LEAVE_EVENT":
        console.log("leave");
        setPartilist(await omnitalk.partiList());
        break;
      case "AUDIO_MUTE_EVENT":
        console.log("audio-mute");
        break;
      case "AUDIO_UNMUTE_EVENT":
        console.log("audio-unmute");
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

  const handleRoomCreate = async () => {
    setRoomPw("");
    setRoomTitle("");
    await omnitalk.createRoom("audioroom", roomTitle, roomPw);
    if (roomTitle !== undefined) {
      if (roomList !== undefined) {
        await omnitalk.roomList("audioroom").then((res) => {
          setRoomList(res);
        });
      }
    }
  };

  const handleLeave = async () => {
    await omnitalk.leave(session);
  };

  const handleAudioDevice = async (e) => {
    await omnitalk.setAudioDevice(e.target.value);
    setAudioinputSelect(e.target.value);
  };

  useEffect(() => {
    async function createSession() {
      await omnitalk.createSession();
    }
    createSession();
  }, []);

  return (
    <>
      <StyledWrap>
        <h2>Audio Conference</h2>
        <StyledCreateRoom>
          <input
            type="text"
            placeholder="Room Title"
            value={roomTitle}
            onChange={(e) => setRoomTitle(e.target.value)}
          />
          <input
            type="password"
            placeholder="secret"
            value={roomPw}
            onChange={(e) => setRoomPw(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              handleRoomCreate();
            }}
          >
            회의실 등록
          </button>
        </StyledCreateRoom>
        <div className="list_wrap">
          {/* 룸 배열 렌더링 */}
          {roomList.map((room, i) => {
            return (
              <StyledRoomCard key={`room-${i}`}>
                <div className="room_card">
                  <h3>{room.subject}</h3>
                  <p>
                    <RiTimerLine style={{ fontSize: "18px" }} />
                    <span>
                      {moment(room.start_date * 1000).format("MM.DD h:mm")}
                    </span>{" "}
                    ~
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
                          await omnitalk.joinRoom(
                            room.room_id,
                            pwValue.current.value
                          );
                          await omnitalk.publish("audiocall", false);
                          setBroadcastingToggle(true);
                          setPartiTitle(room.subject);
                        }
                      }}
                    >
                      {" "}
                      join
                    </button>
                  </div>
                </div>
              </StyledRoomCard>
            );
          })}
        </div>
        {broadcastingToggle && (
          <StyledModalWrap>
            <div className="modal_container">
              <div className="user_box">
                <div className="modal_header">
                  <h3>{partiTitle}</h3>
                  <div className="select_wrap">
                    <select
                      onChange={handleAudioDevice}
                      defaultValue={audioinputSelect}
                    >
                      {Object.values(audioinput).map((list, i) => {
                        return (
                          <option key={i} value={i}>
                            {list.label}
                          </option>
                        );
                      })}
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        setBroadcastingToggle(false);
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
                  <div className="user_wrap">
                    <div className="user_form">
                      <img
                        src="https://user-images.githubusercontent.com/120351058/221723570-e2a7dbca-c263-4a5e-8426-864f76eb96b5.png"
                        alt="favicon"
                      />
                      <img
                        src="https://user-images.githubusercontent.com/120351058/221723847-7f4f7003-5bc0-4d6b-8509-d541f62254b7.png"
                        alt="logo"
                      />
                      <h4>{userId}</h4>
                    </div>
                    {partilist.map((list, i) => {
                      return (
                        <div className="user_form" key={i}>
                          <img
                            src="https://user-images.githubusercontent.com/120351058/221723570-e2a7dbca-c263-4a5e-8426-864f76eb96b5.png"
                            alt="favicon"
                          />
                          <img
                            src="https://user-images.githubusercontent.com/120351058/221723847-7f4f7003-5bc0-4d6b-8509-d541f62254b7.png"
                            alt="logo"
                          />
                          <h4>{list.user_id}</h4>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </StyledModalWrap>
        )}
      </StyledWrap>
    </>
  );
}
