import React from 'react';
import styled from 'styled-components';

function CallingSpinner({ calling }) {
  return (
    <StyledWrap>
      {calling === 'true' ? (
        <div className="loader_active">
          <span className="loader"> </span>
        </div>
      ) : (
        <div className="none_active">
          <span className="loader"> </span>
        </div>   
      )}
      
    </StyledWrap>
  );
}

export default CallingSpinner;

const StyledWrap = styled.div`
@keyframes push {
  0% {
    transform: translate(-50% , 100%)  scale(1);
  }
  15% , 25%{
    transform: translate(-50% , 50%)  scale(1);
  }
  50% , 75% {
    transform: translate(-50%, -30%) scale(0.5);
  }
  80%,  100% {
    transform: translate(-50%, -50%) scale(0);
  }
}
.loader_active{
  position: relative;
  width: 140px;
  height: 140px;
  .loader {
    display: block;
    width: 120px;
    height: 120px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    overflow: hidden;
  }
  .loader:before , .loader:after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width:100px;
    height: 100px;
    border-radius: 50%;
    background: #6495ED;
    transform: translate(-50% , 100%)  scale(0);
    animation: push 2s infinite ease-in;
  }
  .loader:after {
    animation-delay: 1s;
  }
}
.none_active{
  .loader {
    width: 120px;
    height: 120px;
    position: relative;
    overflow: hidden;
  }
  .loader:before , .loader:after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width:100px;
    height: 100px;
    border-radius: 50%;
    background:#FFF;
  }
  .loader:after {
    animation-delay: 1s;
  }
}
`;