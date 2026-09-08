import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Order/components/OrderSteps.css';

/**
 * 주문 진행 단계 표시
 *
 * @param {string} current 현재 단계 key (cart | order | done)
 */
const STEPS = [
  { key: 'cart', label: '장바구니', to: '/cart' },
  { key: 'order', label: '주문 / 결제', to: null },
  { key: 'done', label: '주문완료', to: null },
];

function OrderSteps({ current = 'order' }) {
  return (
    <nav className="order-steps" aria-label="주문 진행 단계">
      {STEPS.map((step, i) => {
        const isActive = step.key === current;

        return (
          <span className="order-step-item" key={step.key}>
            {step.to && !isActive ? (
              <Link to={step.to} className="order-step">
                {step.label}
              </Link>
            ) : (
              <span className={`order-step ${isActive ? 'active' : ''}`}>
                {step.label}
              </span>
            )}

            {i < STEPS.length - 1 && (
              <FontAwesomeIcon icon={faChevronRight} className="order-step-arrow" />
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default OrderSteps;
