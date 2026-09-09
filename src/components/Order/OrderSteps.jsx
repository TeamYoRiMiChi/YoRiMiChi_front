import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Order/components/OrderSteps.css';

/**
 * 주문 진행 단계 표시
 *
 * 바로구매는 장바구니를 거치지 않으므로
 * showCart를 false로 주면 그 단계를 빼고 보여줍니다.
 *
 * @param {string}  current  현재 단계 key (cart | order | done)
 * @param {boolean} showCart 장바구니 단계를 표시할지
 */
function OrderSteps({ current = 'order', showCart = true }) {
  const steps = [
    ...(showCart ? [{ key: 'cart', label: '장바구니', to: '/cart' }] : []),
    { key: 'order', label: '주문 / 결제', to: null },
    { key: 'done', label: '주문완료', to: null },
  ];

  return (
    <nav className="order-steps" aria-label="주문 진행 단계">
      {steps.map((step, i) => {
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

            {i < steps.length - 1 && (
              <FontAwesomeIcon icon={faChevronRight} className="order-step-arrow" />
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default OrderSteps;
