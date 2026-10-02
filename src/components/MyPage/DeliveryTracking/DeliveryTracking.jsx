import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faCircleCheck,
  faCircleXmark,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/MyPage/DeliveryTracking.css";
import { useDeliveryTracking } from "../../../hooks/MyPage/DeliveryTracking/useDeliveryTracking";
import Pagination from "../../Admin/common/AdminPagination";

const shippingStatusText = {
  PREPARING: "発送準備中",
  SHIPPING: "配送中",
  DELIVERED: "配送完了",
  CANCELLED: "配送キャンセル",
};

const shippingStatusStep = {
  PREPARING: 0,
  SHIPPING: 1,
  DELIVERED: 2,
};

const formatDate = (date) => {
  if (!date) {
    return "-";
  }

  return new Date(date)
    .toLocaleDateString("ja-JP", {
      month: "2-digit",
      day: "2-digit",
    })
    .replace("/", ".");
};

const getCurrentStepIndex = (delivery) => {
  if (delivery.shippingStatus !== "CANCELLED") {
    return shippingStatusStep[delivery.shippingStatus] ?? 0;
  }

  if (delivery.deliveredAt) {
    return 2;
  }

  if (delivery.shippedAt) {
    return 1;
  }

  return 0;
};

function DeliveryTracking() {
  const { pagination, isLoading, error } = useDeliveryTracking();

  if (isLoading) {
    return (
      <div className="mp_panel">
        <p className="mp_status mp_status_loading">読み込み中です...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mp_panel">
        <p className="mp_status mp_status_error">{error}</p>
      </div>
    );
  }

  if (pagination.visible.length === 0) {
    return (
      <div className="mp_panel">
        <div className="mp_empty">
          <div className="mp_empty_icon">
            <FontAwesomeIcon icon={faTruckFast} />
          </div>
          <p className="mp_empty_title">配送情報がありません</p>
          <p className="mp_empty_desc">
            商品を注文すると、ここで配送状況を確認できます。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mp_panel">
      {pagination.visible.map((delivery) => {
        const extraItemCount = Math.max(Number(delivery.itemCount) - 1, 0);

        const maxProductNameLength = extraItemCount > 0 ? 12 : 20;

        const firstProductName = delivery.firstProductName ?? "商品情報なし";

        const shortenedProductName =
          firstProductName.length > maxProductNameLength
            ? `${firstProductName.slice(0, maxProductNameLength)}...`
            : firstProductName;

        const productText =
          extraItemCount > 0
            ? `${shortenedProductName}　他${extraItemCount}件`
            : shortenedProductName;

        const isCancelled = delivery.shippingStatus === "CANCELLED";

        const currentStepIndex = getCurrentStepIndex(delivery);

        const statuses = [
          {
            icon: faWarehouse,
            label: "発送準備中",
            date: delivery.createdAt,
          },
          {
            icon: faTruckFast,
            label: "配送中",
            date: delivery.shippedAt,
          },
          {
            icon: faCircleCheck,
            label: "配送完了",
            date: delivery.deliveredAt,
          },
        ];

        if (isCancelled) {
          statuses[currentStepIndex] = {
            icon: faCircleXmark,
            label: "配送キャンセル",
            date: delivery.cancelledAt,
          };
        }

        const shippingStatusClass =
          delivery.shippingStatus?.toLowerCase() ?? "";

        return (
          <div className="ship_card" key={delivery.orderId}>
            <div className="ship_head">
              <div>
                <span className="order_num">{delivery.orderNumber}</span>

                <p className="ship_product">{productText}</p>

                {(delivery.carrier || delivery.trackingNumber) && (
                  <p className="ship_carrier">
                    {delivery.carrier}
                    {delivery.carrier && delivery.trackingNumber && " · "}
                    {delivery.trackingNumber}
                  </p>
                )}
              </div>

              <span className={`badge badge_${shippingStatusClass}`}>
                {shippingStatusText[delivery.shippingStatus] ??
                  delivery.shippingStatus}
              </span>
            </div>

            <div className="ship_track">
              {statuses.map((status, index) => {
                const done = index <= currentStepIndex;
                const now = index === currentStepIndex;
                const cancelled = isCancelled && now;

                return (
                  <div className="track_item" key={status.label}>
                    <div
                      className={`track_dot ${
                        done ? "done" : ""
                      } ${now ? "now" : ""} ${cancelled ? "cancelled" : ""}`}
                    >
                      <FontAwesomeIcon icon={status.icon} />
                    </div>

                    <span
                      className={`track_label ${cancelled ? "cancelled" : ""}`}
                    >
                      {status.label}
                    </span>

                    <span className="track_date">
                      {formatDate(status.date)}
                    </span>

                    {index < statuses.length - 1 && (
                      <div
                        className={`track_line ${
                          index < currentStepIndex ? "done" : ""
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <Pagination
        totalCount={pagination.totalItems}
        totalLabel="件の配送"
        page={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={pagination.goPage}
      />
    </div>
  );
}

export default DeliveryTracking;
