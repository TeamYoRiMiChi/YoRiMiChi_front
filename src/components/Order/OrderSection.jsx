import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/styles/Order/components/OrderSection.css';

/**
 * 주문 페이지의 카드형 섹션 껍데기
 *
 * 왼쪽에 아이콘 + 제목, 오른쪽에 내용이 들어가는 공통 레이아웃입니다.
 * 배송지·통관부호·주문상품·쿠폰·결제수단이 모두 이 형태를 씁니다.
 *
 * @param {Object}      icon     FontAwesome 아이콘
 * @param {string}      title    섹션 제목
 * @param {ReactNode}   children 오른쪽 내용
 * @param {string}      align    세로 정렬 (start | center)
 */
function OrderSection({ icon, title, children, align = 'start' }) {
  return (
    <section className={`order-section align-${align}`}>
      <div className="order-section-head">
        <span className="order-section-icon">
          <FontAwesomeIcon icon={icon} />
        </span>
        <h2>{title}</h2>
      </div>

      <div className="order-section-body">{children}</div>
    </section>
  );
}

export default OrderSection;
