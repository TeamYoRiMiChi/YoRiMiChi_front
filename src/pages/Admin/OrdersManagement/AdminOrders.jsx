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
      label: "전체 주문",
      value: summary.totalCount,
      icon: faClipboardList,
      color: "blue",
    },
    {
      key: "paid",
      label: "결제 완료",
      value: summary.paidCount,
      icon: faCreditCard,
      color: "cyan",
    },
    {
      key: "preparing",
      label: "상품 준비",
      value: summary.preparingCount,
      icon: faClipboardList,
      color: "orange",
    },
    {
      key: "shipping",
      label: "배송 중",
      value: summary.shippingCount,
      icon: faTruckFast,
      color: "purple",
    },
    {
      key: "delivered",
      label: "배송 완료",
      value: summary.deliveredCount,
      icon: faTruckFast,
      color: "green",
    },
    {
      key: "cancelled",
      label: "취소",
      value: summary.cancelledCount,
      icon: faRotateLeft,
      color: "red",
    },
    {
      key: "refunded",
      label: "환불",
      value: summary.refundedCount,
      icon: faCreditCard,
      color: "pink",
    },
  ];

  return (
    <div className="ao-page">
      <header className="ao-page-header">
        <div>
          <h2>주문 관리</h2>
          <p>주문·결제·배송 상태를 관리하세요.</p>
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
              placeholder="주문번호 또는 이메일 검색"
              onChange={handleKeywordChange}
              disabled={isBusy}
            />
          </label>

          <div className="ao-filter-item">
            <span>주문 유형</span>

            <select
              value={orderType}
              onChange={handleOrderTypeChange}
              disabled={isBusy}
            >
              <option value="">전체</option>
              <option value="NORMAL">해외직구</option>
              <option value="GROUP_BUY">공동구매</option>
              <option value="MIXED">혼합 구매</option>
            </select>
          </div>

          <div className="ao-filter-item">
            <span>주문 상태</span>

            <select
              value={orderStatus}
              onChange={handleOrderStatusChange}
              disabled={isBusy}
            >
              <option value="">전체</option>
              <option value="PAID">결제 완료</option>
              <option value="PREPARING">상품 준비</option>
              <option value="SHIPPING">배송 중</option>
              <option value="DELIVERED">배송 완료</option>
              <option value="CANCELLED">취소</option>
              <option value="REFUNDED">환불</option>
            </select>
          </div>

          <div className="ao-filter-item">
            <span>배송 상태</span>

            <select
              value={shippingStatus}
              onChange={handleShippingStatusChange}
              disabled={isBusy}
            >
              <option value="">전체</option>
              <option value="PREPARING">배송 준비</option>
              <option value="SHIPPING">배송 중</option>
              <option value="DELIVERED">배송 완료</option>
              <option value="CANCELLED">배송 취소</option>
            </select>
          </div>

          <button
            type="button"
            className="ao-reset-button"
            onClick={handleReset}
            disabled={isBusy}
          >
            <FontAwesomeIcon icon={faRotateRight} />
            초기화
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
          totalLabel="개 주문"
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
