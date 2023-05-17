import React, { useEffect, useRef, useState } from "react";
import { SlLock, SlLockOpen } from "react-icons/sl";
import { FiUsers } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import {
  AiOutlineSetting,
  AiOutlineAudioMuted,
  AiFillAudio,
} from "react-icons/ai";
import Omnitalk from "omnitalk-npm-sdk";
import moment from "moment";
import { VscChromeClose } from "react-icons/vsc";
import {
  StyledCreateRoom,
  StyledModalWrap,
  StyledRoomCard,
  StyledWrap,
} from "./style/style";
import LockedButton from "./LockedButton";
import UserName from "./UserName";

export default function AudioConference() {
  // SERVICE ID for WEB
  // SERVICE ID, SERVICE KEY for APP
  const omnitalk = new Omnitalk(
    "SERVICE ID를 입력하세요",
    "SERVICE KEY를 입력하세요"
  );
  const [roomTitle, setRoomTitle] = useState(""); // subject
  const [roomPw, setRoomPw] = useState("");
  const [partilist, setPartilist] = useState([]); // get partiList
  const [userId, setUserID] = useState("");
  const [session, setSession] = useState("");
  const [audioinput, setAudioinput] = useState([]);
  const [audioinputToggle, setAudioinputToggle] = useState(false);

  //creat room
  const [locked, setLocked] = useState(false);

  // 룸 데이터 상태 관리
  const pwValue = useRef();
  const localUser = useRef();
  const [roomList, setRoomList] = useState([]); // get roomList
  const [password, setPassword] = useState(roomList.map(() => "")); // roomList.secret => 사용자 입력
  const [arr, setArr] = useState([]);
  const [joinModal, setJoinModal] = useState(false);
  const [audiomuteButton, setAudiomuteButton] = useState(false);
  const [mutedUsers, setMutedUsers] = useState({});
  const [localMute, setLocalMute] = useState(false);

  // ui
  const [broadcastingToggle, setBroadcastingToggle] = useState(false);
  const [roomName, setRoomName] = useState("");

  omnitalk.onmessage = async (e) => {
    console.log(`Event Message : ${JSON.stringify(e)}`); // 이벤트 발생시마다 확인되는 onmessage
    switch (e.cmd) {
      case "SESSION_EVENT":
        setSession(e.session);
        setUserID(e.user_id);
        localUser.current = e.user_id;
        await omnitalk.roomList("audioroom").then((res) => {
          setRoomList(res);
        });
        await omnitalk.getDeviceList().then((res) => {
          setAudioinput(res.audioinput);
        });
        break;
      case "BROADCASTING_EVENT":
        if (session === e.session) return null;
        if (arr.length === 0) {
          setArr((prevArr) => {
            const newArr = [...prevArr, e.user_id];
            const dataArr = newArr.filter((value, i, self) => {
              return self.indexOf(value) === i;
            });
            return dataArr;
          });
        } else {
          for (let i = 0; i < arr.length; i++) {
            const data = arr[i];
            if (arr !== data.user_id) {
              setArr((prevArr) => {
                const newArr = [...prevArr, data.user_id];
                const dataArr = newArr.filter((value, i, self) => {
                  return self.indexOf(value) === i;
                });
                return dataArr;
              });
            }
            return;
          }
        }

        break;
      case "LEAVE_EVENT":
        setArr((prevArr) => {
          // prevArr에서 e.user_id를 찾아서 삭제합니다.
          const index = prevArr.indexOf(e.user_id);
          if (index > -1) {
            prevArr.splice(index, 1);
          }
          return [...prevArr];
        });
        break;
      case "AUDIO_MUTE_EVENT":
        handleMute(e.user_id);
        break;
      case "AUDIO_UNMUTE_EVENT":
        handleUnmute(e.user_id);
        break;
      case "ERROR":
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
    await omnitalk.createRoom("audioroom", roomTitle, roomPw);
    if (roomTitle !== undefined) {
      if (roomList !== undefined) {
        await omnitalk.roomList("audioroom").then((res) => {
          setRoomList(res);
        });
      }
    }
    setRoomPw("");
    setRoomTitle("");
  };

  // audio mute
  const handleMute = (user_id) => {
    if (localUser.current === user_id) {
      setLocalMute(true);
    } else {
      setMutedUsers((prevState) => ({ ...prevState, [user_id]: true }));
    }
  };

  const handleUnmute = (user_id) => {
    if (localUser.current === user_id) {
      setLocalMute(false);
    } else {
      setMutedUsers((prevState) => ({ ...prevState, [user_id]: false }));
    }
  };

  const handleLeave = async () => {
    await omnitalk.leave(session);
  };

  const refresh = (e) => {
    e.preventDefault();
    omnitalk.roomList("videoroom").then((res) => {
      setRoomList(res);
    });
    window.location.reload();
  };

  useEffect(() => {
    async function createSession() {
      await omnitalk.createSession();
    }
    createSession();
  }, []);

  useEffect(() => {
    setMutedUsers({});
  }, [arr]);

  return (
    <>
      <StyledWrap>
        <StyledCreateRoom>
          <h2>Audio Conference</h2>
          <div className="input_container">
            <input
              type="text"
              placeholder="Room Title"
              value={roomTitle}
              onChange={(e) => setRoomTitle(e.target.value)}
            />
            <div className="locked">
              <dl>
                {locked ? (
                  <dt>
                    <p>Locked room</p>
                    <p>Guests need to knock to enter</p>
                  </dt>
                ) : (
                  <dt>
                    <p>Unlocked room</p>
                    <p>Anyone can enter</p>
                  </dt>
                )}
                <dd>
                  <LockedButton locked={locked} setLocked={setLocked} />
                </dd>
              </dl>
              <div className="secret_wrap">
                <input
                  type="password"
                  placeholder="secret"
                  disabled={locked ? false : true}
                  value={roomPw}
                  onChange={(e) => setRoomPw(e.target.value)}
                />
                <button
                  type="button"
                  disabled={roomTitle === "" ? true : false}
                  onClick={async () => {
                    handleCreateRoom();
                  }}
                >
                  회의실 등록
                </button>
              </div>
            </div>
          </div>
        </StyledCreateRoom>
        <div className="list_wrap">
          <button type="button" className="refresh_button" onClick={refresh}>
            Refresh
            <IoMdRefresh fontSize={26} color="#FA5734" />
          </button>

          {/* room list */}
          {roomList.length <= 0 && (
            <p className="no_room">There are no registered rooms.</p>
          )}
          {roomList.map((room, i) => {
            return (
              <StyledRoomCard
                key={`room-${i}`}
                onClick={async () => {
                  if (room.secret) {
                    setJoinModal(true);
                  } else {
                    setBroadcastingToggle(true);
                    setRoomName(room.subject);
                    await omnitalk.joinRoom(room.room_id);
                    await omnitalk.publish("audiocall", false);
                    await omnitalk.partiList(room.room_id).then((res) => {
                      setPartilist(res);
                      if (res.length === 1) {
                        const data = res[0];
                        setArr((prevArr) => {
                          const newArr = [...prevArr, data.user_id];
                          const dataArr = newArr.filter((value, i, self) => {
                            return self.indexOf(value) === i;
                          });
                          return dataArr;
                        });
                      } else {
                        res.forEach((data) => {
                          setArr((prevArr) => {
                            const newArr = [...prevArr, data.user_id];
                            const dataArr = newArr.filter((value, i, self) => {
                              return self.indexOf(value) === i;
                            });
                            return dataArr;
                          });
                        });
                      }
                    });
                  }
                }}
              >
                <div className="room_card">
                  <h3>
                    <span className="roomIcon">
                      {room.secret ? <SlLock /> : <SlLockOpen />}
                    </span>
                    <span className="room_subject">{room.subject}</span>
                    <span className="room_user">
                      <span>
                        <FiUsers />
                      </span>{" "}
                      <span>/ {room.count}</span>
                    </span>
                  </h3>
                  <p className="room_date">
                    <span>
                      {moment(room.start_date * 1000).format("MM.DD hh:mm")}
                    </span>
                    ~
                    <span>
                      {moment(room.end_date * 1000).format("MM.DD hh:mm")}
                    </span>
                  </p>
                  {joinModal && room.secret && (
                    <div className="join">
                      <div className="join_modal">
                        <div className="locked_title">
                          <p>비밀번호를 입력해주세요.</p>
                        </div>
                        <div className="pw_input_container">
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
                        </div>
                        <div className="join_secret">
                          <div>{password[i]}</div>
                          <button
                            type="button"
                            onClick={async (ev) => {
                              ev.preventDefault();
                              setJoinModal(false);
                              setRoomName(room.subject);
                              if (room.password === password[i]) {
                                setBroadcastingToggle(true);
                                await omnitalk.joinRoom(
                                  room.room_id,
                                  pwValue.current.value
                                );
                                await omnitalk.publish("audiocall", false);
                                await omnitalk
                                  .partiList(room.room_id)
                                  .then((res) => {
                                    setPartilist(res);
                                  });
                              }
                            }}
                          >
                            join
                          </button>
                          <button
                            className="close_btn"
                            type="button"
                            onClick={() => {
                              setJoinModal(false);
                              window.location.reload();
                            }}
                          >
                            close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </StyledRoomCard>
            );
          })}
        </div>
        {broadcastingToggle && (
          <StyledModalWrap>
            <div className="modal_container">
              <div className="modal_header">
                <h3>
                  <img
                    style={{ width: "120px", height: "20px" }}
                    src="https://omnitalk.io/static/media/omnitalk.04397cb27dbe96192cba68044386e6b1.svg"
                    alt="logo"
                  />
                  <span>/ {roomName}</span>
                </h3>
                <div className="button_wrap">
                  {/* 음소거 설정 */}
                  <div className="menu_wrap">
                    {audiomuteButton ? (
                      <>
                        <button
                          className="roomIcon"
                          type="button"
                          onClick={async () => {
                            await omnitalk.setAudioMute(false);
                            setAudiomuteButton(false);
                            setAudioinputToggle(false);
                          }}
                        >
                          <AiOutlineAudioMuted />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="roomIcon"
                          type="button"
                          onClick={async () => {
                            await omnitalk.setAudioMute(true);
                            setAudiomuteButton(true);
                            setAudioinputToggle(false);
                          }}
                        >
                          <AiFillAudio />
                        </button>
                      </>
                    )}
                  </div>
                  {/* 오디오 설정 */}
                  <div className="menu_wrap">
                    <button
                      className="roomIcon"
                      type="button"
                      onClick={() => {
                        setAudioinputToggle((prev) => !prev);
                      }}
                    >
                      <span>
                        <AiOutlineSetting />
                      </span>
                    </button>
                    {audioinputToggle && (
                      <div className="select_wrap">
                        <div className="top">
                          <h3>오디오 설정</h3>
                          <button
                            type="button"
                            onClick={() => setAudioinputToggle(false)}
                          >
                            <VscChromeClose />
                          </button>
                        </div>
                        <div className="center">
                          {Object.values(audioinput).map((list, i) => {
                            return (
                              <button
                                type="button"
                                className="select"
                                key={i}
                                onClick={async () => {
                                  await omnitalk.setAudioDevice(i);
                                }}
                              >
                                {list.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* close */}
                  <div className="menu_wrap">
                    <button
                      className="roomIcon"
                      type="button"
                      onClick={() => {
                        setBroadcastingToggle(false);
                        handleLeave();
                        window.location.reload();
                      }}
                    >
                      <VscChromeClose />
                    </button>
                  </div>
                </div>
              </div>

              <div className="user_wrap">
                <div className="user_form local">
                  <UserName user_id={userId} />
                  <h4>
                    <span id="show">{userId}</span>
                    <span className="mute_icon">
                      {localMute ? (
                        <span className="audio_mute">
                          <AiOutlineAudioMuted color="red" fontSize={16} />
                        </span>
                      ) : (
                        <span className="audio_mute audio_unmuted">
                          <AiOutlineAudioMuted color="red" fontSize={16} />
                        </span>
                      )}
                    </span>
                  </h4>
                </div>
                {arr
                  .filter((user_id) => user_id !== localUser.current)
                  .map((user_id, i) => {
                    if (!arr.includes(user_id)) {
                      const audio = document.getElementById("show");
                      if (audio) {
                        audio.remove();
                      }
                      return null;
                    }
                    return (
                      <div key={user_id} className="user_form">
                        <UserName user_id={user_id} />
                        <h4>
                          <span id="show">{user_id}</span>
                          <span className="mute_icon">
                            {mutedUsers[user_id] ? (
                              <span className="audio_mute">
                                <AiOutlineAudioMuted
                                  color="red"
                                  fontSize={16}
                                />
                              </span>
                            ) : (
                              <span className="audio_mute audio_unmuted">
                                <AiOutlineAudioMuted
                                  color="red"
                                  fontSize={16}
                                />
                              </span>
                            )}
                          </span>
                        </h4>
                      </div>
                    );
                  })}
              </div>
            </div>
          </StyledModalWrap>
        )}
      </StyledWrap>
    </>
  );
}
