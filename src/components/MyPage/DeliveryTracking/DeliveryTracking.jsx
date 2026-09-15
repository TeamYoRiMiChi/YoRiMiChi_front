import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faWarehouse, faPlaneUp, faFileShield, faHouseChimney, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/MyPage/DeliveryTracking.css";

function DeliveryTracking() {
const orderStatuses = [
  {
    orderNumber: 'YM-20260827-0012',
    shipCarrier: 'Yamato Transport',
    trackingNumber: '1234-5678-9012',
    deliveryType: '국제배송',
    statuses: [
      {
        icon: faWarehouse,
        label: '현지창고',
        date: '08.25',
        done: true,
      },
      {
        icon: faPlaneUp,
        label: '국제배송',
        date: '08.27',
        done: true,
        now: true,
      },
      {
        icon: faFileShield,
        label: '통관중',
        date: '-',
        done: false,
      },
      {
        icon: faHouseChimney,
        label: '국내배송',
        date: '-',
        done: false,
      },
      {
        icon: faCircleCheck,
        label: '배송완료',
        date: '-',
        done: false,
      },
    ],
  },

  {
    orderNumber: 'YM-20260901-0123',
    shipCarrier: 'Takeru Transport',
    trackingNumber: '9012-5678-1234',
    deliveryType: '행성간배송',
    statuses: [
      {
        icon: faWarehouse,
        label: '현지창고',
        date: '09.01',
        done: true,
      },
      {
        icon: faPlaneUp,
        label: '행성간배송',
        date: '09.01',
        done: true,
      },
      {
        icon: faFileShield,
        label: '통관중',
        date: '09.02',
        done: false,
        now: true,
      },
      {
        icon: faHouseChimney,
        label: '대륙간배송',
        date: '-',
        done: false,
      },
      {
        icon: faCircleCheck,
        label: '배송완료',
        date: '-',
        done: false,
      },
    ],
  },
];

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
