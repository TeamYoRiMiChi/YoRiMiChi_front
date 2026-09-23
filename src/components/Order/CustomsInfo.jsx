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
function CustomsInfo({ code, input, onChange, error }) {

  /* 이미 등록된 경우 */
  if (code) {
    return (
      <OrderSection icon={faShieldHalved} title="個人通関固有符号" align="center">
        <div className="customs-row">
          <strong className="customs-code">{code}</strong>
          <span className="customs-verified">
            <FontAwesomeIcon icon={faCircleCheck} />
            確認完了
          </span>
        </div>
      </OrderSection>
    );
  }

  /* 미등록 — 직접 입력 */
  return (
    <OrderSection icon={faShieldHalved} title="個人通関固有符号">
      <div className="customs-input-row">
        <input
          type="text"
          className={`customs-input ${error ? 'is-error' : ''}`}
          value={input}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          placeholder="Pで始まる13桁"
          maxLength={13}
        />

        <a
          className="customs-link"
          href="https://unipass.customs.go.kr"
          target="_blank"
          rel="noreferrer"
        >
          発給を受ける
        </a>
      </div>

      {error && <p className="customs-error">{error}</p>}

      <p className="customs-hint">
        通関時に必ず必要です。関税庁のホームページから無料で発給を受けられます。
        入力された番号は会員情報に保存され、次回の注文から自動で入力されます。
      </p>
    </OrderSection>
  );
}

export default CustomsInfo;
