import axiosInstance from "../../axiosInstance";
import { ENDPOINTS } from "../../../config/api";

/**
 * 관리자 상품 한 건 수정
 *
 * PATCH /api/admin/products/{productId}
 *
 * updateData:
 * {
 *   categoryId,
 *   stock,
 *   status
 * }
 */
export const updateAdminProduct = (
  productId,
  updateData
) => {
  return axiosInstance.patch(
    `${ENDPOINTS.ADMIN_PRODUCTS}/${productId}`,
    updateData
  );
};