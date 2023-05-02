import moment from "moment";
import Omnitalk from "omnitalk-npm-sdk";
import React, { useEffect, useRef, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { RiTimerLine } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";
import {
  StyledWrap,
  StyledCreateRoom,
  StyledModalWrap,
  StyledRoomCard,
} from "./style/style";

// SERVICE ID for WEB
// SERVICE ID, SERVICE KEY for APP
const omnitalk = new Omnitalk(
  "SERVICE ID를 입력하세요",
  "SERVICE KEY를 입력하세요"
);
export default function VideoConference() {
  const [session, setSession] = useState({});
  const [roomTitle, setRoomTitle] = useState("");
  const [roomPw, setRoomPw] = useState("");
  const [userId, setUserID] = useState("");

  // 룸 데이터 상태관리
  const [roomList, setRoomList] = useState([]);
  const [password, setPassword] = useState(roomList.map(() => "")); // roomList.secret => 사용자 입력
  const pwValue = useRef();

  // partilist
  const [partilist, setPartilist] = useState([]);

  // ui
  // const [cameraToggle, setCameraToggle] = useState(false);
  const [videoinput, setVideoinput] = useState([]);
  const [videoSelect, setVideoSelect] = useState(0);
  const [publishToggle, setPublishToggle] = useState(false);
  const [roomName, setRoomName] = useState(null);

  omnitalk.onmessage = async (e) => {
    console.log(`Event Message : ${JSON.stringify(e)}`); // 이벤트 발생시마다 확인되는 onmessage
    switch (e.cmd) {
      case "SESSION_EVENT":
        console.log(`Create session, ${e.user_id}, ${e.result}`);
        setSession(e.session);
        setUserID(e.user_id);
        console.log(e.user_id);
        await omnitalk.roomList("videoroom").then((res) => {
          console.log("session=>roomList", res);
          setRoomList(res);
        });
        console.log("session => device :", videoSelect);
        break;
      case "BROADCASTING_EVENT":
        console.log("broadcasting", e.cmd);
        omnitalk.subscribe(e.publish_idx);
        console.log(`subscribed to ${e.publish_idx}`);
        break;
      case "LEAVE_EVENT":
        console.log("leave");
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
        break;

      default:
        break;
    }
  };

  const handleCreateRoom = async () => {
    setRoomPw("");
    setRoomTitle("");
    await omnitalk.createRoom("videoroom", roomTitle, roomPw);
    await omnitalk.getDeviceList().then((res) => {
      setVideoinput(res.videoinput);
      console.log(res.videoinput);
    });
    if (roomTitle !== undefined) {
      if (roomList !== undefined) {
        await omnitalk.roomList("videoroom").then((res) => {
          setRoomList(res);
          console.log("videoroom", res);
        });
      }
    }
  };

  const handleVideodevice = async (e) => {
    await omnitalk.setVideoDevice(e.target.value);
    console.log("before deviceselect", e.target.value);
    setVideoSelect(e.target.value);
    console.log("after deviceselect", e.target.value);
  };

  const handleLeave = async () => {
    await omnitalk.leave(session);
    window.location.reload();
  };

  useEffect(() => {
    async function createSession() {
      await omnitalk.createSession();
    }
    createSession();
  }, []);

  useEffect(() => {
    console.log("partilist render", partilist);
    partilist.map(async (item) => {
      console.log("before subscribe partilist=", item);
      await omnitalk.subscribe(item.publish_idx);

      console.log("after subscribe partilist=", item);
    });
  }, [partilist]);

  return (
    <>
      <StyledWrap>
        <h2>Video Conference</h2>
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
            onClick={async () => {
              handleCreateRoom();
            }}
          >
            회의실 등록
          </button>
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
                            setPublishToggle(true);
                            setRoomName(room.subject);
                            await omnitalk.joinRoom(
                              room.room_id,
                              pwValue.current.value
                            );
                            await omnitalk.publish("videocall", false);
                            await omnitalk
                              .partiList(room.room_id)
                              .then((res) => {
                                setPartilist(res);
                                console.log("join partilist", res);
                                if (session !== res.session) {
                                  omnitalk.subscribe(res.publish_idx);
                                }
                              });
                            await omnitalk.getDeviceList().then((res) => {
                              setVideoinput(res.videoinput);
                            });
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
                              <select
                                onChange={handleVideodevice}
                                defaultValue={videoSelect}
                              >
                                {Object.values(videoinput).map((list, i) => {
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

                          {/* partilist form */}
                          <div className="user_wrap">
                            <div className="user_form">
                              <video
                                id="Omnitalk-LocalVideo-0"
                                autoPlay
                                playsInline
                              />
                            </div>
                          </div>
                          <div className="partilist_user_form">
                            <div className="user_form">
                              <video
                                id="Omnitalk-RemoteVideo-0"
                                autoPlay
                                playsInline
                              />
                            </div>
                            <div className="user_form">
                              <video
                                id="Omnitalk-RemoteVideo-1"
                                autoPlay
                                playsInline
                              />
                            </div>
                            <div className="user_form">
                              <video
                                id="Omnitalk-RemoteVideo-2"
                                autoPlay
                                playsInline
                              />
                            </div>
                            <div className="user_form">
                              <video
                                id="Omnitalk-RemoteVideo-3"
                                autoPlay
                                playsInline
                              />
                            </div>
                            <div className="user_form">
                              <video
                                id="Omnitalk-RemoteVideo-4"
                                autoPlay
                                playsInline
                              />
                            </div>
                            <div className="user_form">
                              <video
                                id="Omnitalk-RemoteVideo-5"
                                autoPlay
                                playsInline
                              />
                            </div>
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
