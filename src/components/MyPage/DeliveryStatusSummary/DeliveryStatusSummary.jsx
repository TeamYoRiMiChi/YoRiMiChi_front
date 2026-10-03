import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faTruckFast,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import useDeliveryStatusSummary from "../../../hooks/MyPage/MyPage/useDeliveryStatusSummary";
import "../../../assets/styles/MyPage/DeliveryStatusSummary.css";

function DeliveryStatusSummary() {
  const { summary, isLoading, error } = useDeliveryStatusSummary();

  /* ===== 배송 진행 현황 ===== */
  const DELIVERY_STATUS = [
    { icon: faWarehouse, label: "発送準備中", count: summary.preparingCount },
    { icon: faTruckFast, label: "配送中", count: summary.shippingCount },
    { icon: faCircleCheck, label: "配送完了", count: summary.deliveredCount },
    {
      icon: faCircleXmark,
      label: "配送キャンセル",
      count: summary.cancelledCount,
    },
  ];

  if (error) {
    return (
      <div className="mp_panel">
        <p className="mp_status_error">{error}</p>
      </div>
    );
  }

  return (
    <div className="mp_status_summary">
      {DELIVERY_STATUS.map((s) => (
        <div className="mp_status_item" key={s.label}>
          <div className={`mp_status_icon ${s.count > 0 ? "on" : ""}`}>
            <FontAwesomeIcon icon={s.icon} />
          </div>
          <span className="mp_status_count">{isLoading ? "-" : s.count}</span>
          <span className="mp_status_label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export default DeliveryStatusSummary;
