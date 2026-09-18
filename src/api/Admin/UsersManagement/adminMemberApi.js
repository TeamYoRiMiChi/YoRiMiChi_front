import { ENDPOINTS } from "../../../config/api";
import axiosInstance from "../../axiosInstance";

export const getAdminMembers = () => {
    return axiosInstance.get(ENDPOINTS.ADMIN_MEMBERS);
};