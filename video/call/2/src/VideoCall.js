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
import { AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { FiSpeaker } from "react-icons/fi";
import { MdCameraswitch, MdChangeCircle } from "react-icons/md";
import { BsFillCameraVideoFill, BsCameraVideoOff } from "react-icons/bs";
import CreateSession from "./components/CreateSession";
import OfferCall from "./components/OfferCall";
import { useLocation } from "react-router-dom";
// SERVICE ID for WEB
// SERVICE ID, SERVICE KEY for APP
const omnitalk = new Omnitalk(
  "SERVICE ID를 입력하세요",
  "SERVICE KEY를 입력하세요"
);
export default function VideoCall() {
  const location = useLocation();

  const [sessionId, setSessionId] = useState(""); // createSession();
  const [regiNum, setRegiNum] = useState("");
  const [callee, setCallee] = useState(""); // callee 수신자
  const [caller, setCaller] = useState(""); // caller 발신자
  const [callListArr, setCallListArr] = useState([]);
  const [leave, setLeave] = useState(false);
  // device
  const [audioInput, setAudioInput] = useState("");
  const [videoInput, setVideoInput] = useState("");
  const [audioOutput, setAudioOutput] = useState("");
  const [audioinputSelect, setAudioinputSelect] = useState(0);
  const [audiooutputSelect, setAudiooutputSelect] = useState(0);
  const [videoSelect, setVideoSelect] = useState(0);

  // answercall(room_id, room_type, publish_idx)
  const [roomId, setRoomId] = useState("");
  const [roomType, setRoomType] = useState("");
  const [publishId, setPublishId] = useState("");

  // ui
  const [loader, setLoader] = useState(false);
  const [loaderDisabled, setLoaderDisabled] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [camera, setCamera] = useState(false);
  const [audio, setAudio] = useState(false);
  const [audiomute, setAudiomute] = useState(false);
  const [videomute, setVideomute] = useState(false);
  const [localmute, setLocalmute] = useState(false);
  const [remotemute, setRemotemute] = useState(false);
  const [calleeLocal, setCalleeLocal] = useState(false);
  const [calleeRemote, setCalleeRemote] = useState(false);
  const [createToggle, setCreateToggle] = useState(true);
  const [offerCallToggle, setOfferCallToggle] = useState(false);
  const [ringingToggle, setRingingToggle] = useState(false);
  const [answerToggle, setAnswerToggle] = useState(false);
  const [callToggle, setCallToggle] = useState(false);

  // onmessage를 확인하여 omnitalk실행
  omnitalk.onmessage = async (e) => {
    console.log(`onmessage : ${JSON.stringify(e)}`); // 이벤트 발생시마다 확인되는 onmessage
    switch (e.cmd) {
      case "SESSION_EVENT":
        console.log(`Create session, ${e.user_id}, ${e.result}`);
        setOfferCallToggle(true);
        setCreateToggle(false);

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
        await omnitalk.setAudioDevice(audioinputSelect);
        await omnitalk.setVideoDevice(videoSelect);
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
        setAnswerToggle(true);
        setOfferCallToggle(false);
        break;
      case "CONNECTED_EVENT": // 연결 성공시
        console.log("Connected");
        setCallToggle(true);
        setCreateToggle(false);
        setOfferCallToggle(false);
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
        console.log("audio mute");
        break;
      case "AUDIO_UNMUTE_EVENT":
        console.log("audio unmute");
        break;
      case "VIDEO_MUTE_EVENT":
        if (e.user_id === regiNum) {
          setLocalmute(true);
          setCalleeLocal(true);
        } else {
          setRemotemute(true);
          setCalleeRemote(true);
        }

        break;
      case "VIDEO_UNMUTE_EVENT":
        if (e.user_id === regiNum) {
          setLocalmute(false);
          setCalleeLocal(false);
        } else {
          setRemotemute(false);
          setCalleeRemote(false);
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
    setIsValid(true);
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
      setLoader(true);
      setLoaderDisabled(false);
    }, 1000 * 3);
  };

  const handleOfferCall = async () => {
    await omnitalk.offerCall("videocall", callee, true);
  };

  const handleAudioDevice = async (e) => {
    await omnitalk.setAudioDevice(e.target.value);
    setAudioinputSelect(e.target.value);
    setAudio(false);
  };

  const handleVideoDevice = async (e) => {
    await omnitalk.setVideoDevice(e.target.value);
    setVideoSelect(e.target.value);
    setCamera(false);
  };

  const handleLeave = async () => {
    await omnitalk.leave(sessionId.session);
    window.location.reload();
  };

  const refresh = (e) => {
    e.preventDefault();
    omnitalk.callList("videocall").then((result) => {
      setCallListArr(result);
      setLeave(true);
    });
  };

  return (
    <>
      <StyledContents>
        <section>
          {/* 1.번호 등록 */}
          {createToggle && (
            <CreateSession
              isValid={isValid}
              handleCreateSession={handleCreateSession}
              handleChange={handleChange}
            />
          )}

          {/* 2. offer call */}
          {offerCallToggle && (
            <>
              <OfferCall
                setRingingToggle={setRingingToggle}
                setOfferCallToggle={setOfferCallToggle}
                refresh={refresh}
                handleOfferCall={handleOfferCall}
                callListArr={callListArr}
                loaderDisabled={loaderDisabled}
                loader={loader}
                regiNum={regiNum}
                setCallee={setCallee}
                callee={callee}
              />
            </>
          )}

          {/* 3. callee */}
          {answerToggle && (
            <StyledCallForm>
              {!callToggle ? (
                <>
                  <h3>Video Call</h3>
                  <div className="dot_wrap">
                    <span className="dot_active"> </span>{" "}
                    <span className="hyphen_active"> </span>
                    <span className="dot_active"> </span>{" "}
                    <span className="hyphen_active"> </span>
                    <span className="dot_active"> </span>{" "}
                    <span className="hyphen"> </span>
                    <span className="dot"> </span>
                  </div>
                  <p className="name">{caller}님이 영상통화를 요청합니다.</p>
                  <Bell />
                </>
              ) : (
                <>
                  <h3>Video Call</h3>
                  <div className="dot_wrap">
                    <span className="dot_active"> </span>{" "}
                    <span className="hyphen_active"> </span>
                    <span className="dot_active"> </span>{" "}
                    <span className="hyphen_active"> </span>
                    <span className="dot_active"> </span>{" "}
                    <span className="hyphen_active"> </span>
                    <span className="dot_active"> </span>
                  </div>
                </>
              )}
              {remotemute ? (
                <>
                  <div className="camera_icon">
                    <video />
                    <img
                      src="https://user-images.githubusercontent.com/120351058/218401284-6d1baf7e-7aaf-497a-b2fa-783d6eaf209d.png"
                      alt="camera"
                    />
                  </div>
                </>
              ) : null}
              <div className="video_wrap">
                <video id="Omnitalk-RemoteVideo-0" autoPlay playsInline />
                {/* callee remote */}
                {calleeLocal ? (
                  <>
                    <img
                      src="https://user-images.githubusercontent.com/120351058/218682259-21cf1dea-e072-41ba-8fb4-856b1573e78d.png"
                      alt="muteImg"
                    />
                  </>
                ) : null}
                <video id="Omnitalk-LocalVideo-0" autoPlay playsInline />
              </div>
              <div className="btn_wrap">
                {!callToggle ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        // handleAnswer();
                        omnitalk.answerCall(roomId, roomType, publishId);
                      }}
                    >
                      <img
                        src="https://user-images.githubusercontent.com/99234582/216007136-6db53d89-c22d-45a9-a536-3af165027c52.svg"
                        alt="통화"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleLeave();
                      }}
                    >
                      <img
                        src="https://user-images.githubusercontent.com/99234582/216007148-8311385f-b6c4-4f45-a4bc-89690c3c38e9.svg"
                        alt="종료"
                      />
                    </button>
                  </>
                ) : (
                  <>
                    {/* audiomute */}
                    <div className="web">
                      <button
                        type="button"
                        onClick={() => {
                          setAudio((prev) => !prev);
                          setCamera(false);
                        }}
                      >
                        <span>
                          <FiSpeaker color="#fff" fontSize="28px" />
                        </span>
                        <span className="device_change_icon">
                          <MdChangeCircle color="#fff" fontSize="26px" />
                        </span>
                      </button>
                    </div>
                    <div className="mobile device_change">
                      <button
                        type="button"
                        onClick={() => {
                          setAudio((prev) => !prev);
                          setCamera(false);
                        }}
                      >
                        <span>
                          <FiSpeaker color="#999" fontSize="28px" />
                        </span>
                        <span className="device_change_icon">
                          <MdChangeCircle color="#222" fontSize="26px" />
                        </span>
                      </button>
                    </div>

                    <div className="web">
                      <button
                        type="button"
                        onClick={() => {
                          setCamera((prev) => !prev);
                          setAudio(false);
                        }}
                      >
                        <MdCameraswitch color="#fff" fontSize="28px" />
                      </button>
                    </div>
                    <div className="mobile device_change">
                      <button
                        type="button"
                        onClick={() => {
                          setCamera((prev) => !prev);
                          setAudio(false);
                        }}
                      >
                        <MdCameraswitch color="#999" fontSize="28px" />
                      </button>
                    </div>

                    {audiomute ? (
                      <>
                        <div className="web">
                          <button
                            type="button"
                            onClick={async () => {
                              setAudiomute(false);
                              await omnitalk.setAudioMute(false);
                            }}
                          >
                            <AiOutlineAudioMuted color="#fff" fontSize="28px" />
                          </button>
                        </div>
                        <div className="mobile">
                          <button
                            type="button"
                            onClick={async () => {
                              setAudiomute(false);
                              await omnitalk.setAudioMute(false);
                            }}
                          >
                            <AiOutlineAudioMuted color="#999" fontSize="28px" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="web">
                          <button
                            type="button"
                            onClick={async () => {
                              setAudiomute(true);
                              await omnitalk.setAudioMute(true);
                            }}
                          >
                            <AiFillAudio color="#fff" fontSize="28px" />
                          </button>
                        </div>
                        <div className="mobile">
                          <button
                            type="button"
                            onClick={async () => {
                              setAudiomute(true);
                              await omnitalk.setAudioMute(true);
                            }}
                          >
                            <AiFillAudio color="#999" fontSize="28px" />
                          </button>
                        </div>
                      </>
                    )}
                    {/* videomute */}
                    {videomute ? (
                      <>
                        <div className="web">
                          <button
                            type="button"
                            onClick={async () => {
                              setVideomute(false);
                              setCalleeLocal(false);
                              setCalleeRemote(false);
                              await omnitalk.setVideoMute(false);
                            }}
                          >
                            <BsCameraVideoOff color="#fff" fontSize="28px" />
                          </button>
                        </div>
                        <div className="mobile">
                          <button
                            type="button"
                            onClick={async () => {
                              setVideomute(false);
                              setCalleeLocal(false);
                              setCalleeRemote(false);
                              await omnitalk.setVideoMute(false);
                            }}
                          >
                            <BsCameraVideoOff color="#999" fontSize="28px" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="web">
                          <button
                            type="button"
                            onClick={async () => {
                              setVideomute(true);
                              setCalleeLocal(true);
                              setCalleeRemote(true);
                              await omnitalk.setVideoMute(true);
                            }}
                          >
                            <BsFillCameraVideoFill
                              color="#fff"
                              fontSize="28px"
                            />
                          </button>
                        </div>
                        <div className="mobile">
                          <button
                            type="button"
                            onClick={async () => {
                              setVideomute(true);
                              setCalleeLocal(true);
                              setCalleeRemote(true);
                              await omnitalk.setVideoMute(true);
                            }}
                          >
                            <BsFillCameraVideoFill
                              color="#999"
                              fontSize="28px"
                            />
                          </button>
                        </div>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        handleLeave();
                      }}
                    >
                      <img
                        src="https://user-images.githubusercontent.com/99234582/216007148-8311385f-b6c4-4f45-a4bc-89690c3c38e9.svg"
                        alt="종료"
                      />
                    </button>
                    <div className="device_modal">
                      {audio && (
                        <>
                          <div className="select_wrap">
                            <select
                              onChange={handleAudioDevice}
                              defaultValue={audioinputSelect}
                            >
                              {Object.values(audioInput).map((list, i) => {
                                return (
                                  <option key={i} value={i}>
                                    {list.label}
                                  </option>
                                );
                              })}
                            </select>
                            <select defaultValue={audiooutputSelect}>
                              {Object.values(audioOutput).map((list, i) => {
                                return (
                                  <option key={i} value={i}>
                                    {list.label}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </>
                      )}
                      {camera && (
                        <>
                          <div className="select_wrap">
                            <select
                              onChange={handleVideoDevice}
                              defaultValue={videoSelect}
                            >
                              {Object.values(videoInput).map((list, i) => {
                                return (
                                  <option key={i} value={i}>
                                    {list.label}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </StyledCallForm>
          )}

          {/* 3. caller */}
          {ringingToggle && (
            <StyledCallForm>
              {!callToggle ? (
                <>
                  <h3>Video Call</h3>
                  <div className="dot_wrap">
                    <span className="dot_active"> </span>{" "}
                    <span className="hyphen_active"> </span>
                    <span className="dot_active"> </span>{" "}
                    <span className="hyphen_active"> </span>
                    <span className="dot_active"> </span>{" "}
                    <span className="hyphen"> </span>
                    <span className="dot"> </span>
                  </div>
                  <p className="name">{callee}님을 기다리고 있습니다.</p>
                  <Ringing />
                </>
              ) : (
                <>
                  <h3>Video Call</h3>
                  <div className="dot_wrap">
                    <span className="dot_active"> </span>{" "}
                    <span className="hyphen_active"> </span>
                    <span className="dot_active"> </span>{" "}
                    <span className="hyphen_active"> </span>
                    <span className="dot_active"> </span>{" "}
                    <span className="hyphen_active"> </span>
                    <span className="dot_active"> </span>
                  </div>
                </>
              )}

              {/* remute video */}
              {calleeRemote ? (
                <>
                  <div className="camera_icon">
                    <video />
                    <img
                      src="https://user-images.githubusercontent.com/120351058/218401284-6d1baf7e-7aaf-497a-b2fa-783d6eaf209d.png"
                      alt="camera"
                    />
                  </div>
                </>
              ) : null}
              <div className="video_wrap">
                <video id="Omnitalk-RemoteVideo-0" autoPlay playsInline />
                {/* caller local video */}
                {localmute ? (
                  <>
                    <img
                      src="https://user-images.githubusercontent.com/120351058/218682259-21cf1dea-e072-41ba-8fb4-856b1573e78d.png"
                      alt="muteImg"
                    />
                  </>
                ) : null}
                <video id="Omnitalk-LocalVideo-0" autoPlay playsInline />
              </div>
              <div className="btn_wrap">
                {!callToggle ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        handleLeave();
                      }}
                    >
                      <img
                        src="https://user-images.githubusercontent.com/99234582/216007148-8311385f-b6c4-4f45-a4bc-89690c3c38e9.svg"
                        alt="종료"
                      />
                    </button>
                  </>
                ) : (
                  <>
                    {/* audiomute */}
                    <>
                      <div className="web">
                        <button
                          type="button"
                          onClick={() => {
                            setAudio((prev) => !prev);
                            setCamera(false);
                          }}
                        >
                          <span>
                            <FiSpeaker color="#fff" fontSize="28px" />
                          </span>
                          <span className="device_change_icon">
                            <MdChangeCircle color="#fff" fontSize="26px" />
                          </span>
                        </button>
                      </div>

                      <div className="mobile device_change">
                        <button
                          type="button"
                          onClick={() => {
                            setAudio((prev) => !prev);
                            setCamera(false);
                          }}
                        >
                          <span>
                            <FiSpeaker color="#999" fontSize="28px" />
                          </span>
                          <span className="device_change_icon">
                            <MdChangeCircle color="#222" fontSize="26px" />
                          </span>
                        </button>
                      </div>
                      <div className="web">
                        <button
                          type="button"
                          onClick={() => {
                            setCamera((prev) => !prev);
                            setAudio(false);
                          }}
                        >
                          <MdCameraswitch color="#fff" fontSize="28px" />
                        </button>
                      </div>
                      <div className="mobile device_change">
                        <button
                          type="button"
                          onClick={() => {
                            setCamera((prev) => !prev);
                            setAudio(false);
                          }}
                        >
                          <MdCameraswitch color="#999" fontSize="28px" />
                        </button>
                      </div>
                    </>

                    {audiomute ? (
                      <>
                        <div className="web">
                          <button
                            type="button"
                            onClick={async () => {
                              setAudiomute(false);
                              await omnitalk.setAudioMute(false);
                            }}
                          >
                            <AiOutlineAudioMuted color="#fff" fontSize="28px" />
                          </button>
                        </div>
                        <div className="mobile">
                          <button
                            type="button"
                            onClick={async () => {
                              setAudiomute(false);
                              await omnitalk.setAudioMute(false);
                            }}
                          >
                            <AiOutlineAudioMuted color="#999" fontSize="28px" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="web">
                          <button
                            type="button"
                            onClick={async () => {
                              setAudiomute(true);
                              await omnitalk.setAudioMute(true);
                            }}
                          >
                            <AiFillAudio color="#fff" fontSize="28px" />
                          </button>
                        </div>
                        <div className="mobile">
                          <button
                            type="button"
                            onClick={async () => {
                              setAudiomute(true);
                              await omnitalk.setAudioMute(true);
                            }}
                          >
                            <AiFillAudio color="#999" fontSize="28px" />
                          </button>
                        </div>
                      </>
                    )}
                    {/* videomute local */}
                    {videomute ? (
                      <>
                        <div className="web">
                          <button
                            type="button"
                            onClick={async () => {
                              setVideomute(false);
                              setLocalmute(false);
                              setRemotemute(false);
                              await omnitalk.setVideoMute(false);
                            }}
                          >
                            <BsCameraVideoOff color="#fff" fontSize="28px" />
                          </button>
                        </div>
                        <div className="mobile">
                          <button
                            type="button"
                            onClick={async () => {
                              setVideomute(false);
                              setLocalmute(false);
                              setRemotemute(false);
                              await omnitalk.setVideoMute(false);
                            }}
                          >
                            <BsCameraVideoOff color="#999" fontSize="28px" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="web">
                          <button
                            type="button"
                            onClick={async () => {
                              setVideomute(true);
                              setLocalmute(true);
                              setRemotemute(true);
                              await omnitalk.setVideoMute(true);
                            }}
                          >
                            <BsFillCameraVideoFill
                              color="#fff"
                              fontSize="28px"
                            />
                          </button>
                        </div>
                        <div className="mobile">
                          <button
                            type="button"
                            onClick={async () => {
                              setVideomute(true);
                              setLocalmute(true);
                              setRemotemute(true);
                              await omnitalk.setVideoMute(true);
                            }}
                          >
                            <BsFillCameraVideoFill
                              color="#999"
                              fontSize="28px"
                            />
                          </button>
                        </div>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        handleLeave();
                      }}
                    >
                      <img
                        src="https://user-images.githubusercontent.com/99234582/216007148-8311385f-b6c4-4f45-a4bc-89690c3c38e9.svg"
                        alt="종료"
                      />
                    </button>
                    <div className="device_modal">
                      {audio && (
                        <>
                          <div className="select_wrap">
                            <select
                              onChange={handleAudioDevice}
                              defaultValue={audioinputSelect}
                            >
                              {Object.values(audioInput).map((list, i) => {
                                return (
                                  <option key={i} value={i}>
                                    {list.label}
                                  </option>
                                );
                              })}
                            </select>
                            <select defaultValue={audiooutputSelect}>
                              {Object.values(audioOutput).map((list, i) => {
                                return (
                                  <option key={i} value={i}>
                                    {list.label}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </>
                      )}
                      {camera && (
                        <>
                          <div className="select_wrap">
                            <select
                              onChange={handleVideoDevice}
                              defaultValue={videoSelect}
                            >
                              {Object.values(videoInput).map((list, i) => {
                                return (
                                  <option key={i} value={i}>
                                    {list.label}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </StyledCallForm>
          )}
        </section>
      </StyledContents>
    </>
  );
}

const StyledContents = styled.div`
  padding-top: 40px;
  padding-bottom: 100px;
  /* background-color: ${palette.gray.boxColor}; */
  section {
    width: 100%;
    padding: 0 3%;
    ${defaultFlexCenter}
    justify-content: space-between;
  }
  @media screen and (max-width: 980px) and (margin: 580px) {
    width: 100%;
  }
  @media screen and (max-width: 579px) and (min-width: 230px) {
    width: 100%;
    padding-top: 80px;
    padding-bottom: 80px;
    /* background-color: ${palette.gray.boxColor}; */
    section {
      width: 100%;
      padding: 0 3%;
      ${defaultFlexCenter}
      justify-content: space-between;
    }
  }
`;

const StyledCallForm = styled.div`
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
