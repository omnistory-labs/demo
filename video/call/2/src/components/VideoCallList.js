import React, { useState } from "react";
import { TbCheck } from "react-icons/tb";
import { StyledCallForm } from "../style/style";
import { CallListBtn, DisabledBtn } from "../style/DemoBtn";
export default function VideoCallList({
  callListArr,
  isValid,
  setCallee,
  setIsValid,
  callListForm,
}) {
  const [active, setActive] = useState("");

  return (
    <>
      {callListArr && (
        <StyledCallForm>
          <form className="call_form">
            <h3>Video Call</h3>
            <div className="dot_wrap">
              <span className="dot_active"> </span>{" "}
              <span className="hyphen"> </span>
              <span className="dot"> </span> <span className="hyphen"> </span>
              <span className="dot"> </span> <span className="hyphen"> </span>
              <span className="dot"> </span>
            </div>
            <div className="container">
              {callListForm && (
                <div className="camera">
                  <video
                    id="Omnitalk-LocalVideo-0"
                    autoPlay
                    muted
                    playsInline
                  />
                </div>
              )}
              <div className="list">
                {callListArr.map((list, i) => {
                  return (
                    <li key={i} className="list_btn">
                      {list.state === "busy" ? (
                        <button type="button" className="busy_btn" disabled>
                          <strong>
                            <span>{list.user_id}</span>
                            <span>통화중</span>
                          </strong>
                          <span className="border_bottom"> </span>
                        </button>
                      ) : (
                        <button
                          // className="active_state"
                          className={`${
                            active === list.user_id
                              ? "selected"
                              : "active_state"
                          }`}
                          type="button"
                          value={list.user_id}
                          onClick={(el) => {
                            setCallee(el.target.value);
                            setActive(el.target.value);
                            setIsValid(true);
                          }}
                        >
                          {list.user_id}
                          {active === list.user_id ? (
                            <TbCheck fontSize="16px" />
                          ) : (
                            ""
                          )}
                        </button>
                      )}
                    </li>
                  );
                })}
              </div>
            </div>

            {!isValid ? (
              <DisabledBtn text="번호등록" disabled />
            ) : (
              <CallListBtn text="전화걸기" />
            )}
          </form>
        </StyledCallForm>
      )}
    </>
  );
}
