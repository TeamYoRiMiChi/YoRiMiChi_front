import useAdminDashboard from '../../../hooks/Admin/DashBoardManagement/useAdminDashboard';
import DashboardSummary from './DashboardSummary';
import DashboardSalesTrend from './DashboardSalesTrend';
import DashboardOrderStatus from './DashboardOrderStatus';
import DashboardRecentOrders from './DashboardRecentOrders';
import './AdminPage.css';

export default function AdminPage() {
  const {
    summary,
    salesTrend,
    orderStatus,
    recentOrders,
    loading,
    error,
  } = useAdminDashboard();

 const today = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

const hasDashboardData =
    summary !== null &&
    salesTrend !== null &&
    orderStatus !== null;

 return (
    <div className="admin-dashboard-page">
      <header className="dashboard-title-row">
        <div>
          <span className="dashboard-kicker">
            OVERVIEW
          </span>

          <h1>管理者ダッシュボード</h1>

          <p>
            本日の運営状況をひと目で確認できます。
          </p>
        </div>

        <time>{today}</time>
      </header>

      {loading ? (
        <article className="dashboard-card dashboard-state-card">
          データを読み込んでいます。
        </article>
      ) : error ? (
        <article className="dashboard-card dashboard-state-card error">
          {error}
        </article>
      ) : !hasDashboardData ? (
        <article className="dashboard-card dashboard-state-card">
          表示できるダッシュボードデータがありません。
        </article>
      ) : (
        <>
          <DashboardSummary
            summary={summary}
          />

          <section className="dashboard-middle-grid">
            <DashboardSalesTrend
              salesTrend={salesTrend}
            />

            <DashboardOrderStatus
              orderStatus={orderStatus}
            />
          </section>

          <section className="dashboard-bottom-grid dashboard-bottom-grid-single">
            <DashboardRecentOrders
              recentOrders={recentOrders}
            />
          </section>
        </>
      )}
    </div>
  );
}