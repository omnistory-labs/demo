import React, { useState } from "react";
import { TbCheck } from "react-icons/tb";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styled from "styled-components";
import {
  defaultFlexCenter,
  fontSize,
  fontWeight,
  palette,
} from "../style/style";
import { CallListBtn, DisabledBtn } from "../style/DemoBtn";
import Loading from "../style/Loading";
export default function OfferCall({
  loaderDisabled,
  loader,
  refresh,
  callListArr,
  setOfferCallToggle,
  setRingingToggle,
  regiNum,
  setCallee,
  handleOfferCall,
}) {
  const [active, setActive] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [calleeValue, setCalleeValue] = useState("");

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <StyledCallForm>
      <div className="call_form">
        {loaderDisabled ? (
          <Loading title="Video Call" category="video" /> // loading... ui
        ) : (
          loader && (
            <>
              <h3>Video Call</h3>
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
                {/* get list */}
                <li className="call_list_btn">
                  <ul className="list_toggle">
                    <li className="list_container">
                      <button type="button" onClick={handleToggle}>
                        {callListArr.length === 0 ? (
                          <>
                            <p>등록된 번호가 없습니다.</p>
                          </>
                        ) : (
                          <>
                            <p>{calleeValue || "번호를 선택하세요."}</p>
                            {toggle ? (
                              <IoIosArrowUp
                                style={{ color: "#222", fontSize: "18px" }}
                              />
                            ) : (
                              <IoIosArrowDown
                                style={{ color: "#222", fontSize: "18px" }}
                              />
                            )}
                          </>
                        )}
                      </button>
                      {toggle && (
                        <div className="list_btn_wrap">
                          {callListArr.map((list, i) => {
                            return (
                              <div key={i} className="list_btn">
                                {list.state === "busy" ? (
                                  <button
                                    type="button"
                                    className="busy_btn"
                                    disabled
                                  >
                                    <strong>
                                      <span>{list.user_id}</span>
                                      <span>통화중</span>
                                    </strong>
                                  </button>
                                ) : (
                                  <button
                                    // className="active_state"
                                    className={`${
                                      active === list.user_id ? "selected" : ""
                                    }`}
                                    type="button"
                                    value={list.user_id}
                                    onClick={(el) => {
                                      setCallee(el.target.value);
                                      setActive(el.target.value);
                                      setCalleeValue(el.target.value);
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
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="camera_icon">
                <video />
                <img
                  src="https://user-images.githubusercontent.com/120351058/218401284-6d1baf7e-7aaf-497a-b2fa-783d6eaf209d.png"
                  alt="camera"
                />
              </div>

              {!isValid ? (
                <DisabledBtn text="전화걸기" disabled />
              ) : (
                <CallListBtn
                  text="전화걸기"
                  handleOfferCall={handleOfferCall}
                  setRingingToggle={setRingingToggle}
                  setOfferCallToggle={setOfferCallToggle}
                />
              )}
            </>
          )
        )}
      </div>
    </StyledCallForm>
  );
}

const StyledCallForm = styled.div`
  width: 100%;
  .call_form {
    width: 800px;
    height: 800px;
    margin: 0 auto;
    padding: 40px;
    border-radius: 15px;
    background-color: ${palette.white};
    box-shadow: ${palette.shadow};
    position: relative;
    overflow: hidden;
    h3 {
      text-align: center;
      margin-bottom: 20px;
      font-size: 1.5rem;
      font-weight: ${fontWeight.medium};
    }
    .refresh_button {
      position: absolute;
      top: 158px;
      right: 50px;
      color: ${palette.text.light};
      border: 0;
      background-color: ${palette.opacity};
      :hover {
        color: #469bf8;
        cursor: pointer;
      }
    }
    .dot_wrap {
      margin-bottom: 40px;
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
    .camera_icon {
      width: 100%;
      padding-top: 60px;
      position: relative;
      video {
        width: 100%;
        background-color: #0b0a20;
      }
      img {
        position: absolute;
        width: 45%;
        bottom: 3px;
        left: 50%;
        transform: translateX(-50%);
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
    .call_list_container {
      .call_list_btn {
        width: 100%;
        display: flex;
        align-items: center;
        box-shadow: ${palette.shadow};
        position: relative;
        /* loding list */
        button {
          width: 100%;
          padding: 10px;
          color: ${palette.text.default};
          background-color: ${palette.opacity};
          border: 0;
          color: ${palette.text.default};
        }
        .list_toggle {
          width: 100%;
          position: absolute;
          top: 0;
          right: 0;
          z-index: 10;
          .list_container {
            padding: 0 10px;
            border-right: 1px solid ${palette.gray.middle};
            border-left: 1px solid ${palette.gray.middle};
            border-bottom: 1px solid ${palette.gray.middle};
            background-color: ${palette.white};
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            button {
              position: relative;
              ${defaultFlexCenter}
              justify-content: space-between;
              color: ${palette.text.default};
              :hover {
                cursor: pointer;
              }
              p {
                margin: 0;
                font-size: ${fontSize.micro};
              }
            }
          }
          .list_btn_wrap {
            max-height: 320px;
            overflow: auto;
            .list_btn {
              width: 100%;
              border-top: 1px solid ${palette.gray.bright};
              button {
                width: 100%;
                padding: 10px;
                border: 0;
                strong {
                  width: 100%;
                  ${defaultFlexCenter}
                  justify-content: space-between;
                  font-size: ${fontSize.micro};
                  font-weight: ${fontWeight.regular};
                  color: ${palette.text.disabled};
                  .border_bottom {
                    display: inline-block;
                    width: 100%;
                    height: 1px;
                    background-color: ${palette.gray.middle};
                  }
                }
              }
            }
            .list_btn:last-child {
              button {
                border-top: 0;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;
              }
            }
            .selected {
              width: 100%;
              padding: 10px;
              border-top: 0;
              background-color: ${palette.white};
              display: flex;
              justify-content: space-between;
              color: ${palette.main.default};
              font-weight: ${fontWeight.semiBold};
              :hover {
                cursor: pointer;
              }
            }
          }
        }
      }
      /* reginum */
      .call_list_btn:first-child {
        display: block;
        width: 100%;
        padding: 10px;
        text-align: center;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background-color: ${palette.gray.middle};
        strong {
          width: 100%;
          ${defaultFlexCenter}
          justify-content: space-between;
          font-size: ${fontSize.micro};
          font-weight: ${fontWeight.regular};
          color: ${palette.text.default};
        }
      }
    }
    .btn_wrap {
      position: relative;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      ${defaultFlexCenter}
      button {
        cursor: pointer;
        color: #fff;
        background-color: #333;
        font-size: 30px;
        border: 0;
        border-radius: 100px;
      }
      .select_wrap {
        width: 100%;
        position: absolute;
        bottom: -30px;
        left: 0;
        ${defaultFlexCenter}
        select {
          width: 100%;
          height: 30px;
        }
      }
    }
  }
  @media screen and (max-width: 980px) and (min-width: 230px) {
    width: 100%;
    .call_form {
      width: 100%;
      padding: 30px;
      h4 {
        font-size: 1.1rem;
      }
      .call_list_container {
        .call_list_btn {
          width: 100%;
          display: flex;
          align-items: center;
          box-shadow: ${palette.shadow};
          /* loding list */
          button {
            width: 100%;
            padding: 10px;
            color: ${palette.text.default};
            background-color: ${palette.opacity};
            border: 0;
          }
        }
        /* reginum */
        .call_list_btn:first-child {
          display: block;
          width: 100%;
          padding: 10px;
          text-align: center;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          background-color: ${palette.gray.middle};
          strong {
            width: 100%;
            ${defaultFlexCenter}
            justify-content: space-between;
            font-size: ${fontSize.micro};
            font-weight: ${fontWeight.regular};
            color: ${palette.text.default};
          }
        }
        .list_btn {
          /* border: 1px solid red; */
          button {
            width: 100%;
          }
          .active_state {
            width: 100%;
          }
          .selected {
            width: 100%;
          }
        }
      }
      .camera_icon {
        position: relative;
        video {
          width: 100%;
          height: 400px;
          background-color: #0b0a20;
        }
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
`;
