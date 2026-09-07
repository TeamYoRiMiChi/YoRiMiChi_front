import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import OrderSection from './OrderSection';
import '../../assets/styles/Order/components/CustomsInfo.css';

/**
 * 개인통관고유부호
 *
 * 해외직구는 통관 시 이 번호가 반드시 필요합니다.
 * 등록되어 있지 않으면 주문할 수 없으므로 안내를 띄웁니다.
 *
 * @param {string} code 통관고유부호 (없으면 null)
 */
function CustomsInfo({ code }) {
  return (
    <OrderSection icon={faShieldHalved} title="개인통관고유부호" align="center">
      {code ? (
        <div className="customs-row">
          <strong className="customs-code">{code}</strong>
          <span className="customs-verified">
            <FontAwesomeIcon icon={faCircleCheck} />
            확인 완료
          </span>
        </div>
      ) : (
        <div className="customs-row">
          <span className="customs-empty">등록된 통관고유부호가 없습니다.</span>
          <button type="button" className="customs-register-btn">
            등록하기
          </button>
        </div>
      )}
    </OrderSection>
  );
}

export default CustomsInfo;
