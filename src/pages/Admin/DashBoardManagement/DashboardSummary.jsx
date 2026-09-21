import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBasketShopping,
    faClock,
    faSackDollar,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

export default function DashboardSummary({ summary }){
     const items = [
    {
      title: '本日の注文',
      value: summary.todayOrderCount,
      unit: '件',
      icon: faBasketShopping,
      color: 'blue',
    },
    { //원화 표시 나중에 엔으로바꾸기.
      title: '本日の売上',
      value: `₩${Number(summary.todayRevenue).toLocaleString('ja-JP')}`,
      icon: faSackDollar,
      color: 'mint',
    },
    {
      title: '新規会員',
      value: summary.newMemberCount,
      unit: '名',
      icon: faUserPlus,
      color: 'purple',
    },
    {
      title: '処理待ち注文',
      value: summary.pendingOrderCount,
      unit: '件',
      icon: faClock,
      color: 'orange',
    },
  ];

  return (
    <section className="dashboard-summary-grid">
      {items.map((item) => (
        <article className="dashboard-summary-card" key={item.title}>
          <div className={`summary-card-icon ${item.color}`}>
            <FontAwesomeIcon icon={item.icon} />
          </div>
          <div className="summary-card-content">
            <span>{item.title}</span>
            <div className="summary-card-value">
              <strong>{item.value}</strong>
              {item.unit && <small>{item.unit}</small>}
            </div>
          </div>
        </article>
      ))}
    </section>


  );
}