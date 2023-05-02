import { useState, useCallback } from "react";
import Button from "src/components/atoms/Button";
import Textarea from "src/components/atoms/Textarea";
import { palette } from "src/style";
import styled from "styled-components";
function MessageForm({ omnitalk }) {
  const [typingMessage, setTypingMessage] = useState("");
  const handleChangeTypingMessage = useCallback(event => {
    setTypingMessage(event.target.value);
  }, []);
  const handleSendMesssage = useCallback(async () => {
    const noContent = typingMessage.trim() === "";
    if (noContent) {
      return;
    }
    await omnitalk.sendDataMessage(typingMessage);
    setTypingMessage("");
  }, [omnitalk, typingMessage]);

  return (
    <form>
      <StyledMessageForm>
        <Textarea
          maxLength={400}
          autoFocus
          value={typingMessage}
          onChange={handleChangeTypingMessage}
          onPressEnter={handleSendMesssage}
        />
        <Button withIcon value="send" onClick={handleSendMesssage}></Button>
      </StyledMessageForm>
    </form>
  );
}

export default MessageForm;

const StyledMessageForm = styled.div`
  display: flex;
  align-items: center;
  word-wrap: break-word;
  background-color: #fff;
  padding: 20px;

  textarea {
    width: 100%;
    padding: 10px;
    line-height: 1.5;
    color: #333;
    background-clip: padding-box;
    border-radius: 5px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    border: 1px solid rgba(0, 0, 0, 0.125);
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin-right: 10px;
  }

  button {
    cursor: pointer;
    background-color: ${palette.main.vivid};
    border-color: ${palette.main.vivid};
    height: 40px;
    width: 15%;
    border: none;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
`;
