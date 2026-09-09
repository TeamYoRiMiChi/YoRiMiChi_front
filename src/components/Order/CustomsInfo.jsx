import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import OrderSection from './OrderSection';
import '../../assets/styles/Order/components/CustomsInfo.css';

/**
 * 개인통관고유부호
 *
 * 해외직구는 통관 시 이 번호가 반드시 필요합니다.
 * 회원 정보에 저장된 값이 있으면 그대로 보여주고,
 * 없으면 여기서 입력받아 주문과 함께 저장합니다.
 *
 * @param {string}   code     회원 정보에 저장된 통관부호 (없으면 null)
 * @param {string}   input    입력값
 * @param {Function} onChange 입력 콜백
 */
function CustomsInfo({ code, input, onChange }) {

  /* 이미 등록된 경우 */
  if (code) {
    return (
      <OrderSection icon={faShieldHalved} title="개인통관고유부호" align="center">
        <div className="customs-row">
          <strong className="customs-code">{code}</strong>
          <span className="customs-verified">
            <FontAwesomeIcon icon={faCircleCheck} />
            확인 완료
          </span>
        </div>
      </OrderSection>
    );
  }

  /* 미등록 — 직접 입력 */
  return (
    <OrderSection icon={faShieldHalved} title="개인통관고유부호">
      <div className="customs-input-row">
        <input
          type="text"
          className="customs-input"
          value={input}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          placeholder="P로 시작하는 13자리"
          maxLength={13}
        />

        <a
          className="customs-link"
          href="https://unipass.customs.go.kr"
          target="_blank"
          rel="noreferrer"
        >
          발급받기
        </a>
      </div>

      <p className="customs-hint">
        통관 시 반드시 필요합니다. 관세청 홈페이지에서 무료로 발급받을 수 있어요.
        입력하신 번호는 회원 정보에 저장되어 다음 주문부터는 자동으로 입력됩니다.
      </p>
    </OrderSection>
  );
}

export default CustomsInfo;
