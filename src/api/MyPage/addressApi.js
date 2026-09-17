import axiosInstance from "../axiosInstance";
import { ENDPOINTS } from "../../config/api";

/**
 * 배송지 관리 API
 *
 * 백엔드: domain/mypage/controller/AddressController.java
 */

export const getMyAddresses = () => {
  return axiosInstance.get(ENDPOINTS.MY_ADDRESSES);
};

export const createAddress = (data) => {
  return axiosInstance.post(ENDPOINTS.MY_ADDRESSES, data);
};

export const updateAddress = (addressId, data) => {
  return axiosInstance.put(ENDPOINTS.ADDRESS(addressId), data);
};

export const deleteAddress = (addressId) => {
  return axiosInstance.delete(ENDPOINTS.ADDRESS(addressId));
};

export const setDefaultAddress = (addressId) => {
  return axiosInstance.patch(ENDPOINTS.ADDRESS_DEFAULT(addressId));
};

/** 서버 응답 → 화면용 형태 */
export function toAddressView(dto) {
  return {
    id: dto.addressId,
    name: dto.addressName ?? "",
    receiver: dto.receiverName ?? "",
    phone: dto.receiverPhone ?? "",
    zip: dto.postalCode ?? "",
    addr: dto.address ?? "",
    detail: dto.addressDetail ?? "",
    isDefault: Boolean(dto.isDefault),
  };
}

/** 화면 입력값 → 서버 요청 형태 */
export function toAddressRequest(form) {
  return {
    addressName: form.name.trim(),
    receiverName: form.receiver.trim(),
    receiverPhone: form.phone.trim(),
    postalCode: form.zip.trim(),
    address: form.addr.trim(),
    addressDetail: form.detail.trim(),
  };
}
