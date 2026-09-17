import axiosInstance from "./axiosInstance";
import { ENDPOINTS } from "../config/api";

/**
 * 우편번호 → 주소 검색
 *
 * 백엔드: domain/postal/controller/PostalCodeController.java (zipcloud 프록시)
 */
export const searchPostalCode = (zipcode) => {
  return axiosInstance.get(ENDPOINTS.POSTAL_CODE(zipcode));
};

/** 서버 응답 → 화면용 형태 */
export function toPostalAddressView(dto) {
  return {
    zipcode: dto.zipcode ?? "",
    fullAddress: dto.fullAddress ?? "",
  };
}
