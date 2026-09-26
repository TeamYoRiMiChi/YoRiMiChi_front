import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../../assets/styles/MyPage/OrderHistory.css";
import { useOrderHistory } from "../../../hooks/MyPage/OrderHistory/useOrderHistory";
import Pagination from "../../Admin/common/AdminPagination";
import OrderDetailModal from "./OrderDetailModal";

const orderStatusText = {
  PAID: "決済完了",
  PREPARING: "商品準備中",
  SHIPPING: "配送中",
  DELIVERED: "配送完了",
  CANCELLED: "キャンセル",
  REFUNDED: "返金完了",
};

const cancellableOrderStatuses = ["PAID", "PREPARING", "SHIPPING", "DELIVERED"];

const formatDate = (date) => {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleDateString("ja-JP");
};

function OrderHistory() {
  const { pagination, isLoading, error, cancellingOrderId, handleCancelOrder } =
    useOrderHistory();

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const openModal = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const closeModal = () => {
    setSelectedOrderId(null);
  };

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
            <FontAwesomeIcon icon={faBoxOpen} />
          </div>
          <p className="mp_empty_title">まだ注文履歴がありません</p>
          <p className="mp_empty_desc">
            商品を注文すると、ここで注文内容と配送状況を確認できます。
          </p>
          <Link to="/overseas" className="mp_empty_bt">
            商品を見てみる
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mp_panel">
      {pagination.visible.map((order) => {
        const orderStatusClass = order.orderStatus?.toLowerCase() ?? "";

        const canCancel = cancellableOrderStatuses.includes(order.orderStatus);

        return (
          <div className="order_card" key={order.orderId}>
            <div className="order_head">
              <div>
                <span className="order_date">
                  {formatDate(order.orderedAt)}
                </span>
                <span className="order_num">{order.orderNumber}</span>
              </div>

              <span className={`badge badge_${orderStatusClass}`}>
                {orderStatusText[order.orderStatus] ?? order.orderStatus}
              </span>
            </div>

            <ul className="order_items">
              {(order.items ?? []).map((item, index) => (
                <li key={`${order.orderId}-${index}`}>
                  {item.thumbnailUrl ? (
                    <img
                      className="order_thumb"
                      src={item.thumbnailUrl}
                      alt={item.productName}
                    />
                  ) : (
                    <div className="order_thumb" />
                  )}

                  <div className="order_item_info">
                    <p className="order_item_name">{item.productName}</p>
                    <p className="order_item_sub">
                      {Number(item.priceJpy).toLocaleString("ja-JP")}￥ ·{" "}
                      {item.quantity}個
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="order_foot">
              <span className="order_total">
                総額{" "}
                <strong>
                  {Number(order.totalAmount).toLocaleString("ja-JP")}￥
                </strong>
              </span>

              <div className="order_btns">
                {canCancel && (
                  <button
                    type="button"
                    className="mini_bt mini_bt_cancel"
                    disabled={cancellingOrderId !== null}
                    onClick={() => handleCancelOrder(order.orderId)}
                  >
                    {cancellingOrderId === order.orderId
                      ? "キャンセル中..."
                      : "注文キャンセル"}
                  </button>
                )}

                <button
                  type="button"
                  className="mini_bt mini_bt_line"
                  onClick={() => openModal(order.orderId)}
                >
                  注文詳細
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <Pagination
        totalCount={pagination.totalItems}
        totalLabel="件の注文"
        page={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={pagination.goPage}
      />

      {selectedOrderId && (
        <OrderDetailModal
          orderId={selectedOrderId}
          onClose={closeModal}
          onCancel={handleCancelOrder}
          isCancelling={cancellingOrderId === selectedOrderId}
        />
      )}
    </div>
  );
}

export default OrderHistory;
