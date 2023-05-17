import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import { useState } from "react";
import styled from "styled-components";
function ChatRoom({ omnitalk }) {
  const [userList, setUserList] = useState([]);
  const addUserNickname = async (nickname) => {
    setUserList((prevUserList) => [...prevUserList, nickname]);
  };
  return (
    <>
      <StyledRoom>
        <StyledListWrap>
          <StyledUserList>
            <div>
              <span>&lt;참여자&gt;</span>
              {userList.length !== 0 && (
                <ul>
                  {userList.map((user, index) => (
                    <li key={index}>{user}</li>
                  ))}
                </ul>
              )}
            </div>
          </StyledUserList>
          <MessageList omnitalk={omnitalk} addUserNickname={addUserNickname} />
        </StyledListWrap>
        <MessageForm nickname={nickname} omnitalk={omnitalk} />
      </StyledRoom>
    </>
  );
}

export default ChatRoom;

const StyledUserList = styled.div`
  height: 440px;
  padding-left: 40px;
  padding-right: 20px;
  padding-top: 20px;
  background-color: #fff;
  span {
    font-weight: 600;
  }
`;

const StyledRoom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const StyledListWrap = styled.div`
  display: flex;
  width: 100%;
  span {
    margin-right: 10px;
    margin-top: 10px;
  }
  li {
    margin-right: 10px;
    margin-top: 10px;
  }
`;
