import Omnitalk from "omnitalk-npm-sdk";
import { useState } from "react";
import styled from "styled-components";
import {
  defaultFlexCenter,
  fontSize,
  fontWeight,
  palette,
} from "./style/style";
import { Bell, Ringing } from "./components/media/Ringing";
import {
  AiFillAudio,
  AiOutlineAudioMuted,
  AiOutlineClose,
} from "react-icons/ai";
import { FiSpeaker } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { ImPhoneHangUp, ImPhone } from "react-icons/im";
import { MdCameraswitch, MdPictureInPictureAlt } from "react-icons/md";
import { BsFillCameraVideoFill, BsCameraVideoOff } from "react-icons/bs";
import CreateSession from "./components/CreateSession";
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

export default function VideoCall() {
  const [sessionId, setSessionId] = useState(""); // createSession();
  const [regiNum, setRegiNum] = useState("");
  const [callee, setCallee] = useState(""); // 수신자
  const [caller, setCaller] = useState(""); // 발신자
  const [callListArr, setCallListArr] = useState([]);

  // device
  const [audioInput, setAudioInput] = useState(""); // 마이크
  const [videoInput, setVideoInput] = useState(""); // 카메라
  const [audioOutput, setAudioOutput] = useState(""); // 스피커
  const [resolution, setResolution] = useState(false); //해상도

  // answercall(room_id, room_type, publish_idx)
  const [roomId, setRoomId] = useState("");
  const [roomType, setRoomType] = useState("");
  const [publishId, setPublishId] = useState("");

  // ui
  // const [loader, setLoader] = useState(false);
  // const [loaderDisabled, setLoaderDisabled] = useState(true);
  const [camera, setCamera] = useState(false);
  const [audio, setAudio] = useState(false);

  // mute button
  const [audiomuteButton, setAudiomuteButton] = useState(false);
  const [videomuteButton, setVideomuteButton] = useState(false);
  // video mute view
  const [localVideoMute, setLocalVideoMute] = useState(false);
  const [remoteVideoMute, setRemoteVideoMute] = useState(false);
  const [localVideoMuteView, setLocalVideoMuteView] = useState(false);
  const [remoteVideoMuteView, setRemoteVideoMuteView] = useState(false);
  // audio mute view
  const [localAudioMute, setLocalAudioMute] = useState(false);
  const [remotAudiooMute, setRemoteAudioMute] = useState(false);
  const [localAudioMuteView, setLocalAudioMuteView] = useState(false);
  const [remoteAudioMuteView, setRemoteAudioMuteView] = useState(false);

  const [createToggle, setCreateToggle] = useState(true);
  // const [offerCallToggle, setOfferCallToggle] = useState(false);
  const [ringingToggle, setRingingToggle] = useState(false);
  const [answerToggle, setAnswerToggle] = useState(false);
  const [callToggle, setCallToggle] = useState(false);
  const [listToggle, setListToggle] = useState(false);

  // onmessage를 확인하여 omnitalk실행
  omnitalk.onmessage = async (e) => {
    console.log(`onmessage : ${JSON.stringify(e)}`); // 이벤트 발생시마다 확인되는 onmessage
    switch (e.cmd) {
      case "SESSION_EVENT":
        console.log(`Create session, ${e.user_id}, ${e.result}`);
        setListToggle(true);

        // call list
        await omnitalk.callList("videocall").then((result) => {
          setCallListArr(result);
        });
        // device list
        await omnitalk.getDeviceList().then((device) => {
          setAudioInput(device.audioinput);
          setAudioOutput(device.audiooutput);
          setVideoInput(device.videoinput);
        });
        await omnitalk.setResolution("SD");
        break;

      case "TRYING_EVENT":
        break;
      case "RINGING_EVENT": // call 받는 브라우저
        console.log("Ringing");
        await omnitalk.getDeviceList().then((device) => {
          setAudioInput(device.audioinput);
          setAudioOutput(device.audiooutput);
          setVideoInput(device.videoinput);
        });
        setCaller(e.caller);
        setRoomId(e.room_id);
        setRoomType(e.room_type);
        setPublishId(e.publish_idx);
        setCreateToggle(false);
        setListToggle(false);
        setAnswerToggle(true);
        // setOfferCallToggle(false);
        break;
      case "CONNECTED_EVENT": // 연결 성공시
        console.log("Connected");
        setCallToggle(true);
        // setCreateToggle(false);
        // setOfferCallToggle(false);
        break;
      case "BROADCASTING_EVENT":
        await omnitalk.subscribe(e.publish_idx);

        break;
      case "LEAVE_EVENT":
        console.log("Disconnected");
        omnitalk.leave(sessionId.session);
        window.location.reload(true);
        break;
      case "AUDIO_MUTE_EVENT":
        if (e.user_id === regiNum) {
          setLocalAudioMute(true);
          setLocalAudioMuteView(true);
        } else {
          setRemoteAudioMute(true);
          setRemoteAudioMuteView(true);
        }
        console.log("audio mute");
        break;
      case "AUDIO_UNMUTE_EVENT":
        console.log("audio unmute");
        if (e.user_id === regiNum) {
          setLocalAudioMute(false);
          setLocalAudioMuteView(false);
        } else {
          setRemoteAudioMute(false);
          setRemoteAudioMuteView(false);
        }
        break;
      case "VIDEO_MUTE_EVENT":
        if (e.user_id === regiNum) {
          setLocalVideoMute(true);
          setLocalVideoMuteView(true);
        } else {
          setRemoteVideoMute(true);
          setRemoteVideoMuteView(true);
        }

        break;
      case "VIDEO_UNMUTE_EVENT":
        if (e.user_id === regiNum) {
          setLocalVideoMute(false);
          setLocalVideoMuteView(false);
        } else {
          setRemoteVideoMute(false);
          setRemoteVideoMuteView(false);
        }
        break;
      case "ERROR":
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    setRegiNum(e.target.value);
  };

  const handleCreateSession = async () => {
    const session = await omnitalk.createSession(regiNum);

    if (session.reason === "4103, ERR_ALREADY_EXIST_USER") {
      alert("동일한 번호가 존재합니다.");
      window.location.reload();
    }
    if (session.result !== "success") {
      console.log("error", session);
    }
    setSessionId(session);
    setTimeout(async () => {
      // setLoader(true);
      // setLoaderDisabled(false);
    }, 1000 * 3);
  };

  const handleOfferCall = async (user_id) => {
    await omnitalk.offerCall("videocall", user_id, true);
  };

  const handleLeave = async () => {
    await omnitalk.leave(sessionId.session);
    window.location.reload();
  };
  const refresh = (e) => {
    e.preventDefault();
    omnitalk.callList("videocall").then((result) => {
      setCallListArr(result);
    });
  };

  return (
    <>
      <StyledContents>
        <section>
          {/* 1.번호 등록 */}
          {createToggle && (
            <CreateSession
              handleCreateSession={handleCreateSession}
              handleChange={handleChange}
              regiNum={regiNum}
            />
          )}

          {/* 2. callList */}
          {listToggle && (
            <>
              <div className="callList_wrap">
                <h4 htmlFor="call_list">
                  상대방 번호를 선택하세요.
                  <button
                    type="button"
                    className="refresh_button"
                    onClick={refresh}
                  >
                    Refresh
                    <IoMdRefresh fontSize={26} color="#FA5734" />
                  </button>
                </h4>
                <div className="call_list_container">
                  {/* get list */}
                  {callListArr.length === 0 ? (
                    <li>등록된 번호가 없습니다.</li>
                  ) : (
                    callListArr.map((list, i) => {
                      return (
                        <button
                          type="button"
                          key={i}
                          className="call_list_card"
                          onClick={() => {
                            handleOfferCall(list.user_id);
                            setCreateToggle(false);
                            setListToggle(false);
                            setRingingToggle(true);
                            setCallee(list.user_id);
                          }}
                        >
                          {list.user_id}
                          {list.state === "busy" && (
                            <span
                              className={
                                list.state === "busy" ? "list_disabled" : ""
                              }
                            >
                              님이 통화중입니다.
                            </span>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          )}

          {/* callee 화면 */}
          {answerToggle && (
            <StyledCallForm>
              <div className="btn_wrap">
                {!callToggle ? (
                  <>
                    {/* 통화요청 화면 버튼 */}
                    <button
                      type="button"
                      onClick={async () => {
                        // handleAnswer();
                        await omnitalk.answerCall(roomId, roomType, publishId);
                      }}
                    >
                      <ImPhone color="white" fontSize={30} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleLeave();
                      }}
                    >
                      <ImPhoneHangUp color="white" fontSize={30} />
                    </button>
                  </>
                ) : (
                  <>
                    {/* 통화 연결시 화면 */}
                    {/* resolution설정 버튼 */}
                    <button
                      type="button"
                      onClick={() => {
                        setResolution((prev) => !prev);
                        setAudio(false);
                        setCamera(false);
                        console.log("resolutionclick");
                      }}
                    >
                      <MdPictureInPictureAlt color="white" fontSize={30} />
                    </button>
                    {/* audio설정 버튼 */}
                    <button
                      type="button"
                      onClick={() => {
                        setAudio((prev) => !prev);
                        setCamera(false);
                        setResolution(false);
                      }}
                    >
                      <span>
                        <FiSpeaker color="#fff" fontSize="28px" />
                      </span>
                    </button>

                    {/* 카메라 설정 버튼 */}
                    <button
                      type="button"
                      onClick={() => {
                        setCamera((prev) => !prev);
                        setAudio(false);
                        setResolution(false);
                      }}
                    >
                      <MdCameraswitch color="#fff" fontSize="28px" />
                    </button>
                    {/* audiomute - button*/}
                    {audiomuteButton ? (
                      <>
                        <button
                          type="button"
                          onClick={async () => {
                            await omnitalk.setAudioMute(false);
                            setAudiomuteButton(false);
                            setResolution(false);
                            setCamera(false);
                            setAudio(false);
                          }}
                        >
                          <AiOutlineAudioMuted color="#fff" fontSize="28px" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={async () => {
                            await omnitalk.setAudioMute(true);
                            setAudiomuteButton(true);
                            setResolution(false);
                            setCamera(false);
                            setAudio(false);
                          }}
                        >
                          <AiFillAudio color="#fff" fontSize="28px" />
                        </button>
                      </>
                    )}
                    {/* videomute - button*/}
                    {videomuteButton ? (
                      <>
                        <button
                          type="button"
                          onClick={async () => {
                            setVideomuteButton(false);
                            setLocalVideoMuteView(false);
                            setRemoteVideoMuteView(false);
                            setResolution(false);
                            setCamera(false);
                            setAudio(false);
                            await omnitalk.setVideoMute(false);
                          }}
                        >
                          <BsCameraVideoOff color="#fff" fontSize="28px" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={async () => {
                            setVideomuteButton(true);
                            setLocalVideoMuteView(true);
                            setRemoteVideoMuteView(true);
                            setResolution(false);
                            setCamera(false);
                            setAudio(false);
                            await omnitalk.setVideoMute(true);
                          }}
                        >
                          <BsFillCameraVideoFill color="#fff" fontSize="28px" />
                        </button>
                      </>
                    )}
                    {/* 종료 버튼 */}
                    <button
                      type="button"
                      onClick={() => {
                        handleLeave();
                      }}
                    >
                      <ImPhoneHangUp color="white" fontSize={30} />
                    </button>

                    {/* 설정 버튼 modal */}
                    <div className="device_modal">
                      {resolution && (
                        <>
                          <button
                            className="device_modal_close"
                            type="button"
                            onClick={() => {
                              setResolution(false);
                            }}
                          >
                            <AiOutlineClose fontSize={20} />
                          </button>
                          <div className="select_wrap">
                            <div className="select_title">해상도 설정</div>
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
                        </>
                      )}
                      {audio && (
                        <>
                          <button
                            className="device_modal_close"
                            type="button"
                            onClick={() => {
                              setAudio(false);
                            }}
                          >
                            <AiOutlineClose fontSize={20} />
                          </button>
                          <div className="select_wrap">
                            <div className="select_title">
                              오디오 설정 - Microphone
                            </div>
                            {Object.values(audioInput).map((list, i) => {
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
                        </>
                      )}
                      {camera && (
                        <>
                          <button
                            className="device_modal_close"
                            type="button"
                            onClick={() => {
                              setCamera(false);
                            }}
                          >
                            <AiOutlineClose fontSize={20} />
                          </button>
                          <div className="select_wrap">
                            <div className="select_title">카메라 설정</div>
                            {Object.values(videoInput).map((list, i) => {
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
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* callee 화면 */}
              {!callToggle && (
                <>
                  <p className="name">{caller}님이 영상통화를 요청합니다.</p>
                  <Bell />
                </>
              )}

              {/* remote video_mute시 화면 */}
              {remotAudiooMute && (
                <AiOutlineAudioMuted
                  color="red"
                  fontSize={22}
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "30px",
                    zIndex: 30,
                  }}
                />
              )}
              {remoteVideoMute && (
                <>
                  <div className="camera_icon">
                    <BsCameraVideoOff
                      color="red"
                      fontSize={40}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        zIndex: 21,
                      }}
                    />
                    <video className="remote_video_mute" />
                  </div>
                </>
              )}

              {/* remote video연결 */}
              <div className="video_wrap">
                <video id="Omnitalk-RemoteVideo-0" autoPlay playsInline />

                {/* local video_mute시 */}
                {localAudioMute && (
                  <AiOutlineAudioMuted
                    color="red"
                    fontSize="22px"
                    style={{
                      position: "absolute",
                      top: "30px",
                      right: "60px",
                      zIndex: 60,
                    }}
                  />
                )}
                {/* local video연결 */}
                <div className="local_video_container">
                  {localVideoMute && (
                    <>
                      <BsCameraVideoOff
                        color="red"
                        fontSize={22}
                        style={{
                          position: "absolute",
                          top: "30px",
                          right: "30px",
                          zIndex: 50,
                        }}
                      />
                      <span className="videomut_background" />
                    </>
                  )}
                  <video id="Omnitalk-LocalVideo-0" autoPlay playsInline />
                </div>
              </div>
            </StyledCallForm>
          )}

          {/* caller 통화 대기중 */}
          {ringingToggle && (
            <StyledCallForm>
              <div className="btn_wrap">
                {!callToggle ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        handleLeave();
                      }}
                    >
                      <ImPhoneHangUp color="white" fontSize={30} />
                    </button>
                  </>
                ) : (
                  <>
                    {/* audiomute */}
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setResolution((prev) => !prev);
                          setCamera(false);
                          setAudio(false);
                        }}
                      >
                        <MdPictureInPictureAlt color="white" fontSize={30} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAudio((prev) => !prev);
                          setCamera(false);
                          setResolution(false);
                        }}
                      >
                        <span>
                          <FiSpeaker color="#fff" fontSize="28px" />
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCamera((prev) => !prev);
                          setAudio(false);
                          setResolution(false);
                        }}
                      >
                        <MdCameraswitch color="#fff" fontSize="28px" />
                      </button>
                    </>

                    {audiomuteButton ? (
                      <>
                        <button
                          type="button"
                          onClick={async () => {
                            await omnitalk.setAudioMute(false);
                            setAudiomuteButton(false);
                            setResolution(false);
                            setCamera(false);
                            setAudio(false);
                          }}
                        >
                          <AiOutlineAudioMuted color="#fff" fontSize="28px" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={async () => {
                            await omnitalk.setAudioMute(true);
                            setAudiomuteButton(true);
                            setResolution(false);
                            setCamera(false);
                            setAudio(false);
                          }}
                        >
                          <AiFillAudio color="#fff" fontSize="28px" />
                        </button>
                      </>
                    )}
                    {/* videomute local */}
                    {videomuteButton ? (
                      <>
                        <button
                          type="button"
                          onClick={async () => {
                            setVideomuteButton(false);
                            setLocalVideoMute(false);
                            setRemoteVideoMute(false);
                            setResolution(false);
                            setCamera(false);
                            setAudio(false);
                            await omnitalk.setVideoMute(false);
                          }}
                        >
                          <BsCameraVideoOff color="#fff" fontSize="28px" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={async () => {
                            setVideomuteButton(true);
                            setLocalVideoMute(true);
                            setRemoteVideoMute(true);
                            setResolution(false);
                            setCamera(false);
                            setAudio(false);
                            await omnitalk.setVideoMute(true);
                          }}
                        >
                          <BsFillCameraVideoFill color="#fff" fontSize="28px" />
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        handleLeave();
                      }}
                    >
                      <ImPhoneHangUp color="white" fontSize={30} />
                    </button>

                    {/* modal */}
                    <div className="device_modal">
                      {resolution && (
                        <>
                          <button
                            className="device_modal_close"
                            type="button"
                            onClick={() => {
                              setResolution(false);
                            }}
                          >
                            <AiOutlineClose fontSize={20} />
                          </button>
                          <div className="select_wrap">
                            <div className="select_title">해상도 설정</div>
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
                        </>
                      )}
                      {audio && (
                        <>
                          <button
                            className="device_modal_close"
                            type="button"
                            onClick={() => {
                              setAudio(false);
                            }}
                          >
                            <AiOutlineClose fontSize={20} />
                          </button>
                          <div className="select_wrap">
                            <div className="select_title">
                              오디오 설정 - Microphone
                            </div>
                            {Object.values(audioInput).map((list, i) => {
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
                        </>
                      )}
                      {camera && (
                        <>
                          <button
                            className="device_modal_close"
                            type="button"
                            onClick={() => {
                              setCamera(false);
                            }}
                          >
                            <AiOutlineClose fontSize={20} />
                          </button>
                          <div className="select_wrap">
                            <div className="select_title">카메라 설정</div>
                            {Object.values(videoInput).map((list, i) => {
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
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
              {!callToggle && (
                <>
                  <p className="name">{callee}님을 기다리고 있습니다.</p>
                  <Ringing />
                </>
              )}
              {/* remote video */}
              {remotAudiooMute && (
                <AiOutlineAudioMuted
                  color="red"
                  fontSize={22}
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "30px",
                    zIndex: 30,
                  }}
                />
              )}
              {remoteVideoMuteView ? (
                <>
                  <div className="camera_icon">
                    <BsCameraVideoOff
                      color="red"
                      fontSize={40}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        zIndex: 21,
                      }}
                    />
                    <video className="remote_video_mute" />
                  </div>
                </>
              ) : null}
              {/* local video */}
              <div className="video_wrap">
                <video id="Omnitalk-RemoteVideo-0" autoPlay playsInline />

                {/* caller local video mute */}
                {localAudioMute && (
                  <AiOutlineAudioMuted
                    color="red"
                    fontSize="22px"
                    style={{
                      position: "absolute",
                      top: "30px",
                      right: "60px",
                      zIndex: 60,
                    }}
                  />
                )}
                <div className="local_video_container">
                  {localVideoMute && (
                    <>
                      <BsCameraVideoOff
                        color="red"
                        fontSize={22}
                        style={{
                          position: "absolute",
                          top: "30px",
                          right: "30px",
                          zIndex: 50,
                        }}
                      />
                      <span className="videomut_background" />
                    </>
                  )}
                  <video id="Omnitalk-LocalVideo-0" autoPlay playsInline />
                </div>
              </div>
            </StyledCallForm>
          )}
        </section>
      </StyledContents>
    </>
  );
}

const StyledContents = styled.div`
  width: 100%;
  padding: 0;
  section {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.03);
  }
  .callList_wrap {
    width: 400px;
    height: 100%;
    margin: 0 auto;
    h4 {
      padding: 0 5%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 400;
      color: ${palette.text.default};
      margin-bottom: 30px;
      position: relative;
      .refresh_button {
        display: flex;
        align-items: center;
        border: 0;
        background-color: rgba(0, 0, 0, 0);
        color: #999;
        :hover {
          cursor: pointer;
          color: ${palette.text.default};
        }
      }
    }
    .call_list_container {
      width: 100%;
      height: 100%;
      border: 1px solid rgba(0, 0, 0, 0);
      .call_list_card {
        width: 400px;
        height: 80px;
        padding: 0 5%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: ${palette.text.default};
        border: 0;
        background-color: ${palette.white};
        border-bottom: 1px solid ${palette.gray.formBorder};
        :hover {
          font-weight: ${fontWeight.bold};
          font-size: ${fontSize.regular};
          color: ${palette.main.vivid};
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
        span {
          font-size: 14px;
          color: #999;
          margin-left: 10px;
        }
      }
    }
  }
  @media screen and (max-width: 580px) and (min-width: 230px) {
    .callList_wrap {
      width: 100%;
      padding: 0 5%;
      h4 {
        padding: 0;
      }
      .call_list_container {
        .call_list_card {
          width: 100%;
          height: 50px;
          padding: 0 5%;
          font-size: 14px;
          :hover {
            font-size: 16px;
          }
        }
      }
    }
  }
`;

const StyledCallForm = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border-radius: 15px;
  background-color: ${palette.gray.boxColor};
  position: relative;
  overflow: hidden;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 10;
  }
  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.5rem;
  }
  button {
    position: relative;
    background-color: rgba(0, 0, 0, 0);
  }
  .camera_icon {
    width: 100%;
    height: 100%;
    z-index: 22;
    video {
      width: 100%;
      height: 100%;
      background-color: #0b0a20;
    }
    .local_video_mute {
      display: block;
      width: 30%;
      height: 31%;
      padding-top: 20px;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 30;
      background-color: #0b0a20;
      border: 1px solid lightgrey;
    }
    .remote_video_mute {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
  }
  .device_modal {
    position: absolute;
    bottom: 100px;
    left: 40%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row-reverse;
    z-index: 100;
    .device_modal_close {
      width: 40px;
      height: 40px;
      background-color: #fff;
    }
    .select_wrap {
      width: 100%;
      z-index: 50;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #fff;
      border-radius: 5px;
      .select_title {
        width: 280px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        background-color: #fff;
        border-bottom: 1px solid ${palette.gray.middle};
      }
      .select {
        width: 280px;
        background-color: #fff;
        border-radius: 0;
        border-bottom: 1px solid ${palette.gray.middle};
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
    height: 100vh;
    background-color: #0b0a20;
    position: relative;
    video:first-child {
      /* remote-video */
      position: absolute;
      width: 100%;
      right: 0;
      top: 0;
    }
    .local_video_container {
      width: 30%;
      height: 300px;
      float: right;
      position: relative;
      .videomut_background {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: #0b0a20;
        z-index: 26;
      }
      video {
        width: 100%;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 25;
      }
    }

    .remote_video_mute {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
  }
  .btn_wrap {
    position: absolute;
    top: 85%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 80px;
    ${defaultFlexCenter}
    justify-content: center;
    /* background-color: #13131c; */
    z-index: 21;
    button {
      width: 60px;
      height: 60px;
      margin: 0 10px;
      background-color: rgba(0, 0, 0, 0.6);
      border: 0;
      border-radius: 5px;
      :hover {
        cursor: pointer;
      }
    }
  }
  @media screen and (max-width: 580px) and (min-width: 230px) {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    border-radius: 15px;
    background-color: ${palette.gray.boxColor};
    position: relative;
    overflow: hidden;
    .background {
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 10;
    }
    h2 {
      text-align: center;
      margin-bottom: 20px;
      font-size: 1.5rem;
    }
    button {
      position: relative;
      background-color: rgba(0, 0, 0, 0);
    }
    .camera_icon {
      width: 100%;
      height: 100%;
      z-index: 22;
      video {
        width: 100%;
        height: 100%;
        background-color: #0b0a20;
      }
      .local_video_mute {
        display: block;
        width: 30%;
        height: 31%;
        padding-top: 20px;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 30;
        background-color: #0b0a20;
        border: 1px solid lightgrey;
      }
      .remote_video_mute {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
    }
    .device_modal {
      position: absolute;
      bottom: 100px;
      left: 40%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: row-reverse;
      z-index: 100;
      .device_modal_close {
        width: 40px;
        height: 40px;
        background-color: #fff;
      }
      .select_wrap {
        width: 100%;
        z-index: 50;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        border-radius: 5px;
        .select_title {
          width: 280px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          background-color: #fff;
          border-bottom: 1px solid ${palette.gray.middle};
        }
        .select {
          width: 280px;
          background-color: #fff;
          border-radius: 0;
          border-bottom: 1px solid ${palette.gray.middle};
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
      font-size: 16px;
    }
    .video_wrap {
      video:first-child {
        width: 270%;
        right: -70%;
      }
      .local_video_container {
        width: 50%;
        height: 400px;
        float: right;
        overflow: hidden;
        position: relative;
        .videomut_background {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background-color: #0b0a20;
          z-index: 26;
        }
        video {
          width: 220%;
          position: absolute;
          top: 0;
          right: -35%;
          z-index: 25;
        }
      }
      .remote_video_mute {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
    }
    .btn_wrap {
      button {
        width: 50px;
        height: 50px;
        margin: 0 6px;
      }
    }
  }
`;
