function ProfileManagement({ user }) {
  return (
    <div className="mp_panel">
      <form className="form_box">
        <div className="form_row">
          <label>이메일</label>
          <input type="email" value={user.email} disabled />
          <span className="form_hint">이메일은 변경할 수 없어요</span>
        </div>

        <div className="form_row">
          <label>이름</label>
          <input type="text" defaultValue={user.name} />
        </div>

        <div className="form_row">
          <label>휴대폰 번호</label>
          <div className="form_inline">
            <input type="tel" defaultValue="010-1234-5678" />
            <button type="button" className="mini_bt mini_bt_line">
              인증
            </button>
          </div>
        </div>

        <div className="form_divider" />

        <div className="form_row">
          <label>새 비밀번호</label>
          <input type="password" placeholder="영문·숫자 포함 8자 이상" />
        </div>

        <div className="form_row">
          <label>새 비밀번호 확인</label>
          <input type="password" placeholder="한 번 더 입력해 주세요" />
        </div>

        <button type="submit" className="wide_bt">
          저장하기
        </button>
      </form>
    </div>
  );
}

export default ProfileManagement;
