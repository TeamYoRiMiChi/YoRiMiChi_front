import axiosInstance from "../axiosInstance";
import { ENDPOINTS } from "../../config/api";

export const getMyReviews = ({ page = 1, size = 5 } = {}) => {
  return axiosInstance.get(ENDPOINTS.MY_REVIEWS, {
    params: { page, size },
  });
};

export const updateMyReview = (reviewId, rating, content) => {
  return axiosInstance.patch(`${ENDPOINTS.MY_REVIEWS}/${reviewId}`, {
    rating,
    content,
  });
};

export const deleteMyReview = (reviewId) => {
  return axiosInstance.delete(`${ENDPOINTS.MY_REVIEWS}/${reviewId}`);
};
