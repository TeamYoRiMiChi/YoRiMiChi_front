import { ENDPOINTS } from "../../../config/api";
import axiosInstance from "../../axiosInstance";

export const getAdminMembers = () => {
    return axiosInstance.get(ENDPOINTS.ADMIN_MEMBERS);
};
export const updateAdminMemberStatus = (memberId, status) => {
    return axiosInstance.patch(
        ENDPOINTS.ADMIN_MEMBER_STATUS(memberId), { status }
    );
};