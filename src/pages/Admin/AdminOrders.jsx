import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faClipboardList,
  faCreditCard,
  faMagnifyingGlass,
  faRotateLeft,
  faRotateRight,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

import AdminStatusBox from "../../components/Admin/Admin_statusBox";
import "./AdminOrders.css";

const initialOrders = [
  {
    orderId: 501,
    memberId: 11,
    orderNumber: "ORD-202609-0001",
    orderType: "OVERSEAS",
    productAmount: 42000,
    shippingFee: 3000,
    customsDuty: 0,
    discountAmount: 3000,
    totalAmount: 42000,
    orderStatus: "PAID",

    member: {
      name: "김서연",
      email: "seoyeon@example.com",
      phone: "010-1234-5678",
    },

    items: [
      {
        orderItemId: 801,
        productId: 1024,
        productName: "홋카이도 연어 사시미",
        priceJpy: 4200,
        priceKrw: 42000,
        quantity: 1,
        itemTotal: 42000,
        saleType: "OVERSEAS",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=160&h=140&fit=crop",
      },
    ],

    payment: {
      paymentMethod: "CARD",
      paymentStatus: "PAID",
      amount: 42000,
      transactionId: "PAY-501-0001",
    },

    shipping: {
      carrier: "",
      trackingNumber: "",
      shippingStatus: "READY",
    },
  },
  {
    orderId: 502,
    memberId: 12,
    orderNumber: "ORD-202609-0002",
    orderType: "GROUP_BUY",
    productAmount: 89000,
    shippingFee: 0,
    customsDuty: 0,
    discountAmount: 0,
    totalAmount: 89000,
    orderStatus: "PREPARING",

    member: {
      name: "이준호",
      email: "junho@example.com",
      phone: "010-2345-6789",
    },

    items: [
      {
        orderItemId: 802,
        productId: 1023,
        productName: "일본 와규 등심",
        priceJpy: 8900,
        priceKrw: 89000,
        quantity: 1,
        itemTotal: 89000,
        saleType: "GROUP_BUY",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=160&h=140&fit=crop",
      },
    ],

    payment: {
      paymentMethod: "CARD",
      paymentStatus: "PAID",
      amount: 89000,
      transactionId: "PAY-502-0002",
    },

    shipping: {
      carrier: "",
      trackingNumber: "",
      shippingStatus: "READY",
    },
  },
  {
    orderId: 503,
    memberId: 13,
    orderNumber: "ORD-202609-0003",
    orderType: "OVERSEAS",
    productAmount: 32000,
    shippingFee: 3000,
    customsDuty: 0,
    discountAmount: 3000,
    totalAmount: 32000,
    orderStatus: "SHIPPING",

    member: {
      name: "박지민",
      email: "jimin@example.com",
      phone: "010-3456-7890",
    },

    items: [
      {
        orderItemId: 803,
        productId: 1022,
        productName: "이치란 돈코츠 라멘",
        priceJpy: 3200,
        priceKrw: 32000,
        quantity: 1,
        itemTotal: 32000,
        saleType: "OVERSEAS",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=160&h=140&fit=crop",
      },
    ],

    payment: {
      paymentMethod: "KAKAO_PAY",
      paymentStatus: "PAID",
      amount: 32000,
      transactionId: "PAY-503-0003",
    },

    shipping: {
      carrier: "CJ대한통운",
      trackingNumber: "123456789012",
      shippingStatus: "SHIPPING",
    },
  },
  {
    orderId: 504,
    memberId: 14,
    orderNumber: "ORD-202609-0004",
    orderType: "GROUP_BUY",
    productAmount: 52000,
    shippingFee: 0,
    customsDuty: 0,
    discountAmount: 2000,
    totalAmount: 50000,
    orderStatus: "DELIVERED",

    member: {
      name: "최민수",
      email: "minsu@example.com",
      phone: "010-4567-8901",
    },

    items: [
      {
        orderItemId: 804,
        productId: 1021,
        productName: "우지 말차 초콜릿",
        priceJpy: 2600,
        priceKrw: 26000,
        quantity: 2,
        itemTotal: 52000,
        saleType: "GROUP_BUY",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=160&h=140&fit=crop",
      },
    ],

    payment: {
      paymentMethod: "CARD",
      paymentStatus: "PAID",
      amount: 50000,
      transactionId: "PAY-504-0004",
    },

    shipping: {
      carrier: "우체국택배",
      trackingNumber: "987654321098",
      shippingStatus: "DELIVERED",
    },
  },
  {
    orderId: 505,
    memberId: 15,
    orderNumber: "ORD-202609-0005",
    orderType: "OVERSEAS",
    productAmount: 55000,
    shippingFee: 3000,
    customsDuty: 0,
    discountAmount: 0,
    totalAmount: 58000,
    orderStatus: "CANCELED",

    member: {
      name: "정하은",
      email: "haeun@example.com",
      phone: "010-5678-9012",
    },

    items: [
      {
        orderItemId: 805,
        productId: 1020,
        productName: "후쿠오카 딸기 모찌",
        priceJpy: 5500,
        priceKrw: 55000,
        quantity: 1,
        itemTotal: 55000,
        saleType: "OVERSEAS",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=160&h=140&fit=crop",
      },
    ],

    payment: {
      paymentMethod: "CARD",
      paymentStatus: "CANCELED",
      amount: 58000,
      transactionId: "PAY-505-0005",
    },

    shipping: {
      carrier: "",
      trackingNumber: "",
      shippingStatus: "CANCELED",
    },
  },
];

const orderTypeText = {
  OVERSEAS: "해외직구",
  GROUP_BUY: "공동구매",
};

const orderStatusText = {
  PAID: "결제 완료",
  PREPARING: "상품 준비",
  SHIPPING: "배송 중",
  DELIVERED: "배송 완료",
  CANCELED: "취소",
  REFUNDED: "환불",
};

const paymentMethodText = {
  CARD: "카드",
  KAKAO_PAY: "카카오페이",
  BANK_TRANSFER: "계좌이체",
};

const paymentStatusText = {
  PENDING: "결제 대기",
  PAID: "결제 완료",
  CANCELED: "결제 취소",
  REFUNDED: "환불 완료",
};

const shippingStatusText = {
  READY: "배송 준비",
  SHIPPING: "배송 중",
  DELIVERED: "배송 완료",
  CANCELED: "배송 취소",
};

function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [keyword, setKeyword] = useState("");
  const [orderType, setOrderType] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [shippingStatus, setShippingStatus] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);

  const totalPages = 5;

  const summary = useMemo(() => {
    return {
      total: orders.length,

      paid: orders.filter(
        (order) => order.payment.paymentStatus === "PAID"
      ).length,

      shipping: orders.filter(
        (order) => order.shipping.shippingStatus === "SHIPPING"
      ).length,

      canceled: orders.filter(
        (order) =>
          order.orderStatus === "CANCELED" ||
          order.orderStatus === "REFUNDED"
      ).length,
    };
  }, [orders]);

  const summaryItems = [
    {
      key: "total",
      label: "전체 주문",
      value: summary.total,
      icon: faClipboardList,
      color: "blue",
    },
    {
      key: "paid",
      label: "결제 완료",
      value: summary.paid,
      icon: faCreditCard,
      color: "green",
    },
    {
      key: "shipping",
      label: "배송 중",
      value: summary.shipping,
      icon: faTruckFast,
      color: "orange",
    },
    {
      key: "canceled",
      label: "취소·환불",
      value: summary.canceled,
      icon: faRotateLeft,
      color: "red",
    },
  ];

  const filteredOrders = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return orders.filter((order) => {
      const keywordMatches =
        !normalizedKeyword ||
        order.orderNumber
          .toLowerCase()
          .includes(normalizedKeyword) ||
        order.member.name
          .toLowerCase()
          .includes(normalizedKeyword) ||
        order.member.email
          .toLowerCase()
          .includes(normalizedKeyword);

      const typeMatches =
        !orderType || order.orderType === orderType;

      const orderStatusMatches =
        !orderStatus || order.orderStatus === orderStatus;

      const shippingStatusMatches =
        !shippingStatus ||
        order.shipping.shippingStatus === shippingStatus;

      return (
        keywordMatches &&
        typeMatches &&
        orderStatusMatches &&
        shippingStatusMatches
      );
    });
  }, [
    orders,
    keyword,
    orderType,
    orderStatus,
    shippingStatus,
  ]);

  const visibleIds = filteredOrders.map(
    (order) => order.orderId
  );

  const isAllSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) => selectedIds.includes(id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((current) =>
        current.filter((id) => !visibleIds.includes(id))
      );

      return;
    }

    setSelectedIds((current) => [
      ...new Set([...current, ...visibleIds]),
    ]);
  };

  const handleSelectOrder = (orderId) => {
    setSelectedIds((current) => {
      if (current.includes(orderId)) {
        return current.filter((id) => id !== orderId);
      }

      return [...current, orderId];
    });
  };

  const handleReset = () => {
    setKeyword("");
    setOrderType("");
    setOrderStatus("");
    setShippingStatus("");
    setPage(1);
  };

  const handleBulkStatusChange = (event) => {
    const nextStatus = event.target.value;

    if (!nextStatus || selectedIds.length === 0) return;

    setOrders((current) =>
      current.map((order) => {
        if (!selectedIds.includes(order.orderId)) {
          return order;
        }

        return {
          ...order,
          orderStatus: nextStatus,
        };
      })
    );

    event.target.value = "";
    setSelectedIds([]);
  };

  const handleShippingChange = (orderId, field, value) => {
    setOrders((current) =>
      current.map((order) => {
        if (order.orderId !== orderId) {
          return order;
        }

        return {
          ...order,
          shipping: {
            ...order.shipping,
            [field]: value,
          },
        };
      })
    );
  };

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
              onChange={(event) => {
                setKeyword(event.target.value);
                setPage(1);
              }}
              placeholder="주문번호, 주문자명 또는 이메일 검색"
            />
          </label>

          <div className="ao-filter-item">
            <span>주문 유형</span>

            <select
              value={orderType}
              onChange={(event) => {
                setOrderType(event.target.value);
                setPage(1);
              }}
            >
              <option value="">전체</option>
              <option value="OVERSEAS">해외직구</option>
              <option value="GROUP_BUY">공동구매</option>
            </select>
          </div>

          <div className="ao-filter-item">
            <span>주문 상태</span>

            <select
              value={orderStatus}
              onChange={(event) => {
                setOrderStatus(event.target.value);
                setPage(1);
              }}
            >
              <option value="">전체</option>
              <option value="PAID">결제 완료</option>
              <option value="PREPARING">상품 준비</option>
              <option value="SHIPPING">배송 중</option>
              <option value="DELIVERED">배송 완료</option>
              <option value="CANCELED">취소</option>
              <option value="REFUNDED">환불</option>
            </select>
          </div>

          <div className="ao-filter-item">
            <span>배송 상태</span>

            <select
              value={shippingStatus}
              onChange={(event) => {
                setShippingStatus(event.target.value);
                setPage(1);
              }}
            >
              <option value="">전체</option>
              <option value="READY">배송 준비</option>
              <option value="SHIPPING">배송 중</option>
              <option value="DELIVERED">배송 완료</option>
              <option value="CANCELED">배송 취소</option>
            </select>
          </div>

          <button
            className="ao-reset-button"
            type="button"
            onClick={handleReset}
          >
            <FontAwesomeIcon icon={faRotateRight} />
            초기화
          </button>
        </div>

        <div className="ao-table-scroll">
          <table className="ao-table">
            <thead>
              <tr>
                <th className="ao-checkbox-cell">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    aria-label="전체 주문 선택"
                  />
                </th>

                <th>주문번호</th>
                <th>주문자</th>
                <th>상품</th>
                <th>주문 유형</th>
                <th>결제금액</th>
                <th>결제정보</th>
                <th>주문상태</th>
                <th>배송정보</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => {
                const firstItem = order.items[0];

                return (
                  <tr key={order.orderId}>
                    <td className="ao-checkbox-cell">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(order.orderId)}
                        onChange={() =>
                          handleSelectOrder(order.orderId)
                        }
                        aria-label={`${order.orderNumber} 선택`}
                      />
                    </td>

                    <td>
                      <div className="ao-order-number">
                        <strong>{order.orderNumber}</strong>
                        <span>주문 ID {order.orderId}</span>
                      </div>
                    </td>

                    <td>
                      <div className="ao-member-info">
                        <strong>{order.member.name}</strong>
                        <span>{order.member.email}</span>
                        <span>{order.member.phone}</span>
                      </div>
                    </td>

                    <td>
                      <div className="ao-product-info">
                        <img
                          src={firstItem.thumbnailUrl}
                          alt={firstItem.productName}
                        />

                        <div>
                          <strong>{firstItem.productName}</strong>

                          <span>
                            {firstItem.quantity}개
                            {order.items.length > 1 &&
                              ` 외 ${order.items.length - 1}건`}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`ao-type-badge ao-type-${order.orderType.toLowerCase()}`}
                      >
                        {orderTypeText[order.orderType]}
                      </span>
                    </td>

                    <td>
                      <div className="ao-price-info">
                        <strong>
                          ₩{order.totalAmount.toLocaleString()}
                        </strong>

                        {order.discountAmount > 0 && (
                          <span>
                            할인 ₩
                            {order.discountAmount.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      <div className="ao-payment-info">
                        <span>
                          {paymentMethodText[
                            order.payment.paymentMethod
                          ]}
                        </span>

                        <strong
                          className={`ao-payment-${order.payment.paymentStatus.toLowerCase()}`}
                        >
                          {
                            paymentStatusText[
                              order.payment.paymentStatus
                            ]
                          }
                        </strong>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`ao-status-badge ao-order-${order.orderStatus.toLowerCase()}`}
                      >
                        {orderStatusText[order.orderStatus]}
                      </span>
                    </td>

                    <td>
                      {order.shipping.shippingStatus ===
                      "DELIVERED" ? (
                        <span className="ao-delivery-complete">
                          배송 완료
                        </span>
                      ) : order.shipping.shippingStatus ===
                        "CANCELED" ? (
                        <span className="ao-delivery-canceled">
                          배송 취소
                        </span>
                      ) : (
                        <div className="ao-shipping-inputs">
                          <select
                            value={order.shipping.carrier}
                            onChange={(event) =>
                              handleShippingChange(
                                order.orderId,
                                "carrier",
                                event.target.value
                              )
                            }
                          >
                            <option value="">택배사 선택</option>
                            <option value="CJ대한통운">
                              CJ대한통운
                            </option>
                            <option value="우체국택배">
                              우체국택배
                            </option>
                            <option value="한진택배">
                              한진택배
                            </option>
                            <option value="롯데택배">
                              롯데택배
                            </option>
                          </select>

                          <input
                            type="text"
                            value={order.shipping.trackingNumber}
                            onChange={(event) =>
                              handleShippingChange(
                                order.orderId,
                                "trackingNumber",
                                event.target.value
                              )
                            }
                            placeholder="운송장 번호"
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredOrders.length === 0 && (
                <tr>
                  <td className="ao-empty" colSpan={9}>
                    조건에 맞는 주문이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="ao-table-footer">
          <div className="ao-bulk-actions">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
              aria-label="전체 주문 선택"
            />

            <select
              defaultValue=""
              disabled={selectedIds.length === 0}
              onChange={handleBulkStatusChange}
            >
              <option value="" disabled>
                선택 주문 상태 변경
              </option>
              <option value="PAID">결제 완료</option>
              <option value="PREPARING">상품 준비</option>
              <option value="SHIPPING">배송 중</option>
              <option value="DELIVERED">배송 완료</option>
              <option value="CANCELED">취소</option>
              <option value="REFUNDED">환불</option>
            </select>

            <span>
              총 {filteredOrders.length}개 주문
            </span>
          </div>

          <div className="ao-pagination">
            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage((current) =>
                  Math.max(1, current - 1)
                )
              }
              aria-label="이전 페이지"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {[1, 2, 3, 4, 5].map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                className={
                  page === pageNumber
                    ? "ao-page-active"
                    : ""
                }
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() =>
                setPage((current) =>
                  Math.min(totalPages, current + 1)
                )
              }
              aria-label="다음 페이지"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default AdminOrders;
