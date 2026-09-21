import { useEffect, useState } from "react";
import {
    getDashboardSummary,
    getDashboardSalesTrend,
    getDashboardOrderStatus,
    getDashboardRecentOrders,
} from "../../../api/Admin/DashBoardManagement/adminDashboardApi";

export default function useAdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [salesTrend, setSalesTrend] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        const [summaryResponse, salesResponse, statusResponse, ordersResponse] =
          await Promise.all([
            getDashboardSummary(),
            getDashboardSalesTrend(),
            getDashboardOrderStatus(),
            getDashboardRecentOrders(),
          ]);

        if (!active) return;

        setSummary(summaryResponse.data.data);
        setSalesTrend(salesResponse.data.data);
        setOrderStatus(statusResponse.data.data);
        setRecentOrders(ordersResponse.data.data);
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ??
              "대시보드 데이터를 불러오지 못했습니다."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  return {
    summary,
    salesTrend,
    orderStatus,
    recentOrders,
    loading,
    error,
  };
}