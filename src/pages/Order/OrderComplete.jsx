import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import OrderSteps from '../../components/Order/OrderSteps';
import { getOrder, toOrderView } from '../../api/orderApi';
import '../../assets/styles/Order/OrderComplete.css';

/**
 * 주문 완료 페이지
 *
 * 결제 직후에는 useOrder의 handleSubmit이 navigate state로 주문 결과를 바로 넘겨줘서
 * 서버를 다시 부르지 않고 바로 보여줍니다.
 * 새로고침하거나 링크로 바로 들어온 경우엔 state가 없으므로 주문 상세를 다시 불러옵니다.
 */
function OrderComplete() {
  const { orderId } = useParams();
  const location = useLocation();

  const stateOrderDto = location.state?.order ?? null;
  const isDirectPurchase = location.state?.isDirectPurchase ?? false;

  const [order, setOrder] = useState(() => (stateOrderDto ? toOrderView(stateOrderDto) : null));
  const [isLoading, setIsLoading] = useState(!stateOrderDto);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (stateOrderDto) return;

    let ignore = false;

    async function load() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const res = await getOrder(orderId);
        if (!ignore) setOrder(toOrderView(res.data.data));
      } catch (err) {
        if (!ignore) {
          setLoadError(err.response?.data?.message ?? '注文情報の取得に失敗しました。');
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();
    window.scrollTo({ top: 0 });

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  /* 불러오는 중 */
  if (isLoading) {
    return (
      <div className="oc-page">
        <div className="oc-state">읽어오는 중...</div>
      </div>
    );
  }

  /* 실패했거나 주문을 찾을 수 없을 때 */
  if (loadError || !order) {
    return (
      <div className="oc-page">
        <div className="oc-state">
          <p>{loadError ?? '주문 정보를 찾을 수 없습니다.'}</p>
          <Link to="/mypage" className="oc-state-btn">
            마이페이지로 가기
          </Link>
        </div>
      </div>
    );
  }

  const { amounts } = order;

  return (
    <div className="oc-page">
      <div className="oc-page-head">
        <h1>주문 완료</h1>
        <OrderSteps current="done" showCart={!isDirectPurchase} />
      </div>

      <div className="oc-hero">
        <FontAwesomeIcon icon={faCircleCheck} className="oc-hero-icon" />
        <h2>주문이 완료되었습니다.</h2>
        <p className="oc-hero-number">
          주문번호 <strong>{order.orderNumber}</strong>
        </p>
      </div>

      <div className="oc-layout">
        {/* 왼쪽: 배송지 · 상품 */}
        <div className="oc-main">
          <section className="oc-card">
            <h3>배송지</h3>
            <div className="oc-address">
              <p className="oc-address-name">
                {order.address.receiverName}
                <span className="oc-address-phone">{order.address.receiverPhone}</span>
              </p>
              <p>
                ({order.address.postalCode}) {order.address.address} {order.address.addressDetail}
              </p>
              {order.customsCode && (
                <p className="oc-muted">개인통관고유부호 {order.customsCode}</p>
              )}
            </div>
          </section>

          <section className="oc-card">
            <h3>주문 상품</h3>
            <ul className="oc-items">
              {order.items.map((it) => (
                <li key={it.orderItemId} className="oc-item">
                  <div className="oc-item-thumb">
                    {it.thumbnailUrl ? (
                      <img src={it.thumbnailUrl} alt={it.name} />
                    ) : (
                      <div className="oc-item-thumb-empty" />
                    )}
                  </div>
                  <div className="oc-item-info">
                    <span className="oc-item-brand">{it.brand}</span>
                    <span className="oc-item-name">{it.name}</span>
                  </div>
                  <div className="oc-item-qty">{it.quantity}개</div>
                  <div className="oc-item-price">¥{it.itemTotal.toLocaleString()}</div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* 오른쪽: 결제 금액 */}
        <aside className="oc-summary">
          <h3 className="oc-summary-title">결제 금액</h3>

          <dl className="oc-summary-list">
            <div>
              <dt>상품 금액</dt>
              <dd>¥{amounts.productAmount.toLocaleString()}</dd>
            </div>
            <div>
              <dt>배송비</dt>
              <dd>¥{amounts.shippingFee.toLocaleString()}</dd>
            </div>
            <div>
              <dt>관세</dt>
              <dd>¥{amounts.customsDuty.toLocaleString()}</dd>
            </div>
            {amounts.couponDiscount > 0 && (
              <div>
                <dt>쿠폰 할인</dt>
                <dd className="minus">-¥{amounts.couponDiscount.toLocaleString()}</dd>
              </div>
            )}
          </dl>

          <div className="oc-summary-divider" />

          <div className="oc-summary-total">
            <span>총 결제금액</span>
            <strong>¥{amounts.total.toLocaleString()}</strong>
          </div>
        </aside>
      </div>

      <div className="oc-actions">
        <Link to="/mypage" className="oc-btn oc-btn-outline">
          주문 내역 보기
        </Link>
        <Link to="/overseas" className="oc-btn oc-btn-brand">
          쇼핑 계속하기
        </Link>
      </div>
    </div>
  );
}

export default OrderComplete;
