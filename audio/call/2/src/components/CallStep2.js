import React, { useState } from "react";
import { TbCheck } from "react-icons/tb";
import { StyledCallForm } from "../style/style";
import { CallListBtn, DisabledBtn } from "../style/DemoBtn";
import Loading from "../style/Loading";

export default function CallStep2({
  loaderDisabled,
  setOfferCallToggle,
  loader,
  refresh,
  callListArr,
  regiNum,
  setCallee,
  handleOfferCall,
  setRingingToggle,
}) {
  const [active, setActive] = useState("");
  const [isValid, setIsValid] = useState(false);

  return (
    <StyledCallForm>
      <div className="call_form">
        {loaderDisabled ? (
          <Loading title="Audio Call" category="audio" /> // loading... ui
        ) : (
          loader && (
            <>
              <h3>Audio Call</h3>
              <button
                type="button"
                className="refresh_button"
                onClick={refresh}
              >
                Refresh
              </button>
              <div className="dot_wrap">
                <span className="dot_active"> </span>{" "}
                <span className="hyphen_active"> </span>
                <span className="dot_active"> </span>{" "}
                <span className="hyphen"> </span>
                <span className="dot"> </span> <span className="hyphen"> </span>
                <span className="dot"> </span>
              </div>
              <h4 htmlFor="call_list">등록된 번호 리스트</h4>
              <ul className="call_list_container">
                <li className="call_list_btn">
                  <strong>
                    <span>{regiNum}</span> <span>내번호</span>
                  </strong>
                </li>
                {callListArr.length === 0 && (
                  <li className="list_btn">
                    <button type="button">
                      <strong>
                        <span>리스트가 존재하지 않습니다.</span>
                      </strong>
                    </button>
                  </li>
                )}
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
              </ul>
              {!isValid ? (
                <DisabledBtn text="전화걸기" disabled />
              ) : (
                <CallListBtn
                  text="전화걸기"
                  handleOfferCall={handleOfferCall}
                  setRingingToggle={setRingingToggle}
                  setOfferCallToggle={setOfferCallToggle}
                  // setSelectCallee
                />
              )}
            </>
          )
        )}
      </div>
    </StyledCallForm>
  );
}
