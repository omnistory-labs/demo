import React from 'react';
import styled from 'styled-components';
import { CallListBtn } from './DemoBtn';

function Loding({ title, category }) {
  return (
    <StyledLoder>
      {category === 'video' && (
        <>
          <div className="loader_container">
            <div className="loading">
              <span className="loader"> </span>
            </div>
          </div>
          <div className="disabled_container">
            <h3>{title}</h3>
            <button
              type="button"
              className="refresh_button">Refresh
            </button>
            <div className="dot_wrap">
              <span className="dot"> </span> <span className="hyphen"> </span>
              <span className="dot"> </span> <span className="hyphen"> </span>
              <span className="dot"> </span> <span className="hyphen"> </span>
              <span className="dot"> </span>
            </div>
            <h4 htmlFor="call_list">실시간 번호 리스트</h4>
            <ul className="call_list_container">
              <li className="call_list_btn">
                <strong><span> </span> <span>내번호</span></strong>
              </li>
              <li className="call_list_btn">
                <ul className="list_toggle">
                  <li className="list_container">
                    <button type="button">
                      <p>등록된 번호가 없습니다.</p>
                    </button>
                  </li>
                </ul>
                <div className="camera_icon">
                  <video />
                  <img src="https://user-images.githubusercontent.com/120351058/218401284-6d1baf7e-7aaf-497a-b2fa-783d6eaf209d.png" alt="camera" />
                </div>
              </li>
            </ul>
            <CallListBtn
              text="전화걸기" />
          </div>
        </>
      )}
      {category === 'audio'
        && (
          <>
            <div className="loader_container">
              <div className="loading">
                <span className="loader"> </span>
              </div>
            </div>
            <div className="disabled_container"> 
              <h3>{ title}</h3>
              <button
                type="button"
                className="refresh_button">Refresh
              </button>
              <div className="dot_wrap">
                <span className="dot"> </span> <span className="hyphen"> </span>
                <span className="dot"> </span> <span className="hyphen"> </span>
                <span className="dot"> </span> <span className="hyphen"> </span>
                <span className="dot"> </span>
              </div>
              <h4 htmlFor="call_list">실시간 번호 리스트</h4>
              <ul className="call_list_container">
                <li className="call_list_btn">
                  <button type="button" />
                </li>
              </ul>
              <CallListBtn
                text="전화걸기" />
            </div>
          </>
        )}
      
    </StyledLoder>
  );
}

export default Loding;

const StyledLoder = styled.div`

@keyframes mulShdSpin {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255,255,255, 0.2), 2.5em 0em 0 0em rgba(255,255,255, 0.2), 1.75em 1.75em 0 0em rgba(255,255,255, 0.2), 0em 2.5em 0 0em rgba(255,255,255, 0.2), -1.8em 1.8em 0 0em rgba(255,255,255, 0.2), -2.6em 0em 0 0em rgba(255,255,255, 0.5), -1.8em -1.8em 0 0em rgba(255,255,255, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255,255,255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255,255,255, 0.2), 1.75em 1.75em 0 0em rgba(255,255,255, 0.2), 0em 2.5em 0 0em rgba(255,255,255, 0.2), -1.8em 1.8em 0 0em rgba(255,255,255, 0.2), -2.6em 0em 0 0em rgba(255,255,255, 0.2), -1.8em -1.8em 0 0em rgba(255,255,255, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(255,255,255, 0.5), 1.8em -1.8em 0 0em rgba(255,255,255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255,255,255, 0.2), 0em 2.5em 0 0em rgba(255,255,255, 0.2), -1.8em 1.8em 0 0em rgba(255,255,255, 0.2), -2.6em 0em 0 0em rgba(255,255,255, 0.2), -1.8em -1.8em 0 0em rgba(255,255,255, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255,255,255, 0.2), 1.8em -1.8em 0 0em rgba(255,255,255, 0.5), 2.5em 0em 0 0em rgba(255,255,255, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255,255,255, 0.2), -1.8em 1.8em 0 0em rgba(255,255,255, 0.2), -2.6em 0em 0 0em rgba(255,255,255, 0.2), -1.8em -1.8em 0 0em rgba(255,255,255, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(255,255,255, 0.2), 1.8em -1.8em 0 0em rgba(255,255,255, 0.2), 2.5em 0em 0 0em rgba(255,255,255, 0.5), 1.75em 1.75em 0 0em rgba(255,255,255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255,255,255, 0.2), -2.6em 0em 0 0em rgba(255,255,255, 0.2), -1.8em -1.8em 0 0em rgba(255,255,255, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255,255,255, 0.2), 1.8em -1.8em 0 0em rgba(255,255,255, 0.2), 2.5em 0em 0 0em rgba(255,255,255, 0.2), 1.75em 1.75em 0 0em rgba(255,255,255, 0.5), 0em 2.5em 0 0em rgba(255,255,255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255,255,255, 0.2), -1.8em -1.8em 0 0em rgba(255,255,255, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(255,255,255, 0.2), 1.8em -1.8em 0 0em rgba(255,255,255, 0.2), 2.5em 0em 0 0em rgba(255,255,255, 0.2), 1.75em 1.75em 0 0em rgba(255,255,255, 0.2), 0em 2.5em 0 0em rgba(255,255,255, 0.5), -1.8em 1.8em 0 0em rgba(255,255,255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255,255,255, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255,255,255, 0.2), 1.8em -1.8em 0 0em rgba(255,255,255, 0.2), 2.5em 0em 0 0em rgba(255,255,255, 0.2), 1.75em 1.75em 0 0em rgba(255,255,255, 0.2), 0em 2.5em 0 0em rgba(255,255,255, 0.2), -1.8em 1.8em 0 0em rgba(255,255,255, 0.5), -2.6em 0em 0 0em rgba(255,255,255, 0.7), -1.8em -1.8em 0 0em #ffffff;
  }
}

.loader_container{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  z-index: 30;
    .loading{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .loader {
        display: block;
        font-size: 12px;
        width: 1em;
        height: 1em;
        border-radius: 100%;
        position: relative;
        text-indent: -9999em;
        animation: mulShdSpin 1.3s infinite linear;
        transform: translateZ(0);
      }
    }
  }
`;