import moment from "moment";
import Omnitalk from "omnitalk-npm-sdk";
import React, { useEffect, useRef, useState } from "react";
import { FiUsers, FiSpeaker } from "react-icons/fi";
import { MdCameraswitch, MdPictureInPictureAlt } from "react-icons/md";
import { ImPhoneHangUp } from "react-icons/im";
import { SlLock, SlLockOpen } from "react-icons/sl";
import { IoMdRefresh } from "react-icons/io";
import {
  AiFillAudio,
  AiOutlineAudioMuted,
  AiOutlineSetting,
  AiOutlineClose,
} from "react-icons/ai";
import { BsFillCameraVideoFill, BsCameraVideoOff } from "react-icons/bs";
import {
  StyledWrap,
  StyledCreateRoom,
  StyledModalWrap,
  StyledRoomCard,
} from "./style/style";
import LockedButton from "./LockedButton";

// SERVICE ID for WEB
// SERVICE ID, SERVICE KEY for APP
const omnitalk = new Omnitalk(
  "SERVICE ID를 입력하세요",
  "SERVICE KEY를 입력하세요"
);
const resolutionInput = [
  {
    id: 0,
    resolution: "320x240 (QVGA)",
    value: "QVGA",
  },
  {
    id: 1,
    resolution: "640x480 (VGA)",
    value: "VGA",
  },
  {
    id: 2,
    resolution: "720x480 (SD)",
    value: "SD",
  },
  {
    id: 3,
    resolution: "1280x720 (HD)",
    value: "HD",
  },
  {
    id: 4,
    resolution: "1920x1080 (FHD)",
    value: "FHD",
  },
  {
    id: 5,
    resolution: "2560x1440 (2K)",
    value: "2K",
  },
  {
    id: 6,
    resolution: "3840x2160 (4K)",
    value: "4K",
  },
];

export default function VideoConference() {
  const [session, setSession] = useState({});
  const [roomTitle, setRoomTitle] = useState("");
  const [roomPw, setRoomPw] = useState("");
  const [userId, setUserID] = useState("");
  const [arr, setArr] = useState([]);

  // 룸 데이터 상태관리
  const [roomList, setRoomList] = useState([]);
  const [password, setPassword] = useState(roomList.map(() => "")); // roomList.secret => 사용자 입력
  const pwValue = useRef();

  // partilist
  const [partilist, setPartilist] = useState([]);

  // ui
  const [videoinput, setVideoinput] = useState([]);
  const [audioinput, setAudioinput] = useState([]);
  const [publishToggle, setPublishToggle] = useState(false);
  const [roomName, setRoomName] = useState(null);
  const [locked, setLocked] = useState(false);
  const [joinModal, setJoinModal] = useState(false);

  // room toggle
  const [resolution, setResolution] = useState(false);
  const [audio, setAudio] = useState(false);
  const [camera, setCamera] = useState(false);
  const [audiomuteButton, setAudiomuteButton] = useState(false);
  const [videomuteButton, setVideomuteButton] = useState(false);

  // audio mute
  const [mutedUsers, setMutedUsers] = useState({});
  const [videoMuteUsers, setVideoMuteUsers] = useState({});

  const [mobileToggle, setMobileToggle] = useState(false);
  const [mobileTab, setMobileTab] = useState(0);

  const remote0 = useRef(null);
  const remote1 = useRef(null);
  const remote2 = useRef(null);
  const remote3 = useRef(null);
  const remote4 = useRef(null);

  omnitalk.onmessage = async (e) => {
    console.log(`Event Message : ${JSON.stringify(e)}`); // 이벤트 발생시마다 확인되는 onmessage
    switch (e.cmd) {
      case "SESSION_EVENT":
        setSession(e.session);
        setUserID(e.user_id);
        await omnitalk.roomList("videoroom").then((res) => {
          setRoomList(res);
        });
        await omnitalk.getDeviceList().then((res) => {
          setVideoinput(res.videoinput);
          setAudioinput(res.audioinput);
        });
        await omnitalk.setResolution("SD");
        break;
      case "BROADCASTING_EVENT":
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
            console.log(data.user_id);
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
        await omnitalk.subscribe(e.publish_idx);
        break;
      case "LEAVE_EVENT":
        console.log("leave", arr);
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
      case "VIDEO_MUTE_EVENT":
        handleVideoMute(e.user_id);
        break;
      case "VIDEO_UNMUTE_EVENT":
        handleVideoUnmute(e.user_id);
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

  const handleLeave = async () => {
    await omnitalk.leave(session);
    window.location.reload();
  };

  const refresh = (e) => {
    e.preventDefault();
    omnitalk.roomList("videoroom").then((res) => {
      console.log(res);
      setRoomList(res);
    });
    window.location.reload();
  };

  // audio mute
  const handleMute = (user_id) => {
    console.log("mutedUsers", mutedUsers, user_id);
    setMutedUsers((prevState) => ({ ...prevState, [user_id]: true }));
  };

  const handleUnmute = (user_id) => {
    console.log("unmutedUsers", mutedUsers, user_id);
    setMutedUsers((prevState) => ({ ...prevState, [user_id]: false }));
  };

  // video mute
  const handleVideoMute = (user_id) => {
    setVideoMuteUsers((prevState) => ({ ...prevState, [user_id]: true }));
  };

  const handleVideoUnmute = (user_id) => {
    setVideoMuteUsers((prevState) => ({ ...prevState, [user_id]: false }));
  };

  useEffect(() => {
    async function createSession() {
      await omnitalk.createSession();
    }
    createSession();
  }, []);

  useEffect(() => {
    partilist.map(async (item) => {
      await omnitalk.subscribe(item.publish_idx);
    });
  }, [partilist]);

  useEffect(() => {
    // console.log("=======arr========", arr);
    let remotes = [remote0, remote1, remote2, remote3, remote4];
    for (let i = 0; i < arr.length; i++) {
      remotes[i].current = arr[i];
    }
  }, [arr, partilist]);

  return (
    <>
      <StyledWrap>
        <StyledCreateRoom>
          <h2>Video Conference</h2>
          {/* <p>Creating a video conference room.</p> */}
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
          {roomList &&
            roomList.map((room, i) => {
              return (
                <StyledRoomCard
                  key={`room-${i}`}
                  onClick={async () => {
                    if (room.secret) {
                      setJoinModal(true);
                    } else {
                      setPublishToggle(true);
                      setRoomName(room.subject);
                      await omnitalk.joinRoom(room.room_id);
                      await omnitalk.publish("videocall", false);
                      await omnitalk.partiList(room.room_id).then((res) => {
                        setPartilist(res);
                        console.log("join partilist", res.length);
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
                              const dataArr = newArr.filter(
                                (value, i, self) => {
                                  return self.indexOf(value) === i;
                                }
                              );
                              return dataArr;
                            });
                          });
                        }
                      });
                      await omnitalk.getDeviceList().then((res) => {
                        setVideoinput(res.videoinput);
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
                                if (room.password === password[i]) {
                                  setPublishToggle(true);
                                  setRoomName(room.subject);
                                  console.log(pwValue.current.value);
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

          {/* publish */}
          {publishToggle && (
            <StyledModalWrap>
              <div className="modal_container">
                <div className="user_box">
                  <div className="modal_header">
                    <h3>
                      <img
                        style={{ width: "120px", height: "20px" }}
                        src="https://omnitalk.io/static/media/omnitalk.04397cb27dbe96192cba68044386e6b1.svg"
                        alt="logo"
                      />
                      <span>/{roomName}</span>
                    </h3>
                    <div className="button_wrap">
                      {/* resolution 설정 */}
                      <div className="menu_wrap">
                        <button
                          className="roomIcon"
                          type="button"
                          onClick={() => {
                            setResolution((prev) => !prev);
                            setAudio(false);
                            setCamera(false);
                            console.log("resolutionclick");
                          }}
                        >
                          <MdPictureInPictureAlt />
                        </button>
                        {resolution && (
                          <div className="select_wrap">
                            {resolutionInput.map((list) => {
                              return (
                                <button
                                  key={list.id}
                                  type="button"
                                  className="select"
                                  onClick={async () => {
                                    await omnitalk.setResolution(list.value);
                                    setResolution(false);
                                  }}
                                >
                                  {list.resolution}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      {/* 오디오 설정 */}
                      <div className="menu_wrap">
                        <button
                          className="roomIcon"
                          type="button"
                          onClick={() => {
                            setAudio((prev) => !prev);
                            setCamera(false);
                            setResolution(false);
                          }}
                        >
                          <span>
                            <FiSpeaker />
                          </span>
                        </button>
                        {audio && (
                          <div className="select_wrap">
                            {Object.values(audioinput).map((list, i) => {
                              return (
                                <button
                                  type="button"
                                  className="select"
                                  key={i}
                                  onClick={async () => {
                                    await omnitalk.setAudioDevice(i);
                                    setAudio(false);
                                    console.log("audio-mic", i);
                                  }}
                                >
                                  {list.label}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      {/* 카메라 설정 */}
                      <div className="menu_wrap">
                        <button
                          className="roomIcon"
                          type="button"
                          onClick={() => {
                            setCamera((prev) => !prev);
                            setAudio(false);
                            setResolution(false);
                          }}
                        >
                          <MdCameraswitch />
                        </button>

                        {camera && (
                          <div className="select_wrap">
                            {Object.values(videoinput).map((list, i) => {
                              return (
                                <button
                                  type="button"
                                  className="select"
                                  key={i}
                                  onClick={async () => {
                                    await omnitalk.setVideoDevice(i);
                                    setCamera(false);
                                    console.log("camera", i);
                                  }}
                                >
                                  {list.label}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
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
                                setResolution(false);
                                setCamera(false);
                                setAudio(false);
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
                                setResolution(false);
                                setCamera(false);
                                setAudio(false);
                              }}
                            >
                              <AiFillAudio />
                            </button>
                          </>
                        )}
                      </div>
                      {/* 카메라 꺼짐 설정 */}
                      <div className="menu_wrap">
                        {videomuteButton ? (
                          <>
                            <button
                              className="roomIcon"
                              type="button"
                              onClick={async () => {
                                setVideomuteButton(false);
                                setResolution(false);
                                setCamera(false);
                                setAudio(false);
                                await omnitalk.setVideoMute(false);
                              }}
                            >
                              <BsCameraVideoOff />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="roomIcon"
                              type="button"
                              onClick={async () => {
                                setVideomuteButton(true);
                                setResolution(false);
                                setCamera(false);
                                setAudio(false);
                                await omnitalk.setVideoMute(true);
                              }}
                            >
                              <BsFillCameraVideoFill />
                            </button>
                          </>
                        )}
                      </div>
                      {/* 나가기 */}
                      <div className="menu_wrap">
                        <button
                          className="close_btn"
                          type="button"
                          onClick={() => {
                            handleLeave();
                          }}
                        >
                          <ImPhoneHangUp />
                          <span>나가기</span>
                        </button>
                      </div>
                    </div>
                    {/* mobile */}
                    <div className="mobile_wrap">
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
                                setResolution(false);
                                setCamera(false);
                                setAudio(false);
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
                                setResolution(false);
                                setCamera(false);
                                setAudio(false);
                              }}
                            >
                              <AiFillAudio />
                            </button>
                          </>
                        )}
                      </div>
                      {/* 카메라 꺼짐 설정 */}
                      <div className="menu_wrap">
                        {videomuteButton ? (
                          <>
                            <button
                              className="roomIcon"
                              type="button"
                              onClick={async () => {
                                setVideomuteButton(false);
                                setResolution(false);
                                setCamera(false);
                                setAudio(false);
                                await omnitalk.setVideoMute(false);
                              }}
                            >
                              <BsCameraVideoOff />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="roomIcon"
                              type="button"
                              onClick={async () => {
                                setVideomuteButton(true);
                                setResolution(false);
                                setCamera(false);
                                setAudio(false);
                                await omnitalk.setVideoMute(true);
                              }}
                            >
                              <BsFillCameraVideoFill />
                            </button>
                          </>
                        )}
                      </div>
                      {/* setting */}
                      <div className="menu_wrap">
                        <button
                          type="button"
                          className="roomIcon"
                          onClick={() => {
                            setMobileToggle(true);
                            setMobileTab(0);
                          }}
                        >
                          <AiOutlineSetting />
                        </button>
                      </div>
                      {/* setting Toggle */}
                      {mobileToggle && (
                        <div className="select_wrap">
                          <div className="top">
                            <button
                              type="button"
                              onClick={() => setMobileToggle(false)}
                            >
                              <AiOutlineClose />
                            </button>
                          </div>
                          <div className="center">
                            {/* resolution 설정 */}
                            <div className="setting_menu_wrap">
                              <div className="bnt_container">
                                <button
                                  className={
                                    mobileTab === 0
                                      ? "roomIcon_active"
                                      : "roomIcon"
                                  }
                                  type="button"
                                  onClick={() => {
                                    setMobileTab(0);
                                    // console.log("resolutionclick");
                                  }}
                                >
                                  <MdPictureInPictureAlt />
                                  <span>해상도</span>
                                </button>
                                <button
                                  className={
                                    mobileTab === 1
                                      ? "roomIcon_active"
                                      : "roomIcon"
                                  }
                                  type="button"
                                  onClick={() => {
                                    setMobileTab(1);
                                  }}
                                >
                                  <span>
                                    <FiSpeaker />
                                    <span>오디오</span>
                                  </span>
                                </button>
                                <button
                                  className={
                                    mobileTab === 2
                                      ? "roomIcon_active"
                                      : "roomIcon"
                                  }
                                  type="button"
                                  onClick={() => {
                                    setMobileTab(2);
                                  }}
                                >
                                  <MdCameraswitch />
                                  <span>카메라</span>
                                </button>
                              </div>
                              <div className="select_container">
                                {mobileTab === 0 && (
                                  <>
                                    {resolutionInput.map((list) => {
                                      return (
                                        <button
                                          key={list.id}
                                          type="button"
                                          className="select"
                                          onClick={async () => {
                                            await omnitalk.setResolution(
                                              list.value
                                            );
                                            setResolution(false);
                                          }}
                                        >
                                          {list.resolution}
                                        </button>
                                      );
                                    })}
                                  </>
                                )}
                                {/* 오디오 설정 */}
                                {mobileTab === 1 && (
                                  <>
                                    {Object.values(audioinput).map(
                                      (list, i) => {
                                        return (
                                          <button
                                            type="button"
                                            className="select"
                                            key={i}
                                            onClick={async () => {
                                              await omnitalk.setAudioDevice(i);
                                              setAudio(false);
                                              console.log("audio-mic", i);
                                            }}
                                          >
                                            {list.label}
                                          </button>
                                        );
                                      }
                                    )}
                                  </>
                                )}
                                {/* 카메라 설정 */}
                                {mobileTab === 2 && (
                                  <>
                                    {Object.values(videoinput).map(
                                      (list, i) => {
                                        return (
                                          <button
                                            type="button"
                                            className="select"
                                            key={i}
                                            onClick={async () => {
                                              await omnitalk.setVideoDevice(i);
                                              setCamera(false);
                                              console.log("camera", i);
                                            }}
                                          >
                                            {list.label}
                                          </button>
                                        );
                                      }
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* 나가기 */}
                      <div className="menu_wrap">
                        <button
                          className="close_btn"
                          type="button"
                          onClick={() => {
                            handleLeave();
                          }}
                        >
                          <ImPhoneHangUp />
                          <span>나가기</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* partilist form */}
                  <div className="user_wrap">
                    <div className="user_form">
                      {videomuteButton && (
                        <span className="video_mute">
                          <BsCameraVideoOff className="video_mute_icon" />
                        </span>
                      )}
                      {audiomuteButton && (
                        <span className="audio_mute">
                          <AiOutlineAudioMuted color="red" fontSize={20} />
                        </span>
                      )}
                      <video id="Omnitalk-LocalVideo-0" autoPlay playsInline />
                    </div>
                    {arr.map((user_id, i) => {
                      const videoId = `Omnitalk-RemoteVideo-${i}`;
                      // console.log("isMuted[user_id]", mutedUsers[user_id]);
                      // console.log("isMuted", mutedUsers);
                      if (!arr.includes(user_id)) {
                        const video = document.getElementById(videoId);
                        if (video) {
                          video.remove();
                        }
                        return null;
                      }
                      return (
                        <div key={user_id} className="user_form">
                          {videoMuteUsers[user_id] ? (
                            <span className="video_mute">
                              <BsCameraVideoOff className="video_mute_icon" />
                            </span>
                          ) : null}
                          <span className="userId">{user_id}</span>
                          {mutedUsers[user_id] ? (
                            <span className="audio_mute">
                              <AiOutlineAudioMuted color="red" fontSize={20} />
                            </span>
                          ) : (
                            <span className="audio_mute audio_unmuted">
                              <AiOutlineAudioMuted color="red" fontSize={20} />
                            </span>
                          )}
                          <video id={videoId} autoPlay playsInline />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </StyledModalWrap>
          )}
        </div>
      </StyledWrap>
    </>
  );
}
