const STATUS_INFO = {
  PAID: {
    label: '決済完了',
    color: '#4f83f1',
  },
  PREPARING: {
    label: '商品準備中',
    color: '#55ccb7',
  },
  SHIPPING: {
    label: '配送中',
    color: '#9682e8',
  },
  DELIVERED: {
    label: '配送完了',
    color: '#7fb897',
  },
  CANCELLED: {
    label: 'キャンセル',
    color: '#c7d1e1',
  },
  REFUNDED: {
    label: '返金完了',
    color: '#e88973',
  },
};

export default function DashboardOrderStatus({ orderStatus }) {
 // only return count or 0
  const totalCount = Number(orderStatus?.totalCount ?? 0);

  const statusCounts = new Map(
    (orderStatus?.statuses ?? []).map((item) => [
      item.status,
      Number(item.count ?? 0),
    ])
  );

  const statuses = Object.entries(STATUS_INFO).map(([status, info]) => ({
    status,
    label: info.label,
    color: info.color,
    count: statusCounts.get(status) ?? 0,
  }));

  let accumulatedPercentage = 0;

  const gradientSegments = statuses.map((item) => {
    const percentage =
      totalCount > 0 ? (item.count / totalCount) * 100 : 0;

    const start = accumulatedPercentage;
    const end = accumulatedPercentage + percentage;

    accumulatedPercentage = end;

    return `${item.color} ${start}% ${end}%`;
  });

  const donutBackground =
    totalCount > 0
      ? `conic-gradient(${gradientSegments.join(', ')})`
      : '#e9eef5';

  return (
    <article className="dashboard-card order-status-card">
      <div className="dashboard-card-head">
        <div>
          <h2>注文ステータス</h2>
          <p>本日受付された注文を基準に集計</p>
        </div>
      </div>

      <div className="order-donut-area">
        <div
          className="order-donut"
          style={{ background: donutBackground }}
        >
          <div>
            <span>全注文</span>
            <strong>{totalCount}件</strong>
          </div>
        </div>
      </div>

      <ul className="order-status-list">
        {statuses.map((item) => (
          <li key={item.status}>
            <span>
              <i style={{ backgroundColor: item.color }} />
              {item.label}
            </span>

            <strong>{item.count}件</strong>
          </li>
        ))}
      </ul>
    </article>
  );
}