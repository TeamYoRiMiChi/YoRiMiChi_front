import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowTrendUp,
  faBasketShopping,
  faChevronRight,
  faClock,
  faSackDollar,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import './AdminPage.css';

const summaryItems = [
  { title: '오늘 주문', value: '128', unit: '건', change: '12%', icon: faBasketShopping, color: 'blue' },
  { title: '오늘 매출', value: '₩4,280,000', change: '18%', icon: faSackDollar, color: 'mint' },
  { title: '신규 회원', value: '34', unit: '명', change: '21%', icon: faUserPlus, color: 'purple' },
  { title: '처리 대기', value: '17', unit: '건', change: '6%', icon: faClock, color: 'orange' },
];

const recentOrders = [
  { id: 'YM-260912-0841', member: '김하늘', product: '홋카이도 버터 샌드 외 2건', price: '₩86,400', status: '결제 완료', type: 'paid' },
  { id: 'YM-260912-0838', member: '이서준', product: '우지 말차 파우더 세트', price: '₩42,000', status: '상품 준비', type: 'ready' },
  { id: 'YM-260912-0832', member: '박지우', product: '나가노 샤인머스캣', price: '₩119,000', status: '배송 중', type: 'shipping' },
  { id: 'YM-260912-0829', member: '최유나', product: '오키나와 흑당 과자 외 1건', price: '₩38,500', status: '배송 완료', type: 'done' },
];

const tasks = [
  { count: 6, title: '공동구매 승인 대기', description: '오늘 등록된 모집을 확인하세요', color: 'blue' },
  { count: 8, title: '미답변 문의', description: '24시간 이상 대기 중인 문의 2건', color: 'purple' },
  { count: 3, title: '재고 부족 상품', description: '재고가 10개 미만인 상품입니다', color: 'orange' },
];

const AdminPage = () => {
  return (
    <div className="admin-dashboard-page">
      <header className="dashboard-title-row">
        <div>
          <span className="dashboard-kicker">OVERVIEW</span>
          <h1>관리자 대시보드</h1>
          <p>오늘의 운영 현황을 한눈에 확인하세요.</p>
        </div>
        <time>2026. 09. 12</time>
      </header>

      <section className="dashboard-summary-grid">
        {summaryItems.map((item) => (
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
              <p className={item.color === 'orange' ? 'increase warning' : 'increase'}>
                <FontAwesomeIcon icon={faArrowTrendUp} /> {item.change}
                <span> 어제보다 증가</span>
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-middle-grid">
        <article className="dashboard-card sales-card">
          <div className="dashboard-card-head">
            <div>
              <h2>최근 7일간 매출 추이</h2>
              <p>결제 완료 주문 기준</p>
            </div>
            <button type="button">최근 7일⌄</button>
          </div>

          <div className="sales-amount-row">
            <strong>₩24,860,000</strong>
            <span><FontAwesomeIcon icon={faArrowTrendUp} /> 14.2%</span>
          </div>

          <div className="dashboard-line-chart">
            <div className="chart-grid-lines"><i /><i /><i /><i /></div>
            <svg viewBox="0 0 700 220" preserveAspectRatio="none" aria-label="매출 추이 그래프">
              <defs>
                <linearGradient id="adminChartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f83f1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#4f83f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path className="chart-fill" d="M0 170 C50 160 76 135 116 140 S185 172 233 130 S307 75 350 96 S425 145 467 104 S540 58 583 72 S655 51 700 28 L700 220 L0 220 Z" />
              <path className="chart-line" d="M0 170 C50 160 76 135 116 140 S185 172 233 130 S307 75 350 96 S425 145 467 104 S540 58 583 72 S655 51 700 28" />
              {[[0,170],[116,140],[233,130],[350,96],[467,104],[583,72],[700,28]].map(([x, y]) => (
                <circle key={x} cx={x} cy={y} r="5" />
              ))}
            </svg>
            <div className="chart-dates">
              <span>09.06</span><span>09.07</span><span>09.08</span><span>09.09</span>
              <span>09.10</span><span>09.11</span><span>09.12</span>
            </div>
          </div>
        </article>

        <article className="dashboard-card order-status-card">
          <div className="dashboard-card-head">
            <div>
              <h2>주문 상태</h2>
              <p>오늘 접수된 주문 기준</p>
            </div>
          </div>
          <div className="order-donut-area">
            <div className="order-donut">
              <div><span>전체 주문</span><strong>128건</strong></div>
            </div>
          </div>
          <ul className="order-status-list">
            <li><span><i className="blue" />결제 완료</span><strong>42건</strong></li>
            <li><span><i className="mint" />상품 준비</span><strong>31건</strong></li>
            <li><span><i className="purple" />배송 중</span><strong>38건</strong></li>
            <li><span><i className="gray" />배송 완료</span><strong>17건</strong></li>
          </ul>
        </article>
      </section>

      <section className="dashboard-bottom-grid">
        <article className="dashboard-card recent-orders-card">
          <div className="dashboard-card-head">
            <div>
              <h2>최근 주문</h2>
              <p>방금 접수된 주문을 확인하세요.</p>
            </div>
            <button type="button" className="dashboard-more-button">
              전체보기 <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <div className="dashboard-table-scroll">
            <table className="dashboard-order-table">
              <thead>
                <tr><th>주문번호</th><th>고객명</th><th>상품</th><th>결제금액</th><th>상태</th></tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td><td>{order.member}</td><td>{order.product}</td>
                    <td><strong>{order.price}</strong></td>
                    <td><span className={`order-state ${order.type}`}>{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="dashboard-card dashboard-task-card">
          <div className="dashboard-card-head">
            <div><h2>처리할 업무</h2><p>우선 확인이 필요한 항목입니다.</p></div>
          </div>
          <div className="dashboard-task-list">
            {tasks.map((task) => (
              <button type="button" className="dashboard-task-item" key={task.title}>
                <b className={task.color}>{task.count}</b>
                <span><strong>{task.title}</strong><small>{task.description}</small></span>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default AdminPage;
