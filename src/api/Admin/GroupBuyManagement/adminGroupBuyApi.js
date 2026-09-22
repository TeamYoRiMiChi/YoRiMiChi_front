import axiosInstance from "../../axiosInstance";
import { ENDPOINTS } from "../../../config/api";

const DEFAULT_PAGE_SIZE = 10;

/**
 * 관리자 공동구매 목록
 *
 * GET /api/admin/group-buys
 */
export const getAdminGroupBuys = ({
  keyword,
  status,
  progress,
  sortBy,
  sortDirection,
  page = 1,
  size = DEFAULT_PAGE_SIZE,
} = {}) => {
  const params = {
    page,
    size,
  };

  if (keyword?.trim()) {
    params.keyword = keyword.trim();
  }

  if (status) {
    params.status = status;
  }

  if (progress) {
    params.progress = progress;
  }

  if (sortBy) {
    params.sortBy = sortBy;
  }

  if (sortDirection) {
    params.sortDirection = sortDirection;
  }

  return axiosInstance.get(ENDPOINTS.ADMIN_GROUP_BUYS, {
    params,
  });
};

/**
 * 관리자 공동구매 신규 등록
 *
 * POST /api/admin/group-buys
 *
 * 이미 판매유형이 GROUP_BUY로 등록된 기존 상품에 새 모집 라운드를 엽니다.
 * (상품 자체 생성은 상품관리의 createAdminProduct를 사용합니다.)
 *
 * registerData:
 * {
 *   productId,
 *   title,
 *   description,
 *   targetQuantity,
 *   startDate,
 *   endDate,
 * }
 */
export const createGroupBuy = (registerData) => {
  return axiosInstance.post(ENDPOINTS.ADMIN_GROUP_BUYS, registerData);
};

/**
 * 관리자 공동구매 삭제 (참여자가 없을 때만 가능)
 *
 * DELETE /api/admin/group-buys/{groupBuyId}
 */
export const deleteAdminGroupBuy = (groupBuyId) => {
  return axiosInstance.delete(ENDPOINTS.ADMIN_GROUP_BUY_DETAIL(groupBuyId));
};

/**
 * 관리자 공동구매 상세
 *
 * GET /api/admin/group-buys/{groupBuyId}
 */
export const getAdminGroupBuyDetail = (groupBuyId) => {
  return axiosInstance.get(ENDPOINTS.ADMIN_GROUP_BUY_DETAIL(groupBuyId));
};

/**
 * 관리자 공동구매 정보 수정 (제목·설명·목표수량·모집기간)
 *
 * PATCH /api/admin/group-buys/{groupBuyId}
 *
 * updateData:
 * {
 *   title,
 *   description,
 *   targetQuantity,
 *   startDate,
 *   endDate,
 * }
 */
export const updateAdminGroupBuy = (groupBuyId, updateData) => {
  return axiosInstance.patch(
    ENDPOINTS.ADMIN_GROUP_BUY_DETAIL(groupBuyId),
    updateData,
  );
};

/**
 * 관리자 공동구매 상태 강제 변경
 *
 * PATCH /api/admin/group-buys/{groupBuyId}/status
 *
 * status: RECRUITING | SUCCESS | FAILED | CANCELLED
 */
export const updateAdminGroupBuyStatus = (groupBuyId, status) => {
  return axiosInstance.patch(
    ENDPOINTS.ADMIN_GROUP_BUY_STATUS_UPDATE(groupBuyId),
    { status },
  );
};
