import axiosInstance from "../../axiosInstance";
import { ENDPOINTS } from "../../../config/api";

const DEFAULT_PAGE_SIZE = 10;
export const getAdminCategories = ({
  keyword,
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

  return axiosInstance.get(ENDPOINTS.ADMIN_CATEGORIES, {
    params,
  });
};

export const createAdminCategory = (categoryName) => {
  return axiosInstance.post(ENDPOINTS.ADMIN_CATEGORIES, {
    categoryName,
  });
};

export const updateAdminCategory = (categoryId, categoryName) => {
  return axiosInstance.patch(`${ENDPOINTS.ADMIN_CATEGORIES}/${categoryId}`, {
    categoryName,
  });
};

export const deleteAdminCategory = (categoryId) => {
  return axiosInstance.delete(`${ENDPOINTS.ADMIN_CATEGORIES}/${categoryId}`);
};
