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


//상품삭제요
export const deleteAdminProduct = (
  productId
) => {
  return axiosInstance.delete(
    `${ENDPOINTS.ADMIN_PRODUCTS}/${productId}`
  );
};

/**
 * 상품 이미지 목록
 *
 * GET /api/admin/products/{productId}/images
 * 대표 이미지가 맨 앞에 옵니다.
 */
export const getAdminProductImages = (
  productId
) => {
  return axiosInstance.get(
    `${ENDPOINTS.ADMIN_PRODUCTS}/${productId}/images`
  );
};

/**
 * 상품 이미지 업로드 (여러 장)
 *
 * POST /api/admin/products/{productId}/images
 * 파일을 multipart/form-data의 files 필드로 보냅니다.
 * 대표 이미지가 아직 없는 상품이면 첫 번째 파일이 대표 이미지가 됩니다.
 */
export const uploadAdminProductImages = (
  productId,
  files
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  // 이미지가 여러 장이면 기본 제한 시간(10초)보다 오래 걸릴 수 있어 늘려둡니다
  return axiosInstance.post(
    `${ENDPOINTS.ADMIN_PRODUCTS}/${productId}/images`,
    formData,
    { timeout: 60000 }
  );
};

/**
 * 상품 이미지 한 장 삭제
 *
 * DELETE /api/admin/products/{productId}/images/{imageId}
 */
export const deleteAdminProductImage = (
  productId,
  imageId
) => {
  return axiosInstance.delete(
    `${ENDPOINTS.ADMIN_PRODUCTS}/${productId}/images/${imageId}`
  );
};

/**
 * 대표 이미지 변경
 *
 * PATCH /api/admin/products/{productId}/images/{imageId}/thumbnail
 */
export const changeAdminProductThumbnail = (
  productId,
  imageId
) => {
  return axiosInstance.patch(
    `${ENDPOINTS.ADMIN_PRODUCTS}/${productId}/images/${imageId}/thumbnail`
  );
};
