import "../../../assets/styles/MyPage/MembershipWithdrawal.css";

function MembershipWithdrawal() {
  return (
    <div className="mp_panel">
      <div className="withdraw_box">
        <h3>정말 탈퇴하시겠어요?</h3>
        <ul className="withdraw_list">
          <li>보유하신 쿠폰과 적립금은 모두 소멸됩니다.</li>
          <li>진행 중인 주문과 공동구매는 탈퇴 후에도 계속 진행돼요.</li>
          <li>작성하신 리뷰와 댓글은 삭제되지 않습니다.</li>
          <li>동일한 이메일로 재가입이 가능합니다.</li>
        </ul>

        <label className="withdraw_check">
          <input type="checkbox" />
          <span>위 내용을 모두 확인했습니다</span>
        </label>

        <button className="wide_bt wide_bt_danger">회원 탈퇴하기</button>
      </div>
    </div>
  );
}

export default MembershipWithdrawal;
