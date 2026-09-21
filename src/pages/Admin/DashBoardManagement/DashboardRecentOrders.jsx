import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ORDER_STATUS_INFO = {
  PAID: {
    label: '決済完了',
    color: '#4779df',
    backgroundColor: '#e8f0ff',
  },
  PREPARING: {
    label: '商品準備中',
    color: '#208d78',
    backgroundColor: '#e4f8f3',
  },
  SHIPPING: {
    label: '配送中',
    color: '#705ccb',
    backgroundColor: '#efecff',
  },
  DELIVERED: {
    label: '配送完了',
    color: '#4f8d69',
    backgroundColor: '#e9f5ed',
  },
  CANCELLED: {
    label: 'キャンセル',
    color: '#737e90',
    backgroundColor: '#eff2f6',
  },
  REFUNDED: {
    label: '返金完了',
    color: '#c96757',
    backgroundColor: '#fff0ed',
  },
};

function formatProductName(order) {
  const itemCount = Number(order.itemCount ?? 0);
  const additionalItemCount = Math.max(itemCount - 1, 0);

  if (!order.firstProductName) {
    return '-';
  }

  if (additionalItemCount === 0) {
    return order.firstProductName;
  }

  return `${order.firstProductName} ほか ${additionalItemCount}件`;
}

function formatPrice(amount) {
  return `₩${Number(amount ?? 0).toLocaleString('ja-JP')}`;
}

export default function DashboardRecentOrders({
  recentOrders = [],
}) {
  const navigate = useNavigate();

  return (
    <article className="dashboard-card recent-orders-card">
      <div className="dashboard-card-head">
        <div>
          <h2>最近の注文</h2>
          <p>直近に受付された注文を確認できます。</p>
        </div>

        <button
          type="button"
          className="dashboard-more-button"
          onClick={() => navigate('/admin/orders')}
        >
          すべて表示
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className="dashboard-table-scroll">
        <table className="dashboard-order-table">
          <thead>
            <tr>
              <th>注文番号</th>
              <th>会員名</th>
              <th>商品</th>
              <th>決済金額</th>
              <th>ステータス</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  最近の注文はありません。
                </td>
              </tr>
            ) : (
              recentOrders.map((order) => {
                const statusInfo =
                  ORDER_STATUS_INFO[order.orderStatus] ?? {
                    label: order.orderStatus ?? '-',
                    color: '#737e90',
                    backgroundColor: '#eff2f6',
                  };

                return (
                  <tr key={order.orderId}>
                    <td>{order.orderNumber ?? '-'}</td>

                    <td>{order.memberName ?? '-'}</td>

                    <td>{formatProductName(order)}</td>

                    <td>
                      <strong>
                        {formatPrice(order.totalAmount)}
                      </strong>
                    </td>

                    <td>
                      <span
                        className="order-state"
                        style={{
                          color: statusInfo.color,
                          backgroundColor:
                            statusInfo.backgroundColor,
                        }}
                      >
                        {statusInfo.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
}