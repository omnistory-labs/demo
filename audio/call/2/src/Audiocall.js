import Omnitalk from "omnitalk-npm-sdk";
import { useState } from "react";
import styled from "styled-components";
import { StyledAudioCallForm, StyledAudioCall } from "./style/style";
import CallStep1 from "./components/CallStep1";
import CallStep2 from "./components/CallStep2";
import Timer from "./components/hook/Timer";
import { Bell, Ringing } from "./components/media/Ringing";
import CallingSpinner from "./style/CallingSpinner";

const omnitalk = new Omnitalk("SDD7-XBI3-XGC8-NICT", "iffHVaXGUrUiIWl");

export default function AudioCall() {
  const [sessionId, setSessionId] = useState(""); // createSession();
  const [regiNum, setRegiNum] = useState("");
  const [callee, setCallee] = useState(""); // callee 수신자
  const [caller, setCaller] = useState(""); // caller 발신자
  const [callListArr, setCallListArr] = useState([]);
  // ui
  const [loader, setLoader] = useState(false);
  const [loaderDisabled, setLoaderDisabled] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [createToggle, setCreateToggle] = useState(true);
  const [offerCallToggle, setOfferCallToggle] = useState(false);
  const [ringingToggle, setRingingToggle] = useState(false);
  const [answerToggle, setAnswerToggle] = useState(false);
  const [callToggle, setCallToggle] = useState(false);

  // onmessage를 확인하여 omnitalk실행
  omnitalk.onmessage = (e) => {
    console.log(`onmessage : ${JSON.stringify(e)}`); // 이벤트 발생시마다 확인되는 onmessage
    switch (e.cmd) {
      case "SESSION_EVENT":
        console.log(`Create session, ${e.user_id}, ${e.result}`);
        setOfferCallToggle(true);
        setCreateToggle(false);
        // call list
        omnitalk.callList("audiocall").then((result) => {
          setCallListArr(result);
        });
        break;
      case "RINGING_EVENT":
        console.log("Ringing");
        setCaller(e.caller);
        setAnswerToggle(true);
        setOfferCallToggle(false);
        // console.log('user id &&', e.user_id);
        // console.log('session &&', e.session);
        // console.log('cmd &&', e.cmd);
        // console.log('result &&', e.result);
        setTimeout(() => {
          // console.log('user id &&', e.user_id);
          // console.log('session &&', e.session);
          // console.log('cmd &&', e.cmd);
          // console.log('result &&', e.result);
        }, 1000 * 95);
        break;
      case "CONNECTED_EVENT":
        console.log("Connected");
        setCallToggle(true);
        setCreateToggle(false);
        setOfferCallToggle(false);
        setAnswerToggle(false);
        setRingingToggle(false);
        break;
      case "LEAVE_EVENT":
        console.log("Disconnected");
        omnitalk.leave(sessionId.session);
        window.location.reload(true);
        break;
      case "ERROR":
        console.log("error", e.reason);
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
    await omnitalk.offerCall("audiocall", callee, true);
  };

  const handleLeave = async () => {
    await omnitalk.leave(sessionId.session);
    window.location.reload();
  };

  const refresh = (e) => {
    e.preventDefault();
    omnitalk.callList("audiocall").then((result) => {
      setCallListArr(result);
    });
  };

  return (
    <>
      <StyledAudioCall>
        <section>
          {/* 1.번호 등록 */}
          {createToggle ? (
            <CallStep1
              isValid={isValid}
              handleCreateSession={handleCreateSession}
              handleChange={handleChange}
            />
          ) : (
            <></>
          )}

          {/* 2. offer call */}
          {!offerCallToggle ? (
            <></>
          ) : (
            <>
              <CallStep2
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
            <StyledAudioCallForm>
              <h3>Audio Call</h3>
              <div className="dot_wrap">
                <span className="dot_active"> </span>{" "}
                <span className="hyphen_active"> </span>
                <span className="dot_active"> </span>{" "}
                <span className="hyphen_active"> </span>
                <span className="dot_active"> </span>{" "}
                <span className="hyphen"> </span>
                <span className="dot"> </span>
              </div>
              <p className="name">{caller}</p>
              <p className="calling">요청중</p>
              <Bell />
              <div className="calling_spinner">
                <CallingSpinner calling="true" />
              </div>
              <div className="btn_wrap">
                <button
                  type="button"
                  onClick={() => {
                    omnitalk.answerCall();
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
              </div>
            </StyledAudioCallForm>
          )}

          {/* 3. caller */}
          {ringingToggle && (
            <StyledAudioCallForm>
              <h3>Audio Call</h3>
              <div className="dot_wrap">
                <span className="dot_active"> </span>{" "}
                <span className="hyphen_active"> </span>
                <span className="dot_active"> </span>{" "}
                <span className="hyphen_active"> </span>
                <span className="dot_active"> </span>{" "}
                <span className="hyphen"> </span>
                <span className="dot"> </span>
              </div>
              <p className="name">{callee}</p>
              <p className="calling">연결중</p>
              <Ringing />
              <div className="calling_spinner">
                <CallingSpinner calling="true" />
              </div>
              <div className="btn_wrap">
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
              </div>
            </StyledAudioCallForm>
          )}

          {/* 4. Connected */}
          {callToggle && (
            <StyledAudioCallForm>
              <h3>Audio Call</h3>
              <div className="dot_wrap">
                <span className="dot_active"> </span>{" "}
                <span className="hyphen_active"> </span>
                <span className="dot_active"> </span>{" "}
                <span className="hyphen_active"> </span>
                <span className="dot_active"> </span>{" "}
                <span className="hyphen_active"> </span>
                <span className="dot_active"> </span>
              </div>
              <p className="name">{callee || caller}</p>
              <p className="calling">통화중</p>
              <Timer />
              <div className="btn_wrap">
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
              </div>
            </StyledAudioCallForm>
          )}
        </section>
      </StyledAudioCall>
    </>
  );
}
