import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faCreditCard,
  faMagnifyingGlass,
  faRotateLeft,
  faRotateRight,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

import AdminStatusBox from "../../../components/Admin/common/Admin_statusBox";
import AdminPagination from "../../../components/Admin/common/AdminPagination";
import AdminOrderTable from "../../../components/Admin/OrdersManagement/AdminOrderTable";
import AdminOrderDetailModal from "../../../components/Admin/OrdersManagement/AdminOrderDetailModal";

import useAdminOrders from "../../../hooks/Admin/OrdersManagement/useAdminOrders";
import useAdminOrderSummary from "../../../hooks/Admin/OrdersManagement/useAdminOrderSummary";
import useAdminOrderStatusUpdate from "../../../hooks/Admin/OrdersManagement/useAdminOrderStatusUpdate";
import useAdminPaymentStatusUpdate from "../../../hooks/Admin/OrdersManagement/useAdminPaymentStatusUpdate";
import useAdminShippingInfoUpdate from "../../../hooks/Admin/OrdersManagement/useAdminShippingInfoUpdate";
import useAdminOrderDetail from "../../../hooks/Admin/OrdersManagement/useAdminOrderDetail";

import "../../../assets/styles/Admin/OrdersManagement/AdminOrders.css";
import "../../../assets/styles/Admin/OrdersManagement/AdminOrderTable.css";

function AdminOrders() {
  const {
    orders,
    keyword,
    orderType,
    orderStatus,
    shippingStatus,
    page,
    totalCount,
    totalPages,
    handleKeywordChange,
    handleOrderTypeChange,
    handleOrderStatusChange,
    handleShippingStatusChange,
    handlePageChange,
    handleReset,
    refetchOrders,
  } = useAdminOrders();

  const {
    orderDetail,
    isOrderDetailLoading,
    isOrderDetailOpen,
    openOrderDetail,
    closeOrderDetail,
  } = useAdminOrderDetail();

  const { summary, refetchOrderSummary } = useAdminOrderSummary();

  const { handleOrderStatusUpdate, isOrderStatusUpdating } =
    useAdminOrderStatusUpdate({
      refetchOrders,
      refetchOrderSummary,
    });

  const { handlePaymentStatusUpdate, isPaymentStatusUpdating } =
    useAdminPaymentStatusUpdate({
      refetchOrders,
      refetchOrderSummary,
    });

  const { handleShippingInfoUpdate, isShippingInfoUpdating } =
    useAdminShippingInfoUpdate({
      refetchOrders,
    });

  const isBusy =
    isOrderStatusUpdating || isPaymentStatusUpdating || isShippingInfoUpdating;

  const summaryItems = [
    {
      key: "total",
      label: "全注文",
      value: summary.totalCount,
      icon: faClipboardList,
      color: "blue",
    },
    {
      key: "paid",
      label: "決済完了",
      value: summary.paidCount,
      icon: faCreditCard,
      color: "cyan",
    },
    {
      key: "preparing",
      label: "商品準備中",
      value: summary.preparingCount,
      icon: faClipboardList,
      color: "orange",
    },
    {
      key: "shipping",
      label: "配送中",
      value: summary.shippingCount,
      icon: faTruckFast,
      color: "purple",
    },
    {
      key: "delivered",
      label: "配送完了",
      value: summary.deliveredCount,
      icon: faTruckFast,
      color: "green",
    },
    {
      key: "cancelled",
      label: "キャンセル",
      value: summary.cancelledCount,
      icon: faRotateLeft,
      color: "red",
    },
    {
      key: "refunded",
      label: "返金",
      value: summary.refundedCount,
      icon: faCreditCard,
      color: "pink",
    },
  ];

  return (
    <div className="ao-page">
      <header className="ao-page-header">
        <div>
          <h2>注文管理</h2>
          <p>注文・決済・配送状況を管理します。</p>
        </div>
      </header>

      <AdminStatusBox items={summaryItems} />

      <section className="ao-panel">
        <div className="ao-filter-bar">
          <label className="ao-search-box">
            <FontAwesomeIcon icon={faMagnifyingGlass} />

            <input
              type="search"
              value={keyword}
              placeholder="注文番号またはメールアドレスで検索"
              onChange={handleKeywordChange}
              disabled={isBusy}
            />
          </label>

          <div className="ao-filter-item">
            <span>注文種別</span>

            <select
              value={orderType}
              onChange={handleOrderTypeChange}
              disabled={isBusy}
            >
              <option value="">すべて</option>
              <option value="NORMAL">海外購入</option>
              <option value="GROUP_BUY">共同購入</option>
              <option value="MIXED">混合注文</option>
            </select>
          </div>

          <div className="ao-filter-item">
            <span>注文ステータス</span>

            <select
              value={orderStatus}
              onChange={handleOrderStatusChange}
              disabled={isBusy}
            >
              <option value="">すべて</option>
              <option value="PAID">決済完了</option>
              <option value="PREPARING">商品準備中</option>
              <option value="SHIPPING">配送中</option>
              <option value="DELIVERED">配送完了</option>
              <option value="CANCELLED">キャンセル</option>
              <option value="REFUNDED">返金</option>
            </select>
          </div>

          <div className="ao-filter-item">
            <span>配送ステータス</span>

            <select
              value={shippingStatus}
              onChange={handleShippingStatusChange}
              disabled={isBusy}
            >
              <option value="">すべて</option>
              <option value="PREPARING">発送準備中</option>
              <option value="SHIPPING">配送中</option>
              <option value="DELIVERED">配送完了</option>
              <option value="CANCELLED">配送キャンセル</option>
            </select>
          </div>

          <button
            type="button"
            className="ao-reset-button"
            onClick={handleReset}
            disabled={isBusy}
          >
            <FontAwesomeIcon icon={faRotateRight} />
            リセット
          </button>
        </div>

        <AdminOrderTable
          orders={orders}
          onOpenDetail={openOrderDetail}
          onOrderStatusChange={handleOrderStatusUpdate}
          onPaymentStatusChange={handlePaymentStatusUpdate}
          onShippingSave={handleShippingInfoUpdate}
        />

        <AdminPagination
          totalCount={totalCount}
          totalLabel="件の注文"
          page={page}
          totalPages={totalPages}
          onPageChange={(nextPage) => {
            if (!isBusy) {
              handlePageChange(nextPage);
            }
          }}
        />
      </section>

      {isOrderDetailOpen && (
        <AdminOrderDetailModal
          orderDetail={orderDetail}
          isLoading={isOrderDetailLoading}
          onClose={closeOrderDetail}
        />
      )}
    </div>
  );
}

export default AdminOrders;
