import axiosInstance from "../../axiosInstance";
import { ENDPOINTS } from "../../../config/api";

/**
 * 관리자 상품 전체 조회
 *
 * GET /api/admin/products
 *
 * 백엔드에서 관리자 상품 목록을 가져온다.
 */
export const getAdminProducts = () => {
  return axiosInstance.get(
    ENDPOINTS.ADMIN_PRODUCTS
  );
};

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


/**
 * 관리자 상품 등록
 *
 * POST /api/admin/products
 * 프론트에 적은정보들 백엔드로보내기
 */
export const createAdminProduct = (
  productData
) => {
  return axiosInstance.post(
    ENDPOINTS.ADMIN_PRODUCTS,
    productData
  );
};
