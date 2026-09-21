import axiosInstance from "../../axiosInstance";
import { ENDPOINTS } from "../../../config/api";

export const getDashboardSummary = () =>
  axiosInstance.get(ENDPOINTS.ADMIN_DASHBOARD_SUMMARY);

export const getDashboardSalesTrend = () =>
  axiosInstance.get(ENDPOINTS.ADMIN_DASHBOARD_SALES_TREND);

export const getDashboardOrderStatus = () =>
  axiosInstance.get(ENDPOINTS.ADMIN_DASHBOARD_ORDER_STATUS);

export const getDashboardRecentOrders = () =>
  axiosInstance.get(ENDPOINTS.ADMIN_DASHBOARD_RECENT_ORDERS);