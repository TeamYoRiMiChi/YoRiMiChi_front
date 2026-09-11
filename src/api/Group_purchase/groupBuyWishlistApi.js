import axiosInstance from '../axiosInstance';

export const toggleGroupBuyWishlist = (productId) => {
  return axiosInstance.post(`/group-buys/${productId}/wishlist`);
};