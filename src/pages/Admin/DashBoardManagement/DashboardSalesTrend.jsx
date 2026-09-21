export default function DashboardSalesTrend({ salesTrend }) {
  const dailySales = salesTrend?.dailySales ?? [];
  const revenues = dailySales.map((day) => Number(day.revenue ?? 0));
  const maxRevenue = Math.max(1, ...revenues);

  const points = dailySales.map((day, index) => ({
    date: day.salesDate,
    x: (index * 700) / Math.max(dailySales.length - 1, 1),
    y: 180 - (Number(day.revenue ?? 0) / maxRevenue) * 140,
  }));

  const linePath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  const fillPath = points.length
    ? `${linePath} L ${points.at(-1).x} 220 L ${points[0].x} 220 Z`
    : '';

  return (
    <article className="dashboard-card sales-card">
      <div className="dashboard-card-head">
        <div>
          <h2>売上推移</h2>
          <p>直近7日間の決済完了注文</p>
        </div>
      </div>

      <div className="sales-amount-row">
        <strong>
          ₩{Number(salesTrend?.totalRevenue ?? 0).toLocaleString('ja-JP')}
        </strong>
      </div>

      <div className="dashboard-line-chart">
        <div className="chart-grid-lines">
          <i /><i /><i /><i />
        </div>

        <svg
          viewBox="0 0 700 220"
          preserveAspectRatio="none"
          role="img"
          aria-label="直近7日間の売上推移"
        >
          <defs>
            <linearGradient id="adminChartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f83f1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4f83f1" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path className="chart-fill" d={fillPath} />
          <path className="chart-line" d={linePath} />

          {points.map((point) => (
            <circle key={point.date} cx={point.x} cy={point.y} r="5" />
          ))}
        </svg>

        <div className="chart-dates">
          {dailySales.map((day) => (
            <span key={day.salesDate}>
              {day.salesDate.slice(5).replace('-', '/')}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}