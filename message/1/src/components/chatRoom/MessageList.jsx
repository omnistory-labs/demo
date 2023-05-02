import { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import MessageItem from "./MessageItem";
function MessageList({ omnitalk, addUserNickname }) {
  const [messages, setMessages] = useState([]);
  const chatWindow = useRef(null);

  const moveScrollToReceiveMessage = useCallback(() => {
    if (chatWindow.current) {
      chatWindow.current.scrollTo({
        top: chatWindow.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);
  const makeMessage = data => {
    return {
      content: data.text,
      time: dayjs(data.date).format("HH:mm"),
      from: data.from,
    };
  };

  const handleReceiveMessage = useCallback(
    async pongData => {
      const newMessage = await makeMessage(pongData);
      setMessages(messages => [...messages, newMessage]);
      moveScrollToReceiveMessage();
    },
    [moveScrollToReceiveMessage]
  );
  omnitalk.onDataMessage = async e => {
    const message = e;
    switch (message.textroom) {
      case "join":
        console.log(`User ${message.username} joined room ${message.room}`);
        await addUserNickname(message.username);
        break;
      case "leave":
        console.log(`User ${message.username} left room ${message.room}`);
        break;
      case "message":
        await handleReceiveMessage(message);
        break;
      default:
        console.log(`Data message: ${message}`);
        break;
    }
  };

  return (
    <>
      <StyledMessageList ref={chatWindow}>
        {messages.map((message, index) => {
          return <MessageItem key={index} message={message} />;
        })}
      </StyledMessageList>
    </>
  );
}

export default MessageList;

const StyledMessageList = styled.div`
  overflow-y: auto;
  height: 440px;
  padding: 30px;
  background-color: #fff;
  width: 100%;
`;
