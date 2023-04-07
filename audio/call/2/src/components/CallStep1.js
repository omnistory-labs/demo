import { CreateSessionBtn, DisabledBtn } from '../style/DemoBtn';
import { StyledContents } from '../style/style';

export default function CallStep1({ handleCreateSession, handleChange, isValid }) {
  return (
    <StyledContents>
      <form className="call_form">
        <h3>Audio Call</h3>
        <div className="dot_wrap">
          <span className="dot_active"> </span> <span className="hyphen"> </span>
          <span className="dot"> </span> <span className="hyphen"> </span>
          <span className="dot"> </span> <span className="hyphen"> </span>
          <span className="dot"> </span>
        </div>
        <label htmlFor="createSession">번호 등록</label>
        <input
          type="text" name="createSession" placeholder="번호를 등록해 주세요." onChange={handleChange} />
        <p> <span>* </span>특수문자를 제외한 숫자, 문자, 이메일 주소 등을
          입력하세요.
        </p>
        {!isValid ? <DisabledBtn text="번호등록" disabled /> : (
          <CreateSessionBtn
            text="번호등록"
            handleCreateSession={handleCreateSession}
          />
        )}
        
      </form>
    </StyledContents>
  );
}
