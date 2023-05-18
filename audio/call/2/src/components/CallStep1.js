import { StyledContents } from "../style/style";

export default function CallStep1({
  handleCreateSession,
  handleChange,
  regiNum,
}) {
  return (
    <StyledContents>
      <h2>Audio Call</h2>
      <div className="input_container">
        <input
          type="text"
          value={regiNum}
          name="createSession"
          placeholder="번호를 등록해 주세요."
          onChange={handleChange}
        />
        <p>
          <span>* </span>특수문자를 제외한 숫자, 문자, 이메일 주소 등을
          입력하세요.
        </p>
        <div className="bottom">
          <button
            type="button"
            disabled={regiNum === "" ? true : false}
            onClick={() => {
              handleCreateSession();
            }}
          >
            번호등록
          </button>
        </div>
      </div>
    </StyledContents>
  );
}
