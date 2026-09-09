import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import OrderSection from './OrderSection';
import '../../assets/styles/Order/components/PaymentMethod.css';

/**
 * 결제 수단 선택
 *
 * @param {Array}    methods  결제 수단 목록
 * @param {string}   selected 선택된 수단 key
 * @param {Function} onSelect 선택 콜백
 */
function PaymentMethod({ methods, selected, onSelect }) {
  return (
    <OrderSection icon={faWallet} title="결제 수단" align="center">
      <ul className="pay-method-list" role="radiogroup" aria-label="결제 수단">
        {methods.map((m) => {
          const isActive = selected === m.key;

          return (
            <li key={m.key}>
              <button
                type="button"
                role="radio"
                aria-checked={isActive}
                className={`pay-method ${isActive ? 'active' : ''}`}
                onClick={() => onSelect(m.key)}
              >
                {isActive && (
                  <FontAwesomeIcon icon={faCircleCheck} className="pay-check" />
                )}

                <FontAwesomeIcon icon={m.icon} className="pay-icon" />
                <span>{m.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </OrderSection>
  );
}

export default PaymentMethod;
