import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

function DeliveryTracking({ orderStatuses }) {
  return (
    <div className="mp_panel">
      {orderStatuses.map((order) => (
        <div className="ship_card">
          <div className="ship_head">
            <div>
              <span className="order_num">{order.orderNumber}</span>
              <p className="ship_carrier">
                {order.shipCarrier} · {order.trackingNumber}
              </p>
            </div>
            <span className="badge badge_shipping">{order.deliveryType}</span>
          </div>

          <div className="ship_track">
            {order.statuses.map((status, i, statuses) => (
              <div className="track_item" key={status.label}>
                <div
                  className={`track_dot ${status.done ? "done" : ""} ${status.now ? "now" : ""}`}
                >
                  <FontAwesomeIcon icon={status.icon} />
                </div>
                <span className="track_label">{status.label}</span>
                <span className="track_date">{status.date}</span>
                {i < statuses.length - 1 && (
                  <div className={`track_line ${status.done ? "done" : ""}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mp_tip">
        <FontAwesomeIcon icon={faCircleInfo} />
        <p>
          통관 단계에서 개인통관고유부호가 일치하지 않으면 배송이 지연될 수
          있어요. 등록된 정보를 미리 확인해 주세요.
        </p>
      </div>
    </div>
  );
}

export default DeliveryTracking;
