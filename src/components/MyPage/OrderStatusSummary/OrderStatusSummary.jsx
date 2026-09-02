import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../assets/styles/MyPage/OrderStatusSummary.css";

function OrderStatusSummary({ orderStatus }) {
  return (
    <div className="mp_status">
      {orderStatus.map((s) => (
        <div className="mp_status_item" key={s.label}>
          <div className={`mp_status_icon ${s.count > 0 ? "on" : ""}`}>
            <FontAwesomeIcon icon={s.icon} />
          </div>
          <span className="mp_status_count">{s.count}</span>
          <span className="mp_status_label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export default OrderStatusSummary;
